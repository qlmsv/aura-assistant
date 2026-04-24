"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const strengths = [
  "Долгосрочные партнёрские отношения с клиентами",
  "Анализ рынка и конкурентов",
  "Выявление узких мест и оптимизация",
  "Личные задачи предпринимателей",
];

export function About() {
  return (
    <section className="container-x py-section">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-bgSoft/50 p-6 backdrop-blur sm:p-10 lg:p-14"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-20 h-72 w-72 rounded-full bg-accentSoft/15 blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.25fr] lg:items-start lg:gap-14">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-2 rounded-[28px] bg-[linear-gradient(135deg,rgba(224,64,251,0.55),rgba(178,61,203,0.15)_45%,rgba(224,64,251,0.4))] blur-sm"
            />
            <div className="relative overflow-hidden rounded-[24px] border border-white/10">
              <Image
                src="/alina.jpg"
                alt="Алина, основатель АУРА"
                width={600}
                height={800}
                priority={false}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-bgDeep/95 via-bgDeep/70 to-transparent px-5 pb-5 pt-12">
                <div>
                  <div className="font-display text-lg font-semibold">Алина</div>
                  <div className="text-xs text-muted">основатель АУРА</div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-bg/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-muted backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                  Сейчас на связи
                </span>
              </div>
            </div>

            <ul className="mt-6 space-y-2.5 text-sm">
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
            <span className="section-eyebrow">Почему я</span>
            <span
              aria-hidden
              className="absolute -left-2 top-8 font-serif text-7xl leading-none text-accent/40 sm:top-10 sm:text-8xl"
            >
              “
            </span>
            <p className="mt-6 font-serif text-xl leading-relaxed text-ink/95 sm:text-2xl">
              Последние годы я веду операционку бизнесам и предпринимателям.
              От построения долгосрочных партнёрских отношений с вашими
              клиентами до анализа рынка и конкурентов, выявления узких мест
              в бизнесе и решения личных задач предпринимателей — с
              предложениями по оптимизации.
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
