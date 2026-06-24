"use client";

import { useEffect, useState } from "react";
import {
  getThemeForLocalTime,
  THEME_COOKIE_NAME,
  type Theme,
} from "../theme";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;
const LOCAL_TIME_CHECK_INTERVAL = 60 * 1000;

export default function ThemeToggle({
  hasStoredTheme,
  initialTheme,
}: {
  hasStoredTheme: boolean;
  initialTheme: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [isAutomatic, setIsAutomatic] = useState(!hasStoredTheme);
  const isLightTheme = theme === "light";

  useEffect(() => {
    if (!isAutomatic) {
      return;
    }

    const applyLocalTimeTheme = () => {
      const localTimeTheme = getThemeForLocalTime();

      document.documentElement.dataset.theme = localTimeTheme;
      setTheme(localTimeTheme);
    };

    applyLocalTimeTheme();
    const intervalId = window.setInterval(
      applyLocalTimeTheme,
      LOCAL_TIME_CHECK_INTERVAL,
    );

    return () => window.clearInterval(intervalId);
  }, [isAutomatic]);

  const toggleTheme = () => {
    const nextTheme: Theme = isLightTheme ? "dark" : "light";

    document.documentElement.dataset.theme = nextTheme;
    document.cookie = `${THEME_COOKIE_NAME}=${nextTheme}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`;
    setIsAutomatic(false);
    setTheme(nextTheme);
  };

  const modeDescription = isAutomatic ? "현재 지역 시간 기준 자동 테마" : "선택한 테마";

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`${modeDescription}: ${isLightTheme ? "다크 모드로 변경" : "라이트 모드로 변경"}`}
      title={`${modeDescription} · ${isLightTheme ? "다크 모드" : "라이트 모드"}`}
      onClick={toggleTheme}
    >
      <span aria-hidden="true">{isLightTheme ? "🌙" : "☀️"}</span>
    </button>
  );
}
