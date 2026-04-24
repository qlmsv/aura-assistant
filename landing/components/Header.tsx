import Link from "next/link";
import { Avatar } from "./Avatar";
import { TelegramButton } from "./TelegramButton";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-bg/70 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Avatar size={32} glow />
          <span className="font-display text-lg font-bold tracking-[0.25em]">АУРА</span>
        </Link>
        <nav className="hidden gap-8 text-sm text-muted md:flex">
          <a href="#services" className="transition hover:text-ink">Услуги</a>
          <a href="#pricing" className="transition hover:text-ink">Тарифы</a>
          <a href="#how" className="transition hover:text-ink">Как это работает</a>
        </nav>
        <TelegramButton className="hidden md:inline-flex">Написать</TelegramButton>
      </div>
    </header>
  );
}
