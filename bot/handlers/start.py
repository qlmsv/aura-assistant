from __future__ import annotations

from aiogram import F, Router
from aiogram.filters import CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message

from bot import texts
from bot.database import get_session
from bot.database.crud import get_or_create_client, update_client_profile
from bot.database.models import Package
from bot.keyboards import back_to_menu, main_menu, services_menu

router = Router(name="start")

PACKAGE_MAP = {
    "start": Package.start,
    "business": Package.business,
    "vip": Package.vip,
    # "Трансформация" is a higher-tier offering than the DB enum knows
    # about. Record intent as VIP and rely on the display label for UX.
    "enterprise": Package.vip,
}

PACKAGE_LABELS = {
    "start": "Диагностика",
    "business": "Проект",
    "vip": "Ops-директор",
    "enterprise": "Трансформация",
}


@router.message(CommandStart())
async def cmd_start(message: Message, state: FSMContext) -> None:
    await state.clear()
    async with get_session() as session:
        await get_or_create_client(
            session,
            telegram_id=message.from_user.id,
            name=message.from_user.full_name,
        )
    await message.answer(texts.WELCOME, reply_markup=main_menu())


@router.callback_query(F.data == "menu")
async def cb_menu(call: CallbackQuery, state: FSMContext) -> None:
    await state.clear()
    if call.message:
        await call.message.edit_text(texts.WELCOME, reply_markup=main_menu())
    await call.answer()


@router.callback_query(F.data == "services")
async def cb_services(call: CallbackQuery) -> None:
    if call.message:
        await call.message.edit_text(texts.SERVICES, reply_markup=services_menu())
    await call.answer()


@router.callback_query(F.data == "what")
async def cb_what(call: CallbackQuery) -> None:
    if call.message:
        await call.message.edit_text(texts.WHAT_I_DO, reply_markup=back_to_menu())
    await call.answer()


@router.callback_query(F.data.startswith("pick:"))
async def cb_pick_package(call: CallbackQuery) -> None:
    _, key = (call.data or "").split(":", 1)
    package = PACKAGE_MAP.get(key)
    if not package:
        await call.answer("Неизвестный пакет", show_alert=True)
        return
    async with get_session() as session:
        client = await get_or_create_client(
            session, telegram_id=call.from_user.id, name=call.from_user.full_name
        )
        await update_client_profile(session, client, package=package)
    label = PACKAGE_LABELS.get(key, key)
    await call.answer(f"Выбран формат «{label}»", show_alert=False)
    if call.message:
        await call.message.edit_text(
            f"✅ Зафиксировала интерес к формату <b>«{label}»</b>.\n\n"
            "Оставьте короткую заявку на диагностику — я свяжусь с вами в "
            "течение часа в рабочее время.",
            reply_markup=back_to_menu(),
        )
