"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faq = [
  {
    q: "С какими размерами бизнеса вы работаете?",
    a: "От 5 до 150 человек в команде. Это сладкая точка, где есть операционная сложность, но ещё нет полноценной ops-функции. Меньше — нет задачи для архитектора. Больше — нужен full-time директор или команда.",
  },
  {
    q: "Что если у нас уже есть ops-директор или COO?",
    a: "Работаю как внешний архитектор в связке с ним. Моя роль — принести взгляд со стороны, методологию и время, которого у внутреннего руководителя нет. После проекта вся система остаётся у вас внутри.",
  },
  {
    q: "Как устроена конфиденциальность?",
    a: "NDA подписываем до первого созвона по вашему запросу, до доступов — обязательно. Пароли храню в менеджере паролей, доступы отзываются в любой момент. Материалы проекта передаются вам по его завершении.",
  },
  {
    q: "Вы работаете с нашими инструментами или внедряете свои?",
    a: "Смотрю что у вас есть. Если стек покрывает задачу — работаем с ним. Если критически не хватает — предлагаю замену с обоснованием. Не внедряю инструменты ради внедрения.",
  },
  {
    q: "Как измеряется результат?",
    a: "До старта фиксируем 3–5 ключевых метрик: время ответа, конверсия, стоимость процесса, загрузка основателя, устойчивость SLA. Замер до/после — в отчёте. Если метрики не двигаются — разбираем почему и корректируем подход.",
  },
  {
    q: "Нужно ли мне уже знать, что сломано?",
    a: "Нет. Если бы вы знали — не нужен был бы я. Первая задача диагностики — сформулировать что именно болит и в каком приоритете это чинить.",
  },
  {
    q: "Какой минимальный срок работы?",
    a: "Диагностика — 2 недели фикс. Проект — от 6 недель. Retainer — от 3 месяцев (иначе не успеваем войти в контекст и начать приносить пользу).",
  },
  {
    q: "Чего вы не делаете?",
    a: "Не веду бухгалтерскую и налоговую отчётность, не пишу код, не занимаюсь маркетингом и продажами напрямую. Настраиваю операционную систему вокруг этих функций — но сами функции остаются у профильных специалистов.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-x py-section">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <span className="section-eyebrow">Частые вопросы</span>
          <h2 className="section-title">Короткие ответы на то, о чём обычно спрашивают</h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {["NDA", "GDPR-ready", "Двухфакторка", "Менеджер паролей"].map(
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
