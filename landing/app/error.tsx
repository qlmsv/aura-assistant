"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[AURA] runtime error:", error);
  }, [error]);

  return (
    <main className="container-x flex min-h-screen flex-col items-center justify-center text-center">
      <span className="section-eyebrow mb-4">Ошибка</span>
      <h1 className="font-display text-display-md font-semibold">Что-то пошло не так</h1>
      <p className="mt-4 max-w-md text-muted">
        Не страшно — обновите страницу или вернитесь чуть позже.
      </p>
      <pre className="mt-6 max-w-xl overflow-x-auto rounded-xl border border-white/10 bg-bgSoft/60 p-4 text-left text-xs text-muted">
        {error?.message ?? "Unknown error"}
        {error?.digest ? `\n\ndigest: ${error.digest}` : ""}
      </pre>
      <button onClick={reset} className="btn-primary mt-8">
        Попробовать снова
      </button>
    </main>
  );
}
