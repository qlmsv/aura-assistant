"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faq = [
  {
    q: "С каким размером бизнеса работаете?",
    a: "От 5 до 150 человек в команде. Меньше — обычно нет задачи для отдельного операциониста. Больше — уже нужна команда, а не один человек.",
  },
  {
    q: "У нас уже есть операционный директор — зачем вы?",
    a: "Работаю с ним в связке. Приношу взгляд со стороны, методологию и руки. У внутреннего руководителя обычно нет времени на большие перестройки — мы можем сделать это вместе, пока он занят текущим.",
  },
  {
    q: "А если я не знаю, что именно сломано?",
    a: "Это нормально — иначе бы я не был нужен. Первая задача диагностики — разобраться вместе с вами, что именно болит и в каком порядке это чинить.",
  },
  {
    q: "Вы внедряете свои инструменты или работаем с нашими?",
    a: "Сначала смотрю, что у вас есть. Если текущий набор покрывает задачу — работаем с ним. Если критически не хватает — предложу замену и объясню почему. Не меняю инструменты ради смены.",
  },
  {
    q: "Как договариваемся про конфиденциальность?",
    a: "NDA подписываем до первого созвона, если хотите. До передачи доступов — обязательно. Все пароли храню в менеджере паролей, доступы отзываются в любой момент.",
  },
  {
    q: "Как поймём, что работа приносит результат?",
    a: "До старта вместе выбираем 3–5 метрик: время ответа клиенту, конверсия, загрузка вас как основателя, что-то ещё важное. Замер до/после — в отчёте. Если метрики не двигаются — разбираемся почему.",
  },
  {
    q: "Какой минимальный срок?",
    a: "Диагностика — 2 недели фикс. Проект — от 6 недель. Сопровождение — от 3 месяцев (за меньший срок не успеваю вникнуть в контекст).",
  },
  {
    q: "Чего вы не делаете?",
    a: "Не веду бухгалтерию, не пишу код, не занимаюсь маркетингом и продажами напрямую. Настраиваю систему вокруг этих функций — но сами функции остаются у профильных специалистов.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-x py-section">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <span className="section-eyebrow">Частые вопросы</span>
          <h2 className="section-title">Что обычно спрашивают</h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {["NDA", "Менеджер паролей", "Двухфакторка", "Отзыв доступов"].map(
              (b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted"
                >
                  {b}
                </span>
              )
            )}
          </div>
        </div>

        <ul className="divide-y divide-white/10 border-t border-b border-white/10">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-medium leading-snug sm:text-lg">
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className={`mt-1 inline-grid h-7 w-7 flex-none place-items-center rounded-full border border-white/15 text-accent transition-transform ${
                      isOpen ? "rotate-45 border-accent/60 bg-accent/10" : "group-hover:border-accent/40"
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-10 text-sm leading-relaxed text-muted sm:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
