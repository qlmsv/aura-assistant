# АУРА — Personal Online Assistant

Premium personal assistant service. Monorepo with landing page, Telegram bot with built-in messaging, and a Mini App scaffold.

## Brand
**АУРА (AURA)** — short, memorable, premium. Conveys personal presence and quiet professionalism.

> Tagline: *"Ваш личный ассистент онлайн. Беру рутину на себя."*

## Stack
- **Landing**: Next.js 14 (App Router) + Tailwind CSS, deployed to Vercel
- **Bot**: Python + aiogram 3.x (webhook), deployed as Vercel serverless function
- **Mini App**: React + Vite (scaffold), Telegram WebApp SDK
- **DB**: Vercel Postgres (Neon) via SQLAlchemy async + asyncpg, Alembic migrations

## Project Structure
```
/
├── landing/          # Next.js landing page
├── bot/              # aiogram bot logic + handlers + DB
├── mini-app/         # React + Vite Mini App scaffold
├── api/              # Vercel serverless entrypoints (webhook)
├── alembic/          # DB migrations
├── vercel.json
├── .env.example
└── README.md
```

## Quick Start (local)

### 1. Landing
```bash
cd landing
npm install
npm run dev
# → http://localhost:3000
```

### 2. Bot (local polling for development)
```bash
cd bot
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp ../.env.example ../.env
# fill BOT_TOKEN, ADMIN_CHAT_ID, DATABASE_URL
python main.py
```

### 3. Mini App
```bash
cd mini-app
npm install
npm run dev
```

## Deploy (всё на Vercel)

### Шаг 1 — Импорт репозитория
1. https://vercel.com/new → **Import Git Repository** → выбери этот репо.
2. Root directory: `.` (vercel.json уже настроен).
3. Жми **Deploy** (упадёт без env — это ок, добавим на следующем шаге).

### Шаг 2 — Vercel Postgres
1. В проекте: **Storage → Create Database → Postgres** → создай базу.
2. Vercel автоматически добавит переменные `POSTGRES_*` в проект.
3. Зайди в **Settings → Environment Variables** и добавь `DATABASE_URL`,
   взяв значение из `POSTGRES_URL_NON_POOLING` и заменив префикс:
   ```
   postgres://user:pass@host/db?sslmode=require
   →
   postgresql+asyncpg://user:pass@host/db
   ```
   (asyncpg сам включит SSL — параметр `sslmode` ему не нужен; SSL прописан в коде через `connect_args`.)

### Шаг 3 — Остальные env vars
В **Settings → Environment Variables** добавь:
- `BOT_TOKEN` — от @BotFather
- `ADMIN_CHAT_ID` — твой Telegram ID (узнай через @userinfobot)
- `WEBHOOK_URL` — `https://<твой-домен>.vercel.app` (без слеша на конце)
- `WEBHOOK_SECRET` — длинная случайная строка (32+ символов)
- `NEXT_PUBLIC_TELEGRAM_USERNAME` — username бота без `@`

После добавления нажми **Redeploy** в Deployments.

### Шаг 4 — Миграции БД
Локально, с тем же `DATABASE_URL`:
```bash
cd bot
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
export DATABASE_URL='postgresql+asyncpg://...'  # из Vercel Postgres
alembic upgrade head
```

### Шаг 5 — Telegram webhook
```bash
curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook" \
     -d "url=<WEBHOOK_URL>/api/webhook" \
     -d "secret_token=<WEBHOOK_SECRET>" \
     -d 'allowed_updates=["message","callback_query"]'
```

Verify:
```bash
curl "https://api.telegram.org/bot<BOT_TOKEN>/getWebhookInfo"
```

## Messaging Flow
```
client → bot → DB → forwarded to admin chat
admin → /reply <client_id> <text>  OR  reply on forwarded msg → bot → client
```

Supported message types: `text`, `photo`, `document`, `voice`, `video_note`.

## Admin Commands
- `/reply <client_id> <text>` — reply to a client by ID
- `/clients` — list active clients
- `/history <client_id>` — last 20 messages with the client
- Reply directly on any forwarded message — bot routes back automatically

## Future Roadmap
- Whisper transcription for voice messages (`messages.transcript` already in schema)
- Mini App: real chat, task board, profile
- Payment integration (Stripe / YooKassa)
