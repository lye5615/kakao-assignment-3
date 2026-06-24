"use client";

import { useState } from "react";

type Theme = "light" | "dark";

const THEME_COOKIE_NAME = "todo-theme";
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export default function ThemeToggle({
  initialTheme,
}: {
  initialTheme: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const isLightTheme = theme === "light";

  const toggleTheme = () => {
    const nextTheme: Theme = isLightTheme ? "dark" : "light";

    document.documentElement.dataset.theme = nextTheme;
    document.cookie = `${THEME_COOKIE_NAME}=${nextTheme}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`;
    setTheme(nextTheme);
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={isLightTheme ? "다크 모드로 변경" : "라이트 모드로 변경"}
      title={isLightTheme ? "다크 모드" : "라이트 모드"}
      onClick={toggleTheme}
    >
      <span aria-hidden="true">{isLightTheme ? "🌙" : "☀️"}</span>
    </button>
  );
}
