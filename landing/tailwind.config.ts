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
        accent: "#E040FB",
        accentSoft: "#B23DCB",
        ink: "#FFFFFF",
        muted: "#C9B8E4",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Manrope", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(224, 64, 251, 0.5)",
        glowSoft: "0 0 40px -15px rgba(224, 64, 251, 0.35)",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(224, 64, 251, 0.18), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
