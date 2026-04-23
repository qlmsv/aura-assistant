"use client";

import { motion } from "framer-motion";

const bullets = [
  "Бизнес держится на вашем ручном контроле — без вас ничего не решается.",
  "Процессы живут в чатах и головах сотрудников, а не в системе.",
  "Рост упирается в то, что вы не успеваете масштабировать управление.",
  "Команда ждёт ваших решений там, где могла бы закрыть сама.",
  "Качество гуляет от заказа к заказу — зависит от того, кто сегодня у руля.",
  "Вы чувствуете, что «что-то не так», но не можете ткнуть пальцем куда.",
];

export function Problem() {
  return (
    <section className="container-x py-section">
      <div className="max-w-2xl">
        <span className="section-eyebrow">Проблема</span>
        <h2 className="section-title">Симптомы операционного долга</h2>
        <p className="mt-4 text-muted">
          Если узнаёте 3 из 6 — бизнес уже платит невидимый налог на ручное
          управление. Чем дальше, тем дороже его расплачивать.
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
