const items = [
  "Переписка с клиентами в Telegram и Instagram",
  "Учёт доходов и расходов",
  "Редактирование договоров",
  "Заказ мерча у типографии",
  "Сбор документов от клиентов",
  "Анализ источников заявок",
  "Согласование партнёрских сделок",
  "Обратная связь маркетологу и SMM",
  "Структурирование папок и таблиц",
  "Напоминания о рабочих задачах",
  "Сопровождение клиента до оплаты",
  "Подбор подрядчиков",
  "Первичный отбор кандидатов на найм",
];

export function TrustTicker() {
  return (
    <section
      aria-label="Что я веду прямо сейчас"
      className="relative border-y border-white/10 bg-bgDeep/60 py-6"
    >
      <div className="mask-fade-r overflow-hidden">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap px-6">
          {[...items, ...items].map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 text-sm text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
