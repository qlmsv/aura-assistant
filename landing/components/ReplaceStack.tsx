"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const sources = [
  "Чаты",
  "Таблицы",
  "CRM",
  "Заметки",
  "Трекеры",
  "Документы",
  "Почта",
  "Созвоны",
  "В голове",
];

export function ReplaceStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const tileScale = useTransform(scrollYProgress, [0.2, 0.65], [1, 0.3]);
  const tileOpacity = useTransform(scrollYProgress, [0.35, 0.7], [1, 0]);
  const auraScale = useTransform(scrollYProgress, [0.3, 0.75], [0.85, 1.1]);
  const auraGlow = useTransform(scrollYProgress, [0.3, 0.8], [0.2, 1]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-section"
      aria-label="От разрозненной работы к одной системе"
    >
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="section-eyebrow">Как будет после</span>
          <h2 className="section-title">
            Работа в одном месте
            <br />
            <span className="text-gradient">а не в десяти.</span>
          </h2>
          <p className="mt-4 text-muted">
            Задачи в чатах, договоры в папках, данные о клиентах в голове у
            менеджера, отчёты в Excel. Собираю это в одну систему, где у
            каждого процесса есть ответственный, срок и понятный результат.
          </p>
        </div>

        <div className="relative mx-auto mt-16 grid h-[420px] w-full max-w-3xl place-items-center">
          <motion.div
            style={{ scale: tileScale, opacity: tileOpacity }}
            className="absolute inset-0 grid grid-cols-3 gap-5 p-6 sm:gap-7"
          >
            {sources.map((label, i) => (
              <div
                key={label}
                className="grid place-items-center rounded-2xl border border-white/10 bg-bgSoft/60 px-3 py-6 text-xs font-medium text-muted backdrop-blur sm:text-sm"
                style={{
                  transform: `translate(${((i % 3) - 1) * 8}px, ${(Math.floor(i / 3) - 1) * 8}px)`,
                }}
              >
                {label}
              </div>
            ))}
          </motion.div>

          <motion.div
            style={{ scale: auraScale }}
            className="relative z-10 grid place-items-center"
          >
            <motion.div
              style={{ opacity: auraGlow }}
              className="absolute inset-[-40px] rounded-full bg-[radial-gradient(circle,rgba(224,64,251,0.55),transparent_60%)] blur-2xl"
            />
            <div className="relative grid h-32 w-32 place-items-center rounded-full border border-accent/40 bg-bg/80 font-display text-4xl font-bold tracking-widest text-ink shadow-glowStrong backdrop-blur">
              A
            </div>
            <div className="mt-5 text-center font-display text-sm uppercase tracking-[0.3em] text-accent">
              Одна система
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
