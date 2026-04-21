import { TelegramButton } from "./TelegramButton";

const tiers = [
  {
    name: "Старт",
    price: "$300",
    period: "/ мес",
    summary: "10 часов в месяц",
    features: [
      "Базовые задачи и поручения",
      "Переписка в боте",
      "Ответ в течение часа",
    ],
    cta: "Старт",
    accent: false,
  },
  {
    name: "Бизнес",
    price: "$400",
    period: "/ мес",
    summary: "25 часов в месяц",
    features: [
      "Приоритетный отклик",
      "Координация задач и проектов",
      "Календарь и напоминания",
      "Ответ в течение 30 минут",
    ],
    cta: "Бизнес",
    accent: true,
  },
  {
    name: "VIP",
    price: "$800",
    period: "/ мес",
    summary: "Безлимит",
    features: [
      "Команда ассистентов",
      "Стратегические задачи",
      "Личный аккаунт-менеджер",
      "Ответ 24/7",
    ],
    cta: "VIP",
    accent: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="container-x py-24">
      <div className="max-w-2xl">
        <span className="eyebrow">Тарифы</span>
        <h2 className="section-title mt-4">Подписка под ваш ритм</h2>
        <p className="mt-4 text-muted">
          Прозрачные пакеты без скрытых платежей. Меняйте тариф в любой момент.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`card flex flex-col ${
              t.accent ? "border-accent/60 shadow-glow" : ""
            }`}
          >
            {t.accent && (
              <span className="self-start rounded-full bg-accent/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
                Популярный
              </span>
            )}
            <h3 className="mt-3 font-display text-xl font-semibold">{t.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold">{t.price}</span>
              <span className="text-sm text-muted">{t.period}</span>
            </div>
            <p className="mt-2 text-sm text-muted">{t.summary}</p>
            <ul className="mt-6 space-y-3 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 flex-none text-accent" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-white/10">
              <TelegramButton variant={t.accent ? "primary" : "ghost"} className="w-full">
                Выбрать «{t.cta}»
              </TelegramButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
