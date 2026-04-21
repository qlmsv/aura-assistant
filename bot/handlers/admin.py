from __future__ import annotations

import shlex
from typing import Optional

from aiogram import Bot, F, Router
from aiogram.filters import Command
from aiogram.types import Message

from bot import texts
from bot.config import get_settings
from bot.database import get_session
from bot.database.crud import (
    find_message_by_admin_msg_id,
    get_client_by_id,
    get_history,
    list_active_clients,
    save_message,
)
from bot.database.models import Direction, MessageType

router = Router(name="admin")
settings = get_settings()

# Every handler in this router only fires inside the admin chat.
router.message.filter(F.chat.id == settings.admin_chat_id)


# ---------- helpers ----------

def _detect_outbound(message: Message) -> tuple[MessageType, Optional[str], Optional[str]]:
    if message.voice:
        return MessageType.voice, message.voice.file_id, None
    if message.video_note:
        return MessageType.video_note, message.video_note.file_id, None
    if message.photo:
        return MessageType.photo, message.photo[-1].file_id, message.caption
    if message.document:
        return MessageType.document, message.document.file_id, message.caption
    return MessageType.text, None, message.text or message.caption or ""


async def _send_to_client(
    bot: Bot,
    *,
    telegram_id: int,
    msg_type: MessageType,
    file_id: Optional[str],
    content: Optional[str],
) -> None:
    if msg_type == MessageType.text:
        await bot.send_message(telegram_id, content or "")
    elif msg_type == MessageType.photo and file_id:
        await bot.send_photo(telegram_id, file_id, caption=content)
    elif msg_type == MessageType.document and file_id:
        await bot.send_document(telegram_id, file_id, caption=content)
    elif msg_type == MessageType.voice and file_id:
        await bot.send_voice(telegram_id, file_id)
    elif msg_type == MessageType.video_note and file_id:
        await bot.send_video_note(telegram_id, file_id)


async def _deliver_and_log(
    bot: Bot, message: Message, client_id: int, telegram_id: int
) -> None:
    msg_type, file_id, content = _detect_outbound(message)
    await _send_to_client(
        bot,
        telegram_id=telegram_id,
        msg_type=msg_type,
        file_id=file_id,
        content=content,
    )
    async with get_session() as session:
        await save_message(
            session,
            client_id=client_id,
            direction=Direction.outbound,
            message_type=msg_type,
            content=content,
            file_id=file_id,
        )
    await message.reply(f"✓ Доставлено клиенту <code>{client_id}</code>")


# ---------- commands ----------

@router.message(Command("help", "admin"))
async def cmd_admin_help(message: Message) -> None:
    await message.answer(texts.ADMIN_HELP)


@router.message(Command("clients"))
async def cmd_clients(message: Message) -> None:
    async with get_session() as session:
        clients = await list_active_clients(session)
    if not clients:
        await message.answer("Активных клиентов пока нет.")
        return
    lines = [
        f"<code>{c.id}</code> · {c.name or '—'} · {c.package.value} · tg <code>{c.telegram_id}</code>"
        for c in clients
    ]
    await message.answer("<b>Активные клиенты</b>\n\n" + "\n".join(lines))


@router.message(Command("history"))
async def cmd_history(message: Message) -> None:
    parts = (message.text or "").split(maxsplit=1)
    if len(parts) < 2 or not parts[1].strip().isdigit():
        await message.answer("Использование: <code>/history &lt;client_id&gt;</code>")
        return
    client_id = int(parts[1].strip())
    async with get_session() as session:
        rows = await get_history(session, client_id, limit=20)
    if not rows:
        await message.answer("История пуста.")
        return
    lines = []
    for r in rows:
        arrow = "→" if r.direction == Direction.inbound else "←"
        body = (r.content or f"[{r.message_type.value}]")[:160]
        ts = r.timestamp.strftime("%d.%m %H:%M")
        lines.append(f"{ts}  {arrow}  {body}")
    await message.answer("<b>История</b>\n\n" + "\n".join(lines))


@router.message(Command("reply"))
async def cmd_reply(message: Message, bot: Bot) -> None:
    raw = (message.text or "").split(maxsplit=2)
    if len(raw) < 3 or not raw[1].isdigit():
        await message.answer(
            "Использование: <code>/reply &lt;client_id&gt; &lt;текст&gt;</code>"
        )
        return
    client_id = int(raw[1])
    body = raw[2]
    async with get_session() as session:
        client = await get_client_by_id(session, client_id)
        if client is None:
            await message.answer("Клиент не найден.")
            return
        telegram_id = client.telegram_id

    try:
        await bot.send_message(telegram_id, body)
    except Exception as e:
        await message.answer(f"❌ Не удалось доставить: {e}")
        return

    async with get_session() as session:
        await save_message(
            session,
            client_id=client_id,
            direction=Direction.outbound,
            message_type=MessageType.text,
            content=body,
        )
    await message.answer(f"✓ Доставлено клиенту <code>{client_id}</code>")


# ---------- reply-on-forwarded-message routing ----------

@router.message(F.reply_to_message)
async def admin_reply(message: Message, bot: Bot) -> None:
    """When admin 'replies' on the forwarded card, route the answer to the client."""

    target = message.reply_to_message
    if target is None:
        return

    async with get_session() as session:
        msg_row = await find_message_by_admin_msg_id(session, target.message_id)
        client_id: Optional[int] = msg_row.client_id if msg_row else None
        client = await get_client_by_id(session, client_id) if client_id else None
        telegram_id = client.telegram_id if client else None

    if not (client_id and telegram_id):
        await message.reply(
            "Не нашёл получателя. Используйте "
            "<code>/reply &lt;client_id&gt; &lt;текст&gt;</code>."
        )
        return

    try:
        await _deliver_and_log(bot, message, client_id, telegram_id)
    except Exception as e:
        await message.reply(f"❌ Ошибка доставки: {e}")
