from __future__ import annotations

from typing import Optional

from aiogram import Bot, F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import (
    CallbackQuery,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    Message,
)

from bot import texts
from bot.config import get_settings
from bot.database import get_session
from bot.database.crud import (
    get_or_create_client,
    save_message,
    set_admin_msg_id,
    set_focused_client_id,
)
from bot.database.models import Direction, MessageType
from bot.keyboards import back_to_menu
from bot.states import Chat

router = Router(name="messaging")
settings = get_settings()


@router.callback_query(F.data == "chat")
async def cb_chat(call: CallbackQuery, state: FSMContext) -> None:
    await state.set_state(Chat.talking)
    if call.message:
        await call.message.edit_text(texts.CHAT_OPENED, reply_markup=back_to_menu())
    await call.answer()


def _detect_type(message: Message) -> tuple[MessageType, Optional[str], Optional[str]]:
    """Return (message_type, file_id, content_text)."""
    if message.text:
        return MessageType.text, None, message.text
    if message.photo:
        return MessageType.photo, message.photo[-1].file_id, message.caption
    if message.document:
        return MessageType.document, message.document.file_id, message.caption
    if message.voice:
        return MessageType.voice, message.voice.file_id, None
    if message.video_note:
        return MessageType.video_note, message.video_note.file_id, None
    return MessageType.text, None, "[unsupported message type]"


def _focus_kb(client_id: int, name: str) -> InlineKeyboardMarkup:
    short = (name or "клиенту")[:18]
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text=f"📌 Отвечать {short}",
                    callback_data=f"focus:{client_id}",
                )
            ]
        ]
    )


async def _forward_to_admin(
    bot: Bot,
    *,
    msg_type: MessageType,
    file_id: Optional[str],
    content: Optional[str],
    client_caption: str,
    reply_markup: InlineKeyboardMarkup,
) -> Optional[int]:
    """Send the inbound message into the admin chat. Returns the Telegram msg id."""

    sent: Optional[Message] = None
    if msg_type == MessageType.text:
        sent = await bot.send_message(
            settings.admin_chat_id,
            f"{client_caption}\n\n{content or ''}",
            reply_markup=reply_markup,
        )
    elif msg_type == MessageType.photo and file_id:
        full_caption = client_caption + (f"\n\n{content}" if content else "")
        sent = await bot.send_photo(
            settings.admin_chat_id,
            file_id,
            caption=full_caption,
            reply_markup=reply_markup,
        )
    elif msg_type == MessageType.document and file_id:
        full_caption = client_caption + (f"\n\n{content}" if content else "")
        sent = await bot.send_document(
            settings.admin_chat_id,
            file_id,
            caption=full_caption,
            reply_markup=reply_markup,
        )
    elif msg_type == MessageType.voice and file_id:
        await bot.send_message(
            settings.admin_chat_id, client_caption, reply_markup=reply_markup
        )
        sent = await bot.send_voice(settings.admin_chat_id, file_id)
    elif msg_type == MessageType.video_note and file_id:
        await bot.send_message(
            settings.admin_chat_id, client_caption, reply_markup=reply_markup
        )
        sent = await bot.send_video_note(settings.admin_chat_id, file_id)

    return sent.message_id if sent else None


# Let admin.py handle everything that arrives from the admin chat.
@router.message(F.chat.id == settings.admin_chat_id)
async def admin_passthrough(message: Message) -> None:
    return


@router.message()
async def client_inbound(message: Message, bot: Bot) -> None:
    """Catch-all for client messages — log, auto-focus, forward to admin."""

    if message.from_user is None or message.from_user.is_bot:
        return

    msg_type, file_id, content = _detect_type(message)

    async with get_session() as session:
        client = await get_or_create_client(
            session,
            telegram_id=message.from_user.id,
            name=message.from_user.full_name,
        )
        saved = await save_message(
            session,
            client_id=client.id,
            direction=Direction.inbound,
            message_type=msg_type,
            content=content,
            file_id=file_id,
        )
        # Auto-focus admin on whoever just wrote, so plain-text replies
        # route here by default.
        await set_focused_client_id(session, client.id)

        client_id = client.id
        client_label = client.name or message.from_user.full_name or "клиент"
        saved_id = saved.id

    icon = {
        MessageType.text: "💬",
        MessageType.photo: "🖼",
        MessageType.document: "📎",
        MessageType.voice: "🎤",
        MessageType.video_note: "🎥",
    }[msg_type]

    caption = (
        f"{icon} <b>{client_label}</b>  ·  ID <code>{client_id}</code>\n"
        f"tg://user?id={message.from_user.id}\n"
        f"<i>📌 сейчас активен — просто отвечайте текстом</i>"
    )

    admin_msg_id = await _forward_to_admin(
        bot,
        msg_type=msg_type,
        file_id=file_id,
        content=content,
        client_caption=caption,
        reply_markup=_focus_kb(client_id, client_label),
    )

    if admin_msg_id:
        async with get_session() as session:
            await set_admin_msg_id(session, saved_id, admin_msg_id)

    if msg_type != MessageType.text:
        try:
            await message.reply(texts.CHAT_RECEIVED)
        except Exception:
            pass
