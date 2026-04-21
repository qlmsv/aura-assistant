"use client";

export function AuraOrb() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-40 right-[-12%] -z-10 h-[640px] w-[640px] opacity-70 sm:right-[-5%]"
    >
      <div className="absolute inset-0 animate-pulse-glow rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(224,64,251,0.55),rgba(224,64,251,0.15)_45%,transparent_70%)] blur-3xl" />
      <div className="absolute inset-10 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,rgba(224,64,251,0.0),rgba(224,64,251,0.45),rgba(178,61,203,0.2),rgba(224,64,251,0.0))] blur-2xl" />
    </div>
  );
}
