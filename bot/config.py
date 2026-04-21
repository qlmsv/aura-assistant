from __future__ import annotations

import os
from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime configuration loaded from environment variables."""

    bot_token: str = Field(..., alias="BOT_TOKEN")
    admin_chat_id: int = Field(..., alias="ADMIN_CHAT_ID")
    webhook_url: str = Field(default="", alias="WEBHOOK_URL")
    webhook_secret: str = Field(default="", alias="WEBHOOK_SECRET")
    database_url: str = Field(..., alias="DATABASE_URL")
    brand_name: str = Field(default="АУРА", alias="BRAND_NAME")
    telegram_username: str = Field(
        default="aura_assistant_bot", alias="NEXT_PUBLIC_TELEGRAM_USERNAME"
    )

    model_config = SettingsConfigDict(
        env_file=os.environ.get("ENV_FILE", ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
        populate_by_name=True,
    )


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()  # type: ignore[call-arg]
