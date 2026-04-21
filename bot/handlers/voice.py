"""Voice message handling — separated for future Whisper transcription.

Right now this router is a no-op placeholder; voice messages are handled by
``messaging.py`` (which detects the type and stores ``file_id``). When you wire
Whisper, populate ``transcript`` here and update the saved row.
"""

from __future__ import annotations

from aiogram import Router

router = Router(name="voice")


# Placeholder for future Whisper integration:
#
#   @router.message(F.voice)
#   async def transcribe(message: Message, bot: Bot) -> None:
#       file = await bot.get_file(message.voice.file_id)
#       audio_bytes = await bot.download_file(file.file_path)
#       transcript = await whisper_transcribe(audio_bytes)
#       async with get_session() as session:
#           await update_transcript(session, message_id=..., transcript=transcript)
