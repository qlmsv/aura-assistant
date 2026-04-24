"use client";

import { motion } from "framer-motion";

const moments = [
  {
    t: "День 0",
    text: "Диагностический созвон: 30 минут, бесплатно. Формулируем что именно болит и что считаем успехом.",
  },
  {
    t: "Неделя 1",
    text: "Интервью с вами и ключевыми людьми команды. Сбор данных о реальном потоке работы.",
  },
  {
    t: "Неделя 2",
    text: "Карта процессов с узкими местами. Отчёт с приоритизированным планом на 90 дней.",
  },
  {
    t: "Недели 3–6",
    text: "Проектирование целевой архитектуры: RACI, SLA, регламенты, инструменты, документация.",
  },
  {
    t: "Недели 7–12",
    text: "Внедрение, автоматизация, миграция, онбординг команды. Переход без остановки бизнеса.",
  },
  {
    t: "Месяц 3+",
    text: "Сопровождение: мониторинг, ретроспективы, оптимизация на ходу. Передача знаний внутреннему руководителю.",
  },
];

export function DayTimeline() {
  return (
    <section className="container-x py-section">
      <div className="max-w-2xl">
        <span className="section-eyebrow">Как мы работаем</span>
        <h2 className="section-title">Роадмап от хаоса до системы</h2>
        <p className="mt-4 text-muted">
          Реалистичный срок до устойчивых изменений — от 2 до 12 недель
          в зависимости от объёма. Первый полезный результат — уже в конце
          первой недели.
        </p>
      </div>

      <div className="relative mt-14">
        <div
          aria-hidden
          className="absolute left-[calc(4rem-1px)] top-0 h-full w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent sm:left-[calc(6rem-1px)]"
        />
        <ul className="space-y-8">
          {moments.map((m, i) => (
            <motion.li
              key={m.t}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-start gap-6 sm:gap-8"
            >
              <span className="w-16 flex-none font-display text-sm font-semibold tracking-tight text-accent sm:w-24 sm:text-base">
                {m.t}
              </span>
              <span
                aria-hidden
                className="relative z-10 mt-2 grid h-3 w-3 flex-none place-items-center rounded-full bg-accent shadow-glow"
              >
                <span className="absolute inset-[-6px] rounded-full bg-accent/20" />
              </span>
              <p className="flex-1 text-base leading-relaxed text-muted sm:text-lg">
                {m.text}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
