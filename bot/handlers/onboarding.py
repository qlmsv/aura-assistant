from __future__ import annotations

from aiogram import Bot, F, Router
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message

from bot import texts
from bot.config import get_settings
from bot.database import get_session
from bot.database.crud import (
    create_application,
    get_or_create_client,
    update_client_profile,
)
from bot.keyboards import back_to_menu, cancel_keyboard, remove_keyboard
from bot.states import Onboarding

router = Router(name="onboarding")
settings = get_settings()


@router.callback_query(F.data == "apply")
async def cb_apply(call: CallbackQuery, state: FSMContext) -> None:
    await state.set_state(Onboarding.name)
    if call.message:
        await call.message.answer(texts.APPLY_INTRO, reply_markup=cancel_keyboard())
    await call.answer()


@router.message(StateFilter(Onboarding), F.text.casefold() == "отмена")
async def cancel(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(texts.CANCELLED, reply_markup=remove_keyboard())
    await message.answer(texts.WELCOME, reply_markup=back_to_menu())


@router.message(Onboarding.name, F.text)
async def step_name(message: Message, state: FSMContext) -> None:
    name = (message.text or "").strip()
    await state.update_data(name=name)
    await state.set_state(Onboarding.company)
    await message.answer(
        texts.APPLY_COMPANY.format(name=name), reply_markup=cancel_keyboard()
    )


@router.message(Onboarding.company, F.text)
async def step_company(message: Message, state: FSMContext) -> None:
    company = (message.text or "").strip()
    if company == "—":
        company = ""
    await state.update_data(company=company)
    await state.set_state(Onboarding.tasks)
    await message.answer(texts.APPLY_TASKS, reply_markup=cancel_keyboard())


@router.message(Onboarding.tasks, F.text)
async def step_tasks(message: Message, state: FSMContext) -> None:
    await state.update_data(tasks=(message.text or "").strip())
    await state.set_state(Onboarding.preferred_time)
    await message.answer(texts.APPLY_TIME, reply_markup=cancel_keyboard())


@router.message(Onboarding.preferred_time, F.text)
async def step_time(message: Message, state: FSMContext, bot: Bot) -> None:
    data = await state.get_data()
    name: str = data.get("name", message.from_user.full_name or "—")
    company: str = data.get("company") or "—"
    tasks: str = data.get("tasks", "—")
    preferred_time: str = (message.text or "").strip() or "любое"

    async with get_session() as session:
        client = await get_or_create_client(
            session, telegram_id=message.from_user.id, name=name
        )
        await update_client_profile(
            session, client, name=name, company=company or None
        )
        await create_application(
            session,
            client_id=client.id,
            name=name,
            company=company or None,
            tasks=tasks,
            preferred_time=preferred_time,
        )
        client_id = client.id

    await state.clear()
    await message.answer(texts.APPLY_DONE, reply_markup=remove_keyboard())
    await message.answer(texts.WELCOME, reply_markup=back_to_menu())

    tg_link = (
        f"<a href='tg://user?id={message.from_user.id}'>"
        f"{message.from_user.full_name}</a>"
    )
    try:
        await bot.send_message(
            settings.admin_chat_id,
            texts.ADMIN_NEW_APP.format(
                name=name,
                company=company or "—",
                tasks=tasks,
                preferred_time=preferred_time,
                client_id=client_id,
                tg_link=tg_link,
            ),
        )
    except Exception:
        # Don't break the user flow if admin notification fails.
        pass
