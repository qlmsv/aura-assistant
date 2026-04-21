export function Profile() {
  const user = window.Telegram?.WebApp?.initDataUnsafe ?? {};
  return (
    <section className="page">
      <h1 className="page__title">Профиль</h1>
      <pre className="page__pre">{JSON.stringify(user, null, 2)}</pre>
    </section>
  );
}
