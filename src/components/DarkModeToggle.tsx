import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full text-sm font-semibold bg-card text-card-foreground border border-border shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
      aria-label={dark ? "Включить светлый режим" : "Включить ночной режим"}
    >
      {dark ? "☀️ Светлый" : "🌙 Ночной режим"}
    </button>
  );
};

export default DarkModeToggle;
