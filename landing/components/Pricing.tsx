"use client";

import { motion } from "framer-motion";
import { TelegramButton } from "./TelegramButton";

type Tier = {
  name: string;
  price: string;
  hours: string;
  subtitle: string;
  bullets: string[];
  bestFor: string;
  cta: string;
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Старт",
    price: "$300",
    hours: "10 часов / мес",
    subtitle: "Для точечных задач",
    bullets: [
      "Ответ в течение 30 минут в рабочие часы",
      "Переписка с клиентами и подрядчиками",
      "Ведение документов и таблиц",
      "Разовые поручения",
      "Ежедневный короткий отчёт",
    ],
    bestFor: "Снять с себя 2–3 повторяющиеся задачи.",
    cta: "Выбрать «Старт»",
  },
  {
    name: "Бизнес",
    price: "$400",
    hours: "25 часов / мес",
    subtitle: "Для тех, кто хочет освободить голову",
    bullets: [
      "Всё из «Старт»",
      "Полное ведение клиентских переписок",
      "Финансовый учёт и редактирование договоров",
      "Поиск подрядчиков и заказ под ключ",
      "Календарь, перелёты, отели",
      "Еженедельный разбор приоритетов",
    ],
    bestFor: "Основателям, у которых операционка растёт быстрее, чем хотелось бы.",
    cta: "Выбрать «Бизнес»",
    featured: true,
  },
  {
    name: "VIP",
    price: "$800",
    hours: "Без лимита",
    subtitle: "Личный офис онлайн",
    bullets: [
      "Всё из «Бизнес»",
      "Работа без лимита по часам",
      "Команда под ваши задачи",
      "Сопровождение партнёрских сделок",
      "Ночные и срочные задачи по запросу",
      "Персональный регламент под процессы",
    ],
    bestFor: "Когда ассистент — условие, чтобы бизнес ехал.",
    cta: "Обсудить VIP",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="container-x py-section">
      <div className="max-w-2xl">
        <span className="section-eyebrow">Тарифы</span>
        <h2 className="section-title">Три формата сотрудничества</h2>
        <p className="mt-4 text-muted">
          Прозрачная месячная подписка без скрытых платежей. Переход между тарифами — в любой момент.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {t.featured && (
              <div
                aria-hidden
                className="absolute -inset-px rounded-3xl bg-[linear-gradient(130deg,rgba(224,64,251,0.7),rgba(255,255,255,0.05)_45%,rgba(224,64,251,0.45))]"
              />
            )}
            <div
              className={`relative flex h-full flex-col rounded-3xl border p-8 backdrop-blur transition ${
                t.featured
                  ? "border-transparent bg-bgSoft/85 shadow-glow"
                  : "border-white/10 bg-bgSoft/50 hover:border-accent/40 hover:shadow-glowSoft"
              }`}
            >
              {t.featured && (
                <span className="mb-4 self-start rounded-full bg-accent/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Оптимальный выбор
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted">{t.subtitle}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-5xl font-bold tracking-tight">
                  {t.price}
                </span>
                <span className="text-sm text-muted">/ мес</span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-accent/90">
                {t.hours}
              </p>

              <ul className="mt-7 space-y-3 text-sm">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
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
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 border-t border-white/10 pt-5 text-xs leading-relaxed text-muted">
                {t.bestFor}
              </p>

              <div className="mt-6">
                <TelegramButton
                  variant={t.featured ? "primary" : "ghost"}
                  className="w-full"
                >
                  {t.cta}
                </TelegramButton>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
