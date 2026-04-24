"use client";

import { motion } from "framer-motion";

const bullets = [
  "Сообщения от клиентов висят без ответа, тёплые лиды остывают.",
  "Документы, чеки и договоры лежат россыпью — когда понадобятся, искать будет некогда.",
  "Нужно срочно заказать, найти, согласовать — но сначала надо найти, у кого.",
  "Цифры по доходам и расходам вы держите в голове, а не в таблице.",
  "Встречи, перелёты, отели — всё это вы планируете сами, между делом.",
  "Команда ждёт от вас решений по задачам, которые вы могли бы не трогать вовсе.",
];

export function Problem() {
  return (
    <section className="container-x py-section">
      <div className="max-w-2xl">
        <span className="section-eyebrow">Проблема</span>
        <h2 className="section-title">Эти задачи съедают ваш день</h2>
        <p className="mt-4 text-muted">
          Каждая из них кажется мелочью. Вместе они забирают у вас главное — возможность думать о бизнесе.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {bullets.map((b, i) => (
          <motion.div
            key={b}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-4 rounded-2xl border border-white/10 bg-bgSoft/40 p-5 backdrop-blur"
          >
            <span className="mt-1 grid h-7 w-7 flex-none place-items-center rounded-full border border-accent/40 text-xs text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-sm leading-relaxed text-muted">{b}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
