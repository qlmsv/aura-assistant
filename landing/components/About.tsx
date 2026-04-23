"use client";

import { motion } from "framer-motion";

const strengths = [
  "Выстраивание операционных систем с нуля",
  "Долгосрочные партнёрские отношения с клиентами",
  "Анализ рынка и конкурентов",
  "Поиск узких мест и оптимизация",
];

export function About() {
  return (
    <section className="container-x py-section">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-bgSoft/50 p-8 backdrop-blur sm:p-12 lg:p-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-20 h-72 w-72 rounded-full bg-accentSoft/15 blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:items-start lg:gap-16">
          <div>
            <span className="section-eyebrow">Обо мне</span>
            <div className="mt-5 flex items-center gap-5">
              <div className="grid h-20 w-20 flex-none place-items-center rounded-full bg-accent text-3xl font-bold text-bg shadow-glow">
                А
              </div>
              <div>
                <div className="font-display text-2xl font-semibold">Алина</div>
                <div className="text-sm text-muted">операционист</div>
              </div>
            </div>

            <ul className="mt-8 space-y-3 text-sm">
              {strengths.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-ink/90">
                  <svg
                    className="mt-1 h-3.5 w-3.5 flex-none text-accent"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M5 12l4 4 10-10"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <span
              aria-hidden
              className="absolute -left-2 -top-6 font-serif text-7xl leading-none text-accent/40 sm:-left-4 sm:-top-8 sm:text-8xl"
            >
              “
            </span>
            <p className="font-serif text-xl leading-relaxed text-ink/95 sm:text-2xl">
              Последние годы я веду операционку бизнесам и предпринимателям.
              От построения долгосрочных партнёрских отношений с вашими
              клиентами до анализа рынка и конкурентов, поиска узких мест и
              решения личных задач предпринимателей — с предложениями по
              оптимизации.
            </p>
            <p className="mt-5 font-serif text-lg italic leading-relaxed text-muted sm:text-xl">
              Мне важны задачи, которые можно усовершенствовать и довести до
              результата.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
