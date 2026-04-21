from aiogram import Dispatcher

from . import admin, messaging, onboarding, start, voice


def register_all(dp: Dispatcher) -> None:
    """Register every router in the right order — most specific first."""

    dp.include_router(admin.router)
    dp.include_router(start.router)
    dp.include_router(onboarding.router)
    dp.include_router(voice.router)
    dp.include_router(messaging.router)
