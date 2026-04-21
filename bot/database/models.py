from __future__ import annotations

import enum
from datetime import datetime
from typing import Optional

from sqlalchemy import BigInteger, Boolean, DateTime, Enum, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .session import Base


def _values(enum_cls):
    """Tell SQLAlchemy to send the enum *value* to Postgres, not the Python name."""
    return [e.value for e in enum_cls]


class Package(str, enum.Enum):
    none = "none"
    start = "start"
    business = "business"
    vip = "vip"


class Direction(str, enum.Enum):
    inbound = "in"   # client -> assistant
    outbound = "out"  # assistant -> client


class MessageType(str, enum.Enum):
    text = "text"
    photo = "photo"
    document = "document"
    voice = "voice"
    video_note = "video_note"


class ApplicationStatus(str, enum.Enum):
    new = "new"
    contacted = "contacted"
    converted = "converted"
    rejected = "rejected"


class Client(Base):
    __tablename__ = "clients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    telegram_id: Mapped[int] = mapped_column(BigInteger, unique=True, index=True)
    name: Mapped[Optional[str]] = mapped_column(String(255))
    company: Mapped[Optional[str]] = mapped_column(String(255))
    package: Mapped[Package] = mapped_column(
        Enum(Package, name="package_enum", values_callable=_values),
        default=Package.none,
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    messages: Mapped[list["Message"]] = relationship(
        back_populates="client", cascade="all, delete-orphan"
    )
    applications: Mapped[list["Application"]] = relationship(
        back_populates="client", cascade="all, delete-orphan"
    )


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    client_id: Mapped[int] = mapped_column(
        ForeignKey("clients.id", ondelete="CASCADE"), index=True
    )
    direction: Mapped[Direction] = mapped_column(
        Enum(Direction, name="direction_enum", values_callable=_values),
        nullable=False,
    )
    message_type: Mapped[MessageType] = mapped_column(
        Enum(MessageType, name="message_type_enum", values_callable=_values),
        nullable=False,
    )
    content: Mapped[Optional[str]] = mapped_column(Text)
    file_id: Mapped[Optional[str]] = mapped_column(String(512))
    transcript: Mapped[Optional[str]] = mapped_column(Text)  # for future Whisper integration
    is_read: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), index=True
    )

    # The Telegram message_id of the message we sent into the admin chat,
    # used so admin can simply "reply" on the forwarded message.
    admin_msg_id: Mapped[Optional[int]] = mapped_column(BigInteger, index=True)

    client: Mapped["Client"] = relationship(back_populates="messages")


class Application(Base):
    __tablename__ = "applications"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    client_id: Mapped[int] = mapped_column(
        ForeignKey("clients.id", ondelete="CASCADE"), index=True
    )
    name: Mapped[Optional[str]] = mapped_column(String(255))
    company: Mapped[Optional[str]] = mapped_column(String(255))
    tasks: Mapped[Optional[str]] = mapped_column(Text)
    preferred_time: Mapped[Optional[str]] = mapped_column(String(255))
    status: Mapped[ApplicationStatus] = mapped_column(
        Enum(ApplicationStatus, name="application_status_enum", values_callable=_values),
        default=ApplicationStatus.new,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    client: Mapped["Client"] = relationship(back_populates="applications")
