const services = [
  {
    icon: "✉️",
    title: "Клиенты и переписка",
    desc: "Ответы в Telegram и Instagram, работа с лидами до сделки, сбор документов, деловая переписка с агентствами и подрядчиками.",
  },
  {
    icon: "📊",
    title: "Финансы и документы",
    desc: "Учёт доходов и расходов, ведение договоров и чеков, редактирование документов, структурирование таблиц и папок.",
  },
  {
    icon: "🗂",
    title: "Координация и ресёрч",
    desc: "Календарь, напоминания, бронирование билетов и отелей, поиск подрядчиков и закупка мерча, контроль исполнителей.",
  },
];

export function Services() {
  return (
    <section id="services" className="container-x py-24">
      <div className="max-w-2xl">
        <span className="eyebrow">Услуги</span>
        <h2 className="section-title mt-4">Что я беру на себя</h2>
        <p className="mt-4 text-muted">
          Три направления, которые закрывают 90% повседневных задач предпринимателей и руководителей.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="card group">
            <div className="text-3xl">{s.icon}</div>
            <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
