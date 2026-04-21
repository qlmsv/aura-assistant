import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "АУРА — Личный ассистент онлайн",
  description:
    "Премиум-сервис личного ассистента. Беру рутину на себя — переписка, ресёрч, координация задач. Пиши в Telegram.",
  openGraph: {
    title: "АУРА — Личный ассистент онлайн",
    description:
      "Премиум-сервис личного ассистента. Беру рутину на себя.",
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
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
