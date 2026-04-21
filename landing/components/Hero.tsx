import { TelegramButton } from "./TelegramButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-radial-glow" />
      <div className="container-x flex flex-col items-center pt-24 pb-28 text-center sm:pt-32 sm:pb-36">
        <span className="eyebrow">Personal · Online · 24/7</span>
        <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          <span className="block">АУРА</span>
          <span className="mt-3 block bg-gradient-to-r from-ink via-accent to-ink bg-clip-text text-transparent">
            Ваш личный ассистент онлайн
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
          Беру рутину на себя. Переписка, ресёрч, координация — всё в одном Telegram-чате.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <TelegramButton>Написать в Telegram</TelegramButton>
          <a href="#pricing" className="btn-ghost">Смотреть тарифы</a>
        </div>
        <div className="mt-14 grid w-full grid-cols-3 gap-6 text-left sm:max-w-2xl">
          {[
            { v: "< 30 мин", l: "Среднее время ответа" },
            { v: "100%", l: "Конфиденциально" },
            { v: "RU · EN", l: "Языки общения" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-white/10 bg-bgSoft/40 p-4">
              <div className="font-display text-xl font-bold text-accent">{s.v}</div>
              <div className="mt-1 text-xs text-muted">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
