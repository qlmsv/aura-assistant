"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Msg = { from: "user" | "aura"; text: string };

const script: Msg[] = [
  { from: "user", text: "Перенеси встречу с Андреем на четверг 15:00" },
  { from: "aura", text: "Согласовала 🕒 четверг, 15:00. Отправлю напоминание за час." },
  { from: "user", text: "И посчитай расходы за октябрь" },
  { from: "aura", text: "Собрала таблицу. Итого: ₽ 284 600. Прислала сводку в личку." },
];

export function TelegramPreview() {
  const [visible, setVisible] = useState<Msg[]>([]);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    const push = () => {
      if (cancelled) return;
      if (i >= script.length) {
        setTimeout(() => {
          if (cancelled) return;
          setVisible([]);
          i = 0;
          setTimeout(push, 500);
        }, 3200);
        return;
      }
      setVisible((v) => [...v, script[i]]);
      i += 1;
      setTimeout(push, 1400);
    };
    const t = setTimeout(push, 600);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-px rounded-[28px] bg-[linear-gradient(135deg,rgba(224,64,251,0.5),rgba(255,255,255,0.06)_40%,rgba(224,64,251,0.25))] blur-[1px]" />
      <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-bgSoft/80 shadow-glowSoft backdrop-blur-xl">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-accent text-sm font-bold text-bg shadow-glow">
            A
          </div>
          <div className="flex-1">
            <div className="font-display text-sm font-semibold">АУРА</div>
            <div className="text-[11px] text-muted">в сети · печатает…</div>
          </div>
          <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        </div>

        <div className="flex min-h-[340px] flex-col gap-2 px-4 py-5">
          <AnimatePresence initial={false}>
            {visible.map((m, idx) => (
              <motion.div
                key={`${idx}-${m.text}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${
                  m.from === "user"
                    ? "self-end rounded-br-md bg-accent/90 text-bg"
                    : "self-start rounded-bl-md bg-white/5 text-ink"
                }`}
              >
                {m.text}
              </motion.div>
            ))}
            {visible.length < script.length && visible.length > 0 && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1 self-start rounded-2xl bg-white/5 px-3 py-2"
              >
                <Dot /> <Dot delay={0.15} /> <Dot delay={0.3} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
          <div className="flex-1 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-muted">
            Сообщение…
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-accent text-bg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M3 12l18-9-6 18-3-8-9-1z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="inline-block h-1.5 w-1.5 rounded-full bg-muted"
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
      transition={{ duration: 1, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}
