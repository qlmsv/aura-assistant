import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#1A0A2E",
        bgSoft: "#22103D",
        bgDeep: "#120722",
        accent: "#E040FB",
        accentSoft: "#B23DCB",
        ink: "#FFFFFF",
        muted: "#C9B8E4",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(3.25rem, 8vw, 7.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.04em" },
        ],
        "display-lg": [
          "clamp(2.25rem, 5.5vw, 5rem)",
          { lineHeight: "1", letterSpacing: "-0.03em" },
        ],
        "display-md": [
          "clamp(1.75rem, 3vw, 2.75rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        eyebrow: [
          "0.72rem",
          { lineHeight: "1", letterSpacing: "0.22em" },
        ],
      },
      spacing: {
        section: "clamp(5rem, 10vw, 9rem)",
        gutter: "clamp(1rem, 3vw, 2rem)",
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(224, 64, 251, 0.5)",
        glowSoft: "0 0 40px -15px rgba(224, 64, 251, 0.35)",
        glowStrong: "0 0 120px -20px rgba(224, 64, 251, 0.65)",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(224, 64, 251, 0.18), transparent 60%)",
        "grid-fade":
          "linear-gradient(180deg, transparent, rgba(26,10,46,1) 75%), radial-gradient(circle at 50% 50%, rgba(224,64,251,0.08), transparent 60%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.08)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        "pulse-glow": "pulse-glow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
