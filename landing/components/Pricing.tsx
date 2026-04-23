"use client";

import { motion } from "framer-motion";
import { TelegramButton } from "./TelegramButton";

type Tier = {
  name: string;
  price: string;
  term: string;
  subtitle: string;
  bullets: string[];
  bestFor: string;
  cta: string;
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Диагностика",
    price: "150 000 ₽",
    term: "2 недели · фикс",
    subtitle: "Точка входа с низким риском",
    bullets: [
      "Интервью с 3–5 ключевыми людьми",
      "Карта процессов с узкими местами",
      "Приоритеты: что ломать первым",
      "Отчёт с планом на 90 дней",
      "Оценка бюджета внедрения",
    ],
    bestFor: "Когда вы знаете, что система не работает, но не знаете с чего начать.",
    cta: "Взять «Диагностику»",
  },
  {
    name: "Проект",
    price: "от 500 000 ₽",
    term: "6–12 недель",
    subtitle: "Выстраиваем операционку один раз и нормально",
    bullets: [
      "Всё из «Диагностики»",
      "Проектирование целевой архитектуры",
      "Регламенты, SLA, RACI",
      "Внедрение ключевых процессов",
      "Настройка CRM, трекеров, дашбордов",
      "Документация и онбординг команды",
    ],
    bestFor: "Когда пора выстроить систему под рост, а не латать дыры.",
    cta: "Обсудить проект",
    featured: true,
  },
  {
    name: "Ops-директор",
    price: "250 000 ₽",
    term: "/ мес · retainer, от 3 мес",
    subtitle: "Операционный директор на части ставки",
    bullets: [
      "Всё из «Проекта»",
      "20 часов в неделю погружения",
      "Мониторинг SLA и метрик",
      "Регулярные ретроспективы",
      "Оптимизация на ходу, без нового проекта",
      "Постепенная передача внутреннему руководителю",
    ],
    bestFor: "Когда нужен постоянный человек на операциях, но не полноценный C-level найм.",
    cta: "Обсудить retainer",
  },
  {
    name: "Трансформация",
    price: "по запросу",
    term: "end-to-end",
    subtitle: "Когда бизнес вырос из прошлой архитектуры",
    bullets: [
      "Всё из «Ops-директора»",
      "Команда специалистов под ваши задачи",
      "Работа со сменой бизнес-модели",
      "Масштабирование на новые рынки",
      "Взаимодействие с советом и инвесторами",
      "Персональный регламент под ваши процессы",
    ],
    bestFor: "Когда операционка перестала быть узким местом и стала стратегией.",
    cta: "Запросить расчёт",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="container-x py-section">
      <div className="max-w-2xl">
        <span className="section-eyebrow">Форматы сотрудничества</span>
        <h2 className="section-title">Четыре формата работы</h2>
        <p className="mt-4 text-muted">
          От разовой диагностики до долгосрочного сопровождения. Переход между
          форматами — в любой момент, без штрафов.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {t.featured && (
              <div
                aria-hidden
                className="absolute -inset-px rounded-3xl bg-[linear-gradient(130deg,rgba(224,64,251,0.7),rgba(255,255,255,0.05)_45%,rgba(224,64,251,0.45))]"
              />
            )}
            <div
              className={`relative flex h-full flex-col rounded-3xl border p-7 backdrop-blur transition ${
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
              <h3 className="font-display text-xl font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted">{t.subtitle}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {t.price}
                </span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-accent/90">
                {t.term}
              </p>

              <ul className="mt-6 space-y-3 text-sm">
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

              <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-muted">
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
