"use client";

import { motion } from "framer-motion";

const services = [
  {
    icon: "🔍",
    title: "Разбор текущей работы",
    pitch: "Смотрю как у вас всё устроено на самом деле.",
    tasks: [
      "Поговорю с вами и ключевыми людьми команды",
      "Посмотрю, как процессы работают в реальности",
      "Найду, где теряется больше всего времени и денег",
      "Расставлю приоритеты: что чинить первым",
      "Принесу отчёт с планом на три месяца",
    ],
  },
  {
    icon: "📋",
    title: "Описание процессов",
    pitch: "Пишу правила работы понятным языком.",
    tasks: [
      "Распишу, кто за что отвечает",
      "Установлю сроки и стандарты",
      "Напишу регламенты без канцелярита",
      "Опишу, что делать в нестандартных ситуациях",
      "Соберу документы в одно место",
    ],
  },
  {
    icon: "⚙️",
    title: "Настройка инструментов",
    pitch: "Собираю работу в один инструмент, а не десять.",
    tasks: [
      "Настрою CRM или помогу выбрать новую",
      "Соберу дашборды для руководителя",
      "Подключу автоматизации повторяющихся задач",
      "Перенесу данные из старых систем",
      "Обучу команду пользоваться",
    ],
  },
  {
    icon: "🤝",
    title: "Сопровождение",
    pitch: "Остаюсь рядом, пока система не начнёт работать без меня.",
    tasks: [
      "Веду операционные вопросы за вас",
      "Регулярные встречи с командой",
      "Слежу за качеством и метриками",
      "Улучшаю процессы по ходу",
      "Постепенно передаю всё внутреннему руководителю",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="container-x py-section">
      <div className="max-w-2xl">
        <span className="section-eyebrow">Что я делаю</span>
        <h2 className="section-title">Четыре направления работы</h2>
        <p className="mt-4 text-muted">
          Можно взять что-то одно под конкретную задачу или пройти всё по
          порядку: от разбора до постоянного сопровождения.
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
