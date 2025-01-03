import { useState, useEffect } from "react";
import type { AppColorMode } from "@/types";

const APP_THEME = "APP_THEME";

export function useColorMode() {
  const [colorMode, setColorMode] = useState<AppColorMode>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  const toggleColorMode = () => {
    setColorMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem(APP_THEME, newMode);
      return newMode;
    });
  };

  useEffect(() => {
    const savedColorMode = localStorage.getItem(APP_THEME);
    if (savedColorMode) {
      setColorMode(savedColorMode as AppColorMode);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(APP_THEME)) {
        setColorMode(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return {
    colorMode,
    toggleColorMode,
  };
}
