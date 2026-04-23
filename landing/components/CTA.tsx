"use client";

import { motion } from "framer-motion";
import { TelegramButton } from "./TelegramButton";

export function CTA() {
  return (
    <section className="container-x pb-section">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-accent/30 bg-bgSoft/60 p-10 text-center sm:p-16"
      >
        <div className="absolute inset-0 -z-10 bg-radial-glow" />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl"
        />

        <span className="section-eyebrow mx-auto">Начнём</span>
        <h2 className="mt-5 font-display text-display-lg font-semibold tracking-tight sm:text-display-xl">
          Давайте <span className="text-gradient">созвонимся.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
          30 минут, бесплатно, без обязательств. После созвона у вас будет
          понятное представление, что в операционке стоит починить в первую
          очередь.
        </p>
        <div className="mt-9 flex justify-center">
          <TelegramButton>Записаться на созвон</TelegramButton>
        </div>
        <p className="mt-5 text-xs uppercase tracking-[0.22em] text-muted">
          Без обязательств · NDA по запросу
        </p>
      </motion.div>
    </section>
  );
}
