"use client";

import { motion } from "framer-motion";
import { TelegramButton } from "./TelegramButton";

const stats = [
  { v: "99.8%", l: "надёжности при кратных нагрузках" },
  { v: "4–5×", l: "рост без потери качества" },
  { v: "0", l: "микроменеджмента для основателя" },
];

export function BusinessOps() {
  return (
    <section className="container-x py-section">
      <div className="mb-12 flex items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/40" />
        <span className="rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-accent">
          Отдельная услуга · 2-е направление
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-accent/40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div
          aria-hidden
          className="absolute -inset-px rounded-3xl bg-[linear-gradient(130deg,rgba(224,64,251,0.6),rgba(255,255,255,0.06)_40%,rgba(224,64,251,0.35))]"
        />
        <div className="relative rounded-3xl bg-bgSoft/80 p-8 backdrop-blur sm:p-12 lg:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-10 h-80 w-80 rounded-full bg-accentSoft/20 blur-3xl"
          />

          <div className="relative grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-bg/60 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-glow" />
                Операционист для бизнеса
              </div>
              <h2 className="section-title mt-4">
                Превращаю хаос в
                <br />
                <span className="text-gradient">
                  масштабируемую систему.
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted">
                <span className="font-semibold text-ink/90">Это отдельная услуга</span> —
                не входит в тарифы личного ассистента выше. Форматы
                сотрудничества и стоимость — по запросу.
              </p>

              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Проектирую операционную архитектуру, которая освобождает
                основателя от микроменеджмента. Моя специализация — создание
                структуры там, где её нет: от проектирования логики процессов
                до обеспечения надёжности при кратных нагрузках.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Заменяю ручной контроль автономной инфраструктурой — чтобы
                вы фокусировались на стратегии, пока система работает на
                результат.
              </p>

              <p className="mt-8 font-serif text-xl italic text-ink/90 sm:text-2xl">
                «Нахожу проблемы — предлагаю решения.»
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <TelegramButton>Запросить диагностику</TelegramButton>
                <span className="text-xs uppercase tracking-[0.22em] text-muted">
                  Бесплатно · 30 минут
                </span>
              </div>
            </div>

            <div className="grid gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative rounded-2xl border border-white/10 bg-bg/60 p-6 backdrop-blur transition hover:border-accent/40 hover:shadow-glowSoft"
                >
                  <div className="font-display text-5xl font-semibold tracking-tight text-accent sm:text-6xl">
                    {s.v}
                  </div>
                  <div className="mt-3 h-px w-10 bg-accent/60" />
                  <p className="mt-4 text-sm leading-snug text-muted">{s.l}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
