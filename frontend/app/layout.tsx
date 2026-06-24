import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import ThemeToggle from "./_components/ThemeToggle";
import {
  DARK_THEME_START_HOUR,
  LIGHT_THEME_START_HOUR,
  THEME_COOKIE_NAME,
  type Theme,
} from "./theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo List",
  description: "Next.js와 FastAPI로 만든 Todo 앱",
};

const localTimeThemeScript = `
  (() => {
    const hasStoredTheme = document.cookie
      .split("; ")
      .some((cookie) => cookie.startsWith("${THEME_COOKIE_NAME}="));

    if (!hasStoredTheme) {
      const currentHour = new Date().getHours();
      document.documentElement.dataset.theme =
        currentHour >= ${LIGHT_THEME_START_HOUR} && currentHour < ${DARK_THEME_START_HOUR}
          ? "light"
          : "dark";
    }
  })();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const storedTheme = cookieStore.get(THEME_COOKIE_NAME)?.value;
  const hasStoredTheme = storedTheme === "light" || storedTheme === "dark";
  const theme: Theme = storedTheme === "dark" ? "dark" : "light";

  return (
    <html
      lang="ko"
      data-theme={theme}
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <Script id="local-time-theme" strategy="beforeInteractive">
          {localTimeThemeScript}
        </Script>
        <ThemeToggle
          hasStoredTheme={hasStoredTheme}
          initialTheme={theme}
        />
        {children}
      </body>
    </html>
  );
}
