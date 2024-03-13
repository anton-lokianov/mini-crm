import { create } from "zustand";
import { useEffect } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const useThemeStore = create<ThemeStore>()((set) => ({
  theme: "system",
  setTheme: (theme) => set({ theme }),
}));

export const useTheme = () => {
  const { theme, setTheme } = useThemeStore((state) => state);

  useEffect(() => {
    const root = window.document.documentElement;
    const storageKey = "ui-theme";

    root.classList.remove("light", "dark");

    const effectiveTheme = theme === "system" ? getSystemTheme() : theme;

    root.classList.add(effectiveTheme);

    localStorage.setItem(storageKey, theme);

    return () => {
      root.classList.remove(effectiveTheme);
    };
  }, [theme]);

  return { theme, setTheme };
};
