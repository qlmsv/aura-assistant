from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    KeyboardButton,
    ReplyKeyboardMarkup,
    ReplyKeyboardRemove,
)


def main_menu() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="💎 Форматы и цены", callback_data="services")],
            [InlineKeyboardButton(text="🗂 Что я делаю", callback_data="what")],
            [InlineKeyboardButton(text="📝 Записаться на созвон", callback_data="apply")],
            [InlineKeyboardButton(text="💬 Написать напрямую", callback_data="chat")],
        ]
    )


def services_menu() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="🔍 Диагностика — 150 000 ₽", callback_data="pick:start")],
            [InlineKeyboardButton(text="🏛 Проект — от 500 000 ₽", callback_data="pick:business")],
            [InlineKeyboardButton(text="🤝 Сопровождение — 250 000 ₽/мес", callback_data="pick:vip")],
            [InlineKeyboardButton(text="🚀 Под задачу — по запросу", callback_data="pick:enterprise")],
            [InlineKeyboardButton(text="← В меню", callback_data="menu")],
        ]
    )


def back_to_menu() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[[InlineKeyboardButton(text="← В меню", callback_data="menu")]]
    )


def cancel_keyboard() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text="Отмена")]],
        resize_keyboard=True,
        one_time_keyboard=True,
    )


def remove_keyboard() -> ReplyKeyboardRemove:
    return ReplyKeyboardRemove()
