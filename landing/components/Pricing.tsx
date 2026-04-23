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
    subtitle: "Если понятно что что-то не так, но непонятно с чего начать",
    bullets: [
      "Поговорю с вами и 3–5 ключевыми людьми",
      "Посмотрю на работу, а не на то, что вам о ней рассказывают",
      "Найду, где теряется больше всего",
      "Напишу план действий на 3 месяца",
      "Скажу, сколько примерно займёт всё починить",
    ],
    bestFor: "Разовая работа, без обязательств продолжать.",
    cta: "Взять «Диагностику»",
  },
  {
    name: "Проект",
    price: "от 500 000 ₽",
    term: "6–12 недель",
    subtitle: "Один раз выстроить работу нормально",
    bullets: [
      "Всё из «Диагностики»",
      "Распишу кто за что отвечает",
      "Настрою основные инструменты",
      "Напишу понятные регламенты",
      "Обучу команду",
      "Передам документы и доступы",
    ],
    bestFor: "Когда пора построить систему, а не бесконечно латать.",
    cta: "Обсудить проект",
    featured: true,
  },
  {
    name: "Сопровождение",
    price: "250 000 ₽ / мес",
    term: "От 3 месяцев",
    subtitle: "Постоянный человек на операционке",
    bullets: [
      "Всё из «Проекта»",
      "Работаю 20 часов в неделю",
      "Слежу за метриками и качеством",
      "Регулярные встречи с командой",
      "Улучшаю процессы по ходу",
      "Постепенно учу внутреннего руководителя",
    ],
    bestFor: "Если нужен постоянный человек, но не полноценный C-level.",
    cta: "Обсудить retainer",
  },
  {
    name: "Под задачу",
    price: "по запросу",
    term: "Индивидуально",
    subtitle: "Когда бизнес вырос из прежней схемы работы",
    bullets: [
      "Всё из «Сопровождения»",
      "Плюс специалисты под ваши задачи",
      "Работа со сменой модели бизнеса",
      "Выход на новые рынки",
      "Взаимодействие с инвесторами и советом",
    ],
    bestFor: "Крупные трансформационные задачи, а не операционная рутина.",
    cta: "Запросить расчёт",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="container-x py-section">
      <div className="max-w-2xl">
        <span className="section-eyebrow">Форматы и цены</span>
        <h2 className="section-title">Как можно со мной работать</h2>
        <p className="mt-4 text-muted">
          Четыре формата — от разовой диагностики до постоянной работы.
          Переходить между форматами можно в любой момент.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
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
              className={`relative flex h-full flex-col rounded-3xl border p-8 backdrop-blur transition ${
                t.featured
                  ? "border-transparent bg-bgSoft/85 shadow-glow"
                  : "border-white/10 bg-bgSoft/50 hover:border-accent/40 hover:shadow-glowSoft"
              }`}
            >
              {t.featured && (
                <span className="mb-4 self-start rounded-full bg-accent/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Чаще всего берут
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
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
