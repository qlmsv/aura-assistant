export {};

declare global {
  interface TelegramWebApp {
    ready: () => void;
    expand: () => void;
    initData: string;
    initDataUnsafe: Record<string, unknown>;
    colorScheme: "light" | "dark";
    themeParams: Record<string, string>;
  }

  interface Window {
    Telegram?: { WebApp?: TelegramWebApp };
  }
}
