const steps = [
  {
    n: "01",
    title: "Пишешь в бот",
    desc: "Запускаешь @aura_assistant_bot в Telegram, оставляешь короткую заявку.",
  },
  {
    n: "02",
    title: "Обсуждаем задачи",
    desc: "Подбираю тариф, уточняю формат и приоритеты — без бюрократии.",
  },
  {
    n: "03",
    title: "Я всё делаю",
    desc: "Веду задачи, держу в курсе, отчитываюсь по результату.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="container-x py-24">
      <div className="max-w-2xl">
        <span className="eyebrow">Как это работает</span>
        <h2 className="section-title mt-4">Три шага до свободного времени</h2>
      </div>
      <div className="relative mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="card relative">
            <div className="font-display text-5xl font-bold text-accent/60">{s.n}</div>
            <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
