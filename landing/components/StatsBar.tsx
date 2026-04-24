"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Stat = { value: number; suffix: string; label: string; prefix?: string };

const stats: Stat[] = [
  { value: 120, suffix: "ч", label: "Возвращено в месяц среднему клиенту" },
  { value: 30, suffix: "мин", prefix: "≤", label: "Среднее время ответа" },
  { value: 48, suffix: "", label: "Задач за неделю без потерь" },
  { value: 3, suffix: "дн", label: "От заявки до первой задачи" },
];

export function StatsBar() {
  return (
    <section className="container-x py-section">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatItem key={s.label} stat={s} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, stat.value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, stat.value]);

  return (
    <div ref={ref} className="relative">
      <div className="font-display text-display-md font-semibold tracking-tight">
        {stat.prefix ? <span className="text-accent/80">{stat.prefix} </span> : null}
        <span className="text-gradient">{n}</span>
        {stat.suffix && <span className="ml-1 text-muted">{stat.suffix}</span>}
      </div>
      <div className="mt-2 h-px w-12 bg-accent/60" />
      <p className="mt-3 text-sm leading-snug text-muted">{stat.label}</p>
    </div>
  );
}
