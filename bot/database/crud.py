from __future__ import annotations

from typing import Iterable, Optional

from sqlalchemy import desc, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from .models import (
    Application,
    ApplicationStatus,
    Client,
    Direction,
    Message,
    MessageType,
    Package,
)


# ---------- Clients ----------

async def get_or_create_client(
    session: AsyncSession,
    telegram_id: int,
    name: Optional[str] = None,
) -> Client:
    result = await session.execute(
        select(Client).where(Client.telegram_id == telegram_id)
    )
    client = result.scalar_one_or_none()
    if client is None:
        client = Client(telegram_id=telegram_id, name=name)
        session.add(client)
        await session.flush()
    elif name and not client.name:
        client.name = name
    return client


async def get_client_by_id(session: AsyncSession, client_id: int) -> Optional[Client]:
    result = await session.execute(select(Client).where(Client.id == client_id))
    return result.scalar_one_or_none()


async def get_client_by_telegram_id(
    session: AsyncSession, telegram_id: int
) -> Optional[Client]:
    result = await session.execute(
        select(Client).where(Client.telegram_id == telegram_id)
    )
    return result.scalar_one_or_none()


async def list_active_clients(session: AsyncSession, limit: int = 50) -> list[Client]:
    result = await session.execute(
        select(Client)
        .where(Client.is_active.is_(True))
        .order_by(desc(Client.created_at))
        .limit(limit)
    )
    return list(result.scalars().all())


async def update_client_profile(
    session: AsyncSession,
    client: Client,
    *,
    name: Optional[str] = None,
    company: Optional[str] = None,
    package: Optional[Package] = None,
) -> Client:
    if name is not None:
        client.name = name
    if company is not None:
        client.company = company
    if package is not None:
        client.package = package
    await session.flush()
    return client


# ---------- Messages ----------

async def save_message(
    session: AsyncSession,
    *,
    client_id: int,
    direction: Direction,
    message_type: MessageType,
    content: Optional[str] = None,
    file_id: Optional[str] = None,
    transcript: Optional[str] = None,
    admin_msg_id: Optional[int] = None,
) -> Message:
    msg = Message(
        client_id=client_id,
        direction=direction,
        message_type=message_type,
        content=content,
        file_id=file_id,
        transcript=transcript,
        admin_msg_id=admin_msg_id,
    )
    session.add(msg)
    await session.flush()
    return msg


async def set_admin_msg_id(
    session: AsyncSession, message_id: int, admin_msg_id: int
) -> None:
    await session.execute(
        update(Message)
        .where(Message.id == message_id)
        .values(admin_msg_id=admin_msg_id)
    )


async def find_message_by_admin_msg_id(
    session: AsyncSession, admin_msg_id: int
) -> Optional[Message]:
    result = await session.execute(
        select(Message).where(Message.admin_msg_id == admin_msg_id)
    )
    return result.scalar_one_or_none()


async def get_history(
    session: AsyncSession, client_id: int, limit: int = 20
) -> list[Message]:
    result = await session.execute(
        select(Message)
        .where(Message.client_id == client_id)
        .order_by(desc(Message.timestamp))
        .limit(limit)
    )
    rows = list(result.scalars().all())
    rows.reverse()
    return rows


async def mark_messages_read(
    session: AsyncSession, ids: Iterable[int]
) -> None:
    ids = list(ids)
    if not ids:
        return
    await session.execute(
        update(Message).where(Message.id.in_(ids)).values(is_read=True)
    )


# ---------- Applications ----------

async def create_application(
    session: AsyncSession,
    *,
    client_id: int,
    name: str,
    company: Optional[str],
    tasks: str,
    preferred_time: Optional[str],
) -> Application:
    app = Application(
        client_id=client_id,
        name=name,
        company=company,
        tasks=tasks,
        preferred_time=preferred_time,
        status=ApplicationStatus.new,
    )
    session.add(app)
    await session.flush()
    return app
