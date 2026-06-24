export type Theme = "light" | "dark";

export const THEME_COOKIE_NAME = "todo-theme";
export const LIGHT_THEME_START_HOUR = 6;
export const DARK_THEME_START_HOUR = 18;

export function getThemeForHour(hour: number): Theme {
  return hour >= LIGHT_THEME_START_HOUR && hour < DARK_THEME_START_HOUR
    ? "light"
    : "dark";
}

export function getThemeForLocalTime(date = new Date()): Theme {
  return getThemeForHour(date.getHours());
}
