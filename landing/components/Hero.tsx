"use client";

import { motion } from "framer-motion";
import { TelegramButton } from "./TelegramButton";
import { TelegramPreview } from "./TelegramPreview";
import { AuraOrb } from "./AuraOrb";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="absolute inset-0 -z-10 bg-radial-glow" />
      <AuraOrb />

      <div className="container-x grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.span variants={item} className="eyebrow">
            Personal · Online · 24/7
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-display-xl font-semibold tracking-tight"
          >
            Ваш личный
            <br />
            <span className="text-gradient">ассистент онлайн.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
            АУРА — это Алина, ваш удалённый помощник по всем делам, до которых не доходят руки.
            Переписки, финансы, поиск подрядчиков, поездки — всё в одном Telegram-чате.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
          >
            <TelegramButton>Оставить заявку</TelegramButton>
            <a href="#services" className="btn-ghost">
              Что я делаю
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 grid w-full max-w-xl grid-cols-1 gap-3 text-left sm:mt-14 sm:grid-cols-3 sm:gap-6"
          >
            {[
              { v: "≤ 30 мин", l: "Ответ в рабочие часы" },
              { v: "День 1", l: "Первая задача на старте" },
              { v: "NDA", l: "Конфиденциальность" },
            ].map((s) => (
              <div
                key={s.l}
                className="flex items-baseline gap-3 rounded-xl border border-white/10 bg-bgSoft/40 p-4 backdrop-blur sm:block"
              >
                <div className="font-display text-xl font-semibold text-accent">
                  {s.v}
                </div>
                <div className="text-xs leading-snug text-muted sm:mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <TelegramPreview />
        </motion.div>
      </div>
    </section>
  );
}
