import { TelegramButton } from "./TelegramButton";

export function CTA() {
  return (
    <section className="container-x py-24">
      <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-bgSoft/60 p-10 text-center sm:p-16">
        <div className="absolute inset-0 -z-10 bg-radial-glow" />
        <h2 className="font-display text-3xl font-bold sm:text-5xl">
          Готовы вернуть себе время?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted">
          Один Telegram-чат вместо десяти приложений. Начните с короткой заявки — отвечу в течение часа.
        </p>
        <div className="mt-9 flex justify-center">
          <TelegramButton>Написать в Telegram</TelegramButton>
        </div>
      </div>
    </section>
  );
}
