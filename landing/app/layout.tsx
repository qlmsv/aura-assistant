import type { Metadata } from "next";
import { Inter, Manrope, Fraunces } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { NoiseOverlay } from "@/components/NoiseOverlay";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: "АУРА — Операционная архитектура для бизнеса",
  description:
    "Проектирую операционную архитектуру, которая превращает хаос в масштабируемую систему. Аудит, дизайн процессов, внедрение, сопровождение. Для основателей и бизнеса.",
  openGraph: {
    title: "АУРА — Операционная архитектура для бизнеса",
    description:
      "Проектирую системы, которые освобождают основателя от микроменеджмента.",
    type: "website",
  },
  themeColor: "#1A0A2E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${manrope.variable} ${fraunces.variable}`}
    >
      <body>
        <LenisProvider>
          {children}
          <NoiseOverlay />
        </LenisProvider>
      </body>
    </html>
  );
}
