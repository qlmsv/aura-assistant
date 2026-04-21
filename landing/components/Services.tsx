"use client";

import { motion } from "framer-motion";

const services = [
  {
    icon: "✉️",
    title: "Клиенты и заявки",
    pitch: "Веду переписку так, чтобы интерес превращался в оплату.",
    tasks: [
      "Ответы в Telegram и Instagram",
      "Сопровождение от первого сообщения до сделки",
      "Сбор пакета документов и дедлайнов",
      "Разбор источников заявок",
      "Ведение базы и истории общения",
    ],
  },
  {
    icon: "📊",
    title: "Финансы и документы",
    pitch: "Порядок в цифрах и бумагах — без вашего участия.",
    tasks: [
      "Учёт доходов и расходов",
      "Редактирование договоров под новые условия",
      "Систематизация чеков, квитанций, актов",
      "Подготовка папок и таблиц под процессы",
      "Согласование партнёрских договоров",
    ],
  },
  {
    icon: "🔎",
    title: "Операционка и подбор",
    pitch: "Поиск, заказ, найм — от идеи до результата.",
    tasks: [
      "Подбор подрядчиков: типография, ателье, сервисы",
      "Заказ мерча и сопровождение производства",
      "Первичный отбор кандидатов: вопросы, фильтр, передача руководителю",
      "Разовые задачи, на которые у вас нет времени",
      "Коммуникация с командой от вашего имени",
    ],
  },
  {
    icon: "🗓",
    title: "Календарь и поездки",
    pitch: "Ваш день собран заранее — остаётся прийти.",
    tasks: [
      "Ведение календаря и напоминания",
      "Бронирование перелётов и отелей",
      "Справки по собеседникам перед встречей",
      "Подготовка материалов к переговорам",
      "Планирование недели по приоритетам",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="container-x py-section">
      <div className="max-w-2xl">
        <span className="section-eyebrow">Решение</span>
        <h2 className="section-title">Что я беру на себя</h2>
        <p className="mt-4 text-muted">
          Четыре направления, которые закрывают операционку основателя.
          Конкретные задачи — не абстрактная «поддержка».
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-bgSoft/50 p-8 backdrop-blur transition hover:border-accent/40 hover:shadow-glowSoft"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="flex items-center gap-3">
              <span className="text-2xl">{s.icon}</span>
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
            </div>
            <p className="mt-3 text-sm text-muted">{s.pitch}</p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {s.tasks.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-ink/90">
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
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
