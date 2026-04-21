type Props = {
  variant?: "primary" | "ghost";
  className?: string;
  children?: React.ReactNode;
};

export function TelegramButton({ variant = "primary", className = "", children }: Props) {
  const username = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME ?? "aura_assistant_bot";
  const href = `https://t.me/${username}`;
  const cls = variant === "primary" ? "btn-primary" : "btn-ghost";
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`${cls} ${className}`}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.24 3.64 11.95c-.88-.25-.89-.86.2-1.3l16-6.18c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.13-3.05-1.99 1.93c-.23.23-.42.42-.86.42z" />
      </svg>
      {children ?? "Написать в Telegram"}
    </a>
  );
}
