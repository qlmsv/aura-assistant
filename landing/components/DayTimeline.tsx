"use client";

import { motion } from "framer-motion";

const moments = [
  {
    t: "День 0",
    text: "Созвон на 30 минут. Расскажете, что хотите починить — я скажу, подхожу ли и какой формат вам нужен.",
  },
  {
    t: "1-я нед",
    text: "Разговариваю с вами и ключевыми людьми. Смотрю, как всё устроено на самом деле.",
  },
  {
    t: "2-я нед",
    text: "Отчёт: что нашла, что чинить в первую очередь, сколько это примерно займёт.",
  },
  {
    t: "3–6 нед",
    text: "Описываем процессы, распределяем ответственность, пишем регламенты.",
  },
  {
    t: "7–12 нед",
    text: "Настройка инструментов, перенос данных, обучение команды.",
  },
  {
    t: "3+ мес",
    text: "Сопровождение: следим за качеством, улучшаем на ходу. Постепенно я отхожу в сторону.",
  },
];

export function DayTimeline() {
  return (
    <section className="container-x py-section">
      <div className="max-w-2xl">
        <span className="section-eyebrow">Как мы работаем</span>
        <h2 className="section-title">От первого созвона до системы</h2>
        <p className="mt-4 text-muted">
          Срок зависит от размера бизнеса и глубины задачи. От 2 недель
          (разовая диагностика) до 12 недель (полный проект). Первые видимые
          улучшения — обычно уже в конце первой недели работы.
        </p>
      </div>

      <div className="relative mt-14">
        <div
          aria-hidden
          className="absolute left-[calc(5rem-1px)] top-0 h-full w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent sm:left-[calc(7rem-1px)]"
        />
        <ul className="space-y-8">
          {moments.map((m, i) => (
            <motion.li
              key={m.t}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-start gap-5 sm:gap-7"
            >
              <span className="w-20 flex-none font-display text-sm font-semibold tracking-tight text-accent sm:w-28 sm:text-base">
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
