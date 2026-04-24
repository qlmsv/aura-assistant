"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faq = [
  {
    q: "Как вы гарантируете конфиденциальность?",
    a: "Подписываем NDA до передачи доступов. Пароли храню в менеджере паролей, доступы отзываются в любой момент по вашему запросу.",
  },
  {
    q: "Вы замените мне штатного ассистента?",
    a: "По объёму задач тариф «VIP» закрывает функции личного ассистента на удалёнке. Без расходов на рабочее место, налоги и отпускные.",
  },
  {
    q: "В каком часовом поясе вы работаете?",
    a: "Рабочие часы согласовываем под ваш пояс. В тарифе «VIP» доступны срочные задачи вне графика.",
  },
  {
    q: "Сколько времени занимает онбординг?",
    a: "От 1 до 3 рабочих дней. Первую простую задачу могу забрать в день подписания договора.",
  },
  {
    q: "Чего вы не делаете?",
    a: "Не веду бухгалтерскую и налоговую отчётность, не пишу код, не занимаюсь дизайном. Для таких задач нахожу подрядчика и веду его от вашего имени.",
  },
  {
    q: "Что если задач окажется больше, чем часов в тарифе?",
    a: "Предупреждаю заранее. Вы выбираете: перенести часть задач, докупить часы или перейти на следующий тариф.",
  },
  {
    q: "Как отказаться от услуг?",
    a: "Без штрафов и неустоек. Предупреждение за 7 дней, передача всех материалов и доступов — в вашу сторону.",
  },
  {
    q: "Кто работает со мной на тарифе VIP?",
    a: "Проверенные специалисты под конкретные задачи: копирайтер, дизайнер, SMM. Я остаюсь единой точкой контакта.",
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
            {["NDA", "GDPR-ready", "Двухфакторная аутентификация", "Менеджер паролей"].map(
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
