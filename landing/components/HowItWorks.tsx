"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Знакомство",
    text: "Короткий созвон на 20 минут. Разбор задач и выбор тарифа.",
  },
  {
    n: "02",
    title: "Подбор формата",
    text: "Настройка инструментов, доступов и регламента под ваши процессы. Подписание NDA.",
  },
  {
    n: "03",
    title: "Старт",
    text: "Первая задача — в день подписания. Ежедневный отчёт в удобном формате.",
  },
  {
    n: "04",
    title: "Ведение",
    text: "Еженедельный разбор: что сделано, что забираем дальше, где можно ускориться.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="container-x py-section">
      <div className="max-w-2xl">
        <span className="section-eyebrow">Как это работает</span>
        <h2 className="section-title">Четыре шага до свободного дня</h2>
      </div>
      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="font-display text-7xl font-bold text-accent/20 [-webkit-text-stroke:1px_rgba(224,64,251,0.55)] [color:transparent] sm:text-8xl">
              {s.n}
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
