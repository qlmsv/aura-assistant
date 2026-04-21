from aiogram.fsm.state import State, StatesGroup


class Onboarding(StatesGroup):
    """FSM for the application form ('Оставить заявку')."""

    name = State()
    company = State()
    tasks = State()
    preferred_time = State()


class Chat(StatesGroup):
    """FSM for the direct chat with the assistant."""

    talking = State()
