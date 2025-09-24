"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

interface DarkThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const DarkThemeContext = createContext<DarkThemeContextType | undefined>(
  undefined,
);

interface DarkThemeProviderProps {
  children: ReactNode;
}

// Constants
const MEDIA = "(prefers-color-scheme: dark)";
const STORAGE_KEY = "darkTheme";
const isServer = typeof window === "undefined";

//Helpers
const systemPrefersDark = () => window.matchMedia(MEDIA).matches;

const getStoredTheme = (): boolean | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) return null;
    return stored === "true";
  } catch {
    return null;
  }
};

const saveTheme = (isDark: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY, isDark.toString());
  } catch {
    // ignore
  }
};

const applyTheme = (isDark: boolean) => {
  const d = document.documentElement;
  d.classList.remove("light", "dark");
  d.classList.add(isDark ? "dark" : "light");
  d.style.colorScheme = isDark ? "dark" : "light";
};

// Hydration Script
const ThemeScript = React.memo(() => {
  const script = `
    (function() {
      function applyTheme(isDark) {
        document.documentElement.classList.remove('light','dark');
        document.documentElement.classList.add(isDark ? 'dark' : 'light');
        document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
      }
      try {
        var stored = localStorage.getItem('${STORAGE_KEY}');
        var isDark;
        if (stored === null) {
          isDark = window.matchMedia('${MEDIA}').matches;
          localStorage.setItem('${STORAGE_KEY}', isDark.toString());
        } else {
          isDark = stored === "true";
        }
        applyTheme(isDark);
      } catch {
        var isDark = window.matchMedia('${MEDIA}').matches;
        applyTheme(isDark);
      }
    })();
  `;
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
});
ThemeScript.displayName = "ThemeScript";

//  Provider
const DarkThemeProvider = ({ children }: DarkThemeProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    if (isServer) return false;
    return getStoredTheme() ?? systemPrefersDark();
  });

  // Apply theme when it changes
  useEffect(() => {
    if (!isServer) {
      applyTheme(isDarkTheme);
      saveTheme(isDarkTheme);
    }
  }, [isDarkTheme]);

  // Watch system preference changes (only if no manual preference saved)
  useEffect(() => {
    const mediaQuery = window.matchMedia(MEDIA);
    const handler = (e: MediaQueryListEvent) => {
      if (getStoredTheme() === null) {
        setIsDarkTheme(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Sync across tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setIsDarkTheme(e.newValue === "true");
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme((prev) => !prev);
  }, []);

  return (
    <DarkThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <ThemeScript />
      {children}
    </DarkThemeContext.Provider>
  );
};

export const useDarkTheme = () => {
  const context = useContext(DarkThemeContext);
  if (!context) {
    throw new Error("useDarkTheme must be used within a DarkThemeProvider");
  }
  return context;
};

export { DarkThemeProvider };
