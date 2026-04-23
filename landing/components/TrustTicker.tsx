const items = [
  "Аудит операционной архитектуры",
  "Карта процессов и узких мест",
  "Проектирование RACI и SLA",
  "Регламенты и стандарты работы",
  "Автоматизация согласований",
  "Настройка CRM и трекеров",
  "Панели управления для руководителя",
  "Онбординг команды на новую систему",
  "Миграция данных и документов",
  "Выявление затыков и потерь",
  "Оптимизация клиентского пути",
  "Сопровождение и ретроспективы",
];

export function TrustTicker() {
  return (
    <section
      aria-label="Что я проектирую и внедряю"
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
