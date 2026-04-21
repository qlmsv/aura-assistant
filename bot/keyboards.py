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
            [InlineKeyboardButton(text="💎 Услуги и цены", callback_data="services")],
            [InlineKeyboardButton(text="🗂 Что я беру на себя", callback_data="what")],
            [InlineKeyboardButton(text="📝 Оставить заявку", callback_data="apply")],
            [InlineKeyboardButton(text="💬 Написать ассистенту", callback_data="chat")],
        ]
    )


def services_menu() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="Выбрать «Старт» — 30 000 ₽", callback_data="pick:start")],
            [InlineKeyboardButton(text="Выбрать «Бизнес» — 50 000 ₽", callback_data="pick:business")],
            [InlineKeyboardButton(text="Выбрать «VIP» — 80 000 ₽", callback_data="pick:vip")],
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
