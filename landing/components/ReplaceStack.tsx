"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Avatar } from "./Avatar";

const apps = [
  "Calendly",
  "Notion",
  "Gmail",
  "Trello",
  "Booking",
  "Excel",
  "WhatsApp",
  "Dropbox",
  "Slack",
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
      aria-label="Один ассистент вместо девяти приложений"
    >
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="section-eyebrow">Один вместо девяти</span>
          <h2 className="section-title">
            Замените стек приложений
            <br />
            <span className="text-gradient">одним сообщением.</span>
          </h2>
          <p className="mt-4 text-muted">
            Пока вы переключаетесь между календарём, почтой, таблицами и чатами —
            АУРА держит всё это в одном месте.
          </p>
        </div>

        <div className="relative mx-auto mt-16 grid h-[420px] w-full max-w-3xl place-items-center">
          <motion.div
            style={{ scale: tileScale, opacity: tileOpacity }}
            className="absolute inset-0 grid grid-cols-3 gap-5 p-6 sm:gap-7"
          >
            {apps.map((a, i) => (
              <div
                key={a}
                className="grid place-items-center rounded-2xl border border-white/10 bg-bgSoft/60 px-3 py-6 text-xs font-medium text-muted backdrop-blur sm:text-sm"
                style={{
                  transform: `translate(${(i % 3 - 1) * 8}px, ${(Math.floor(i / 3) - 1) * 8}px)`,
                }}
              >
                {a}
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
            <div className="relative rounded-full ring-4 ring-accent/40 shadow-glowStrong">
              <Avatar size={128} priority />
            </div>
            <div className="mt-5 text-center font-display text-sm uppercase tracking-[0.3em] text-accent">
              АУРА
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
