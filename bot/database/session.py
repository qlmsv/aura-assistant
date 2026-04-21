from __future__ import annotations

import ssl
from contextlib import asynccontextmanager
from typing import AsyncIterator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.pool import NullPool

from bot.config import get_settings


class Base(DeclarativeBase):
    """Declarative base for all ORM models."""


_settings = get_settings()
_is_neon = "neon.tech" in _settings.database_url
_is_serverless = bool(_settings.webhook_url)  # Vercel sets this; local polling doesn't.

# Neon needs TLS; asyncpg can't read sslmode from the URL so we hand it a context.
_ssl_ctx = ssl.create_default_context()
_ssl_ctx.check_hostname = False
_ssl_ctx.verify_mode = ssl.CERT_NONE

# In serverless every invocation is short-lived. Persisting a pool across cold
# starts wastes warm time and risks stale sockets at the pgbouncer in front of
# Neon. NullPool opens one connection per request and lets the pooler do its job.
# statement_cache_size=0 is required when going through pgbouncer in transaction
# mode (the -pooler hostname).
_connect_args: dict = {}
if _is_neon:
    _connect_args["ssl"] = _ssl_ctx
    _connect_args["statement_cache_size"] = 0
    _connect_args["prepared_statement_cache_size"] = 0

_engine_kwargs: dict = {
    "echo": False,
    "connect_args": _connect_args,
}
if _is_serverless:
    _engine_kwargs["poolclass"] = NullPool
else:
    _engine_kwargs["pool_pre_ping"] = True
    _engine_kwargs["pool_size"] = 5
    _engine_kwargs["max_overflow"] = 5

engine = create_async_engine(_settings.database_url, **_engine_kwargs)

async_session_maker = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)


@asynccontextmanager
async def get_session() -> AsyncIterator[AsyncSession]:
    async with async_session_maker() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
