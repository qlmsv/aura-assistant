"""initial schema

Revision ID: 0001
Revises:
Create Date: 2026-04-21 00:00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    package_enum = sa.Enum("none", "start", "business", "vip", name="package_enum")
    direction_enum = sa.Enum("in", "out", name="direction_enum")
    message_type_enum = sa.Enum(
        "text", "photo", "document", "voice", "video_note", name="message_type_enum"
    )
    application_status_enum = sa.Enum(
        "new", "contacted", "converted", "rejected", name="application_status_enum"
    )

    op.create_table(
        "clients",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("telegram_id", sa.BigInteger(), nullable=False, unique=True),
        sa.Column("name", sa.String(length=255), nullable=True),
        sa.Column("company", sa.String(length=255), nullable=True),
        sa.Column("package", package_enum, nullable=False, server_default="none"),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )
    op.create_index("ix_clients_telegram_id", "clients", ["telegram_id"], unique=True)

    op.create_table(
        "messages",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column(
            "client_id",
            sa.Integer(),
            sa.ForeignKey("clients.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("direction", direction_enum, nullable=False),
        sa.Column("message_type", message_type_enum, nullable=False),
        sa.Column("content", sa.Text(), nullable=True),
        sa.Column("file_id", sa.String(length=512), nullable=True),
        sa.Column("transcript", sa.Text(), nullable=True),
        sa.Column("is_read", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("admin_msg_id", sa.BigInteger(), nullable=True),
        sa.Column(
            "timestamp",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )
    op.create_index("ix_messages_client_id", "messages", ["client_id"])
    op.create_index("ix_messages_timestamp", "messages", ["timestamp"])
    op.create_index("ix_messages_admin_msg_id", "messages", ["admin_msg_id"])

    op.create_table(
        "applications",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column(
            "client_id",
            sa.Integer(),
            sa.ForeignKey("clients.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("name", sa.String(length=255), nullable=True),
        sa.Column("company", sa.String(length=255), nullable=True),
        sa.Column("tasks", sa.Text(), nullable=True),
        sa.Column("preferred_time", sa.String(length=255), nullable=True),
        sa.Column(
            "status",
            application_status_enum,
            nullable=False,
            server_default="new",
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )
    op.create_index("ix_applications_client_id", "applications", ["client_id"])


def downgrade() -> None:
    op.drop_index("ix_applications_client_id", table_name="applications")
    op.drop_table("applications")
    op.drop_index("ix_messages_admin_msg_id", table_name="messages")
    op.drop_index("ix_messages_timestamp", table_name="messages")
    op.drop_index("ix_messages_client_id", table_name="messages")
    op.drop_table("messages")
    op.drop_index("ix_clients_telegram_id", table_name="clients")
    op.drop_table("clients")

    sa.Enum(name="application_status_enum").drop(op.get_bind(), checkfirst=True)
    sa.Enum(name="message_type_enum").drop(op.get_bind(), checkfirst=True)
    sa.Enum(name="direction_enum").drop(op.get_bind(), checkfirst=True)
    sa.Enum(name="package_enum").drop(op.get_bind(), checkfirst=True)
