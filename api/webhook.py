"""Vercel serverless entrypoint for the Telegram webhook.

Vercel's @vercel/python runtime invokes ``handler(request)``-style functions or
exposes a ``BaseHTTPRequestHandler`` named ``handler``. We use the latter for
maximum compatibility.

Telegram sends an Update as JSON in the request body; we feed it into the
aiogram dispatcher and respond 200 OK.
"""

from __future__ import annotations

import asyncio
import json
import os
import sys
from http.server import BaseHTTPRequestHandler

# Make ``bot`` importable when Vercel mounts this file at /api/webhook.py
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from aiogram import Bot, Dispatcher  # noqa: E402
from aiogram.client.default import DefaultBotProperties  # noqa: E402
from aiogram.enums import ParseMode  # noqa: E402
from aiogram.types import Update  # noqa: E402

from bot.config import get_settings  # noqa: E402
from bot.handlers import register_all  # noqa: E402


_settings = get_settings()
_bot = Bot(
    token=_settings.bot_token,
    default=DefaultBotProperties(parse_mode=ParseMode.HTML),
)
_dp = Dispatcher()
register_all(_dp)


async def _process(update_dict: dict) -> None:
    update = Update.model_validate(update_dict, context={"bot": _bot})
    await _dp.feed_update(_bot, update)


class handler(BaseHTTPRequestHandler):  # noqa: N801 — Vercel expects this name
    def do_POST(self) -> None:  # noqa: N802
        # Optional secret check — Telegram sends X-Telegram-Bot-Api-Secret-Token.
        if _settings.webhook_secret:
            sent = self.headers.get("X-Telegram-Bot-Api-Secret-Token", "")
            if sent != _settings.webhook_secret:
                self.send_response(401)
                self.end_headers()
                return

        length = int(self.headers.get("Content-Length", 0) or 0)
        raw = self.rfile.read(length) if length else b"{}"
        try:
            payload = json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            self.send_response(400)
            self.end_headers()
            return

        try:
            asyncio.run(_process(payload))
        except Exception as e:
            # We still 200 to Telegram so it doesn't retry storms — log instead.
            print(f"[webhook] handler error: {e}", flush=True)

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(b'{"ok":true}')

    def do_GET(self) -> None:  # noqa: N802
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write(b"AURA webhook is alive\n")
