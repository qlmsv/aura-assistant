export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-x flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-bg">
            <span className="font-display text-[10px] font-bold">A</span>
          </span>
          <span className="font-display tracking-widest">АУРА</span>
        </div>
        <div>© {new Date().getFullYear()} АУРА. Все права защищены.</div>
      </div>
    </footer>
  );
}
