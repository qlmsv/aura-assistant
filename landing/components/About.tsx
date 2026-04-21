"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section className="container-x py-section">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-bgSoft/50 p-10 backdrop-blur sm:p-14"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        />
        <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:items-center">
          <div className="flex items-center gap-5">
            <div className="grid h-20 w-20 flex-none place-items-center rounded-full bg-accent text-3xl font-bold text-bg shadow-glow">
              А
            </div>
            <div>
              <span className="section-eyebrow">Почему я</span>
              <div className="mt-3 font-display text-2xl font-semibold">Алина</div>
              <div className="text-sm text-muted">ассистент АУРА</div>
            </div>
          </div>

          <p className="font-serif text-lg leading-relaxed text-ink/90 sm:text-xl">
            Последние годы я веду операционку владелице детского лагеря: от переписок
            с родителями и финансового учёта до заказа мерча и согласования партнёрских
            договоров. Мне важны задачи, которые надо довести до результата, а не просто
            «передать дальше». Если вам важно, чтобы рутину вёл человек, а не шаблон —
            мы сработаемся.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
