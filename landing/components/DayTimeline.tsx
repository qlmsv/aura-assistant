"use client";

import { motion } from "framer-motion";

const moments = [
  { t: "08:00", text: "Проверяю почту и мессенджеры, отвечаю на то, что не требует вашего решения." },
  { t: "10:00", text: "Напоминаю о встрече в 11:30 и присылаю справку по собеседнику." },
  { t: "12:00", text: "Веду клиентов в чате: отвечаю, довожу до оплаты, собираю документы." },
  { t: "14:30", text: "Вношу поступления и расходы в таблицу, сверяю с чеками." },
  { t: "16:00", text: "Созваниваюсь с типографией по мерчу, согласовываю макет и сроки." },
  { t: "18:00", text: "Готовлю сводку по заявкам и отправляю маркетологу рекомендации." },
  { t: "21:00", text: "Собираю план на завтра и отправляю вам одним сообщением." },
];

export function DayTimeline() {
  return (
    <section className="container-x py-section">
      <div className="max-w-2xl">
        <span className="section-eyebrow">Один день с АУРОЙ</span>
        <h2 className="section-title">Как устроен день</h2>
        <p className="mt-4 text-muted">
          Короткий срез: что именно происходит, пока вы занимаетесь стратегией, командой и клиентами.
        </p>
      </div>

      <div className="relative mt-14">
        <div
          aria-hidden
          className="absolute left-[calc(4rem-1px)] top-0 h-full w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent sm:left-[calc(5rem-1px)]"
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
              <span className="w-16 flex-none font-display text-lg font-semibold tracking-tight text-accent sm:w-20 sm:text-xl">
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
