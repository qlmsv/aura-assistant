# АУРА — Personal Online Assistant

Premium personal assistant service. Monorepo with landing page, Telegram bot with built-in messaging, and a Mini App scaffold.

## Brand
**АУРА (AURA)** — short, memorable, premium. Conveys personal presence and quiet professionalism.

> Tagline: *"Ваш личный ассистент онлайн. Беру рутину на себя."*

## Stack
- **Landing**: Next.js 14 (App Router) + Tailwind CSS, deployed to Vercel
- **Bot**: Python + aiogram 3.x (webhook), deployed as Vercel serverless function
- **Mini App**: React + Vite (scaffold), Telegram WebApp SDK
- **DB**: PostgreSQL (Railway) via SQLAlchemy async + asyncpg, Alembic migrations

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

## Deploy

### Step 1 — Database (Railway)
1. Create a new Railway project → **Add Service → PostgreSQL**.
2. Open the PostgreSQL service → **Variables** → copy `DATABASE_URL`.
3. Replace the driver prefix with the async one:
   ```
   postgresql://user:pass@host:port/db
   →
   postgresql+asyncpg://user:pass@host:port/db
   ```

### Step 2 — Vercel (landing + bot webhook)
1. Connect this repo to Vercel.
2. Set environment variables in **Project → Settings → Environment Variables**:
   - `BOT_TOKEN` — from @BotFather
   - `ADMIN_CHAT_ID` — your numeric Telegram ID (use @userinfobot)
   - `WEBHOOK_URL` — `https://<your-vercel-domain>` (no trailing slash)
   - `WEBHOOK_SECRET` — long random string (32+ chars)
   - `DATABASE_URL` — from Railway (with `+asyncpg`)
   - `NEXT_PUBLIC_TELEGRAM_USERNAME` — bot username, no @
3. Deploy.

### Step 3 — Run migrations
From your local machine, with `DATABASE_URL` set:
```bash
cd bot
alembic upgrade head
```

### Step 4 — Set Telegram webhook
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
