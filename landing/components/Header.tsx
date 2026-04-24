import Link from "next/link";
import { TelegramButton } from "./TelegramButton";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-bg/70 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-bg shadow-glow">
            <span className="font-display text-sm font-bold">A</span>
          </span>
          <span className="font-display text-lg font-bold tracking-[0.25em]">АУРА</span>
        </Link>
        <nav className="hidden gap-8 text-sm text-muted md:flex">
          <a href="#services" className="transition hover:text-ink">Что делаю</a>
          <a href="#pricing" className="transition hover:text-ink">Форматы</a>
          <a href="#how" className="transition hover:text-ink">Как начинаем</a>
        </nav>
        <TelegramButton className="hidden md:inline-flex">Диагностика</TelegramButton>
      </div>
    </header>
  );
}
