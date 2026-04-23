const items = [
  "Разбор процессов",
  "Описание работы команды",
  "Регламенты и инструкции",
  "Настройка CRM",
  "Таблицы и отчёты для руководителя",
  "Онбординг новых сотрудников",
  "Поиск узких мест",
  "Контроль качества",
  "Базы знаний и документы",
  "Переход на новые инструменты",
  "Автоматизация повторяющихся задач",
  "Встречи с командой и ретроспективы",
];

export function TrustTicker() {
  return (
    <section
      aria-label="Что обычно входит в работу"
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
