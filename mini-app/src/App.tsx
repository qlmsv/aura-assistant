import { useEffect } from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { Chat } from "./pages/Chat";
import { Tasks } from "./pages/Tasks";
import { Profile } from "./pages/Profile";

export function App() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <span className="app__logo">АУРА</span>
      </header>

      <main className="app__content">
        <Routes>
          <Route path="/" element={<Navigate to="/chat" replace />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <nav className="app__tabs">
        <NavLink to="/chat" className="app__tab">💬 Чат</NavLink>
        <NavLink to="/tasks" className="app__tab">🗂 Задачи</NavLink>
        <NavLink to="/profile" className="app__tab">👤 Профиль</NavLink>
      </nav>
    </div>
  );
}
