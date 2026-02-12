import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="fixed top-5 right-5 z-50 px-5 py-2.5 rounded-2xl text-sm font-semibold font-display bg-card text-card-foreground border border-border shadow-[var(--shadow-card)] hover:opacity-90 active:scale-[0.98] transition-all duration-200 cursor-pointer"
      aria-label={dark ? "Включить светлый режим" : "Включить ночной режим"}
    >
      {dark ? "☀️ Светлый" : "🌙 Ночной режим"}
    </button>
  );
};

export default DarkModeToggle;
