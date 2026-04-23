"use client";

import { motion } from "framer-motion";

const bullets = [
  "Без вас ничего не решается — каждый вопрос от команды приходит к вам.",
  "Никто толком не знает, как устроены процессы — всё живёт в переписках и в головах.",
  "Одни и те же задачи делают по-разному — результат зависит от конкретного человека.",
  "Вы помните, кто что должен делать, но нигде это не записано.",
  "Растёте — начинает падать качество. Не успеваете следить за всем.",
  "Чувствуете, что «что-то не так», но не можете сформулировать что именно.",
];

export function Problem() {
  return (
    <section className="container-x py-section">
      <div className="max-w-2xl">
        <span className="section-eyebrow">Узнаёте себя?</span>
        <h2 className="section-title">Когда стоит думать об операционисте</h2>
        <p className="mt-4 text-muted">
          Если узнаёте 3 из 6 — пора навести порядок. Чем дольше тянете, тем
          дороже это будет стоить.
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
