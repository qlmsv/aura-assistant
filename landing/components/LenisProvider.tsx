"use client";

import { useEffect } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cleanup = () => {};

    (async () => {
      try {
        const Lenis = (await import("lenis")).default;
        const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

        let frame = 0;
        const raf = (time: number) => {
          lenis.raf(time);
          frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);

        cleanup = () => {
          cancelAnimationFrame(frame);
          lenis.destroy();
        };
      } catch (e) {
        console.warn("[AURA] Lenis init skipped:", e);
      }
    })();

    return () => cleanup();
  }, []);

  return <>{children}</>;
}
