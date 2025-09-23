"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
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

// Helper functions
const getInitialTheme = (): boolean | undefined => {
  if (isServer) return undefined;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      return window.matchMedia(MEDIA).matches;
    }
    return stored === "true";
  } catch {
    return window.matchMedia(MEDIA).matches;
  }
};

const saveTheme = (isDark: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY, isDark.toString());
  } catch {
    // localStorage not supported
  }
};

// Theme Script Component
const ThemeScript = React.memo(() => {
  const script = `
    (function() {
      function applyTheme(isDark) {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(isDark ? 'dark' : 'light');
        document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
      }
      
      let isDark = false;
      try {
        const stored = localStorage.getItem('${STORAGE_KEY}');
        if (stored === null) {
          isDark = window.matchMedia('${MEDIA}').matches;
          localStorage.setItem('${STORAGE_KEY}', isDark.toString());
        } else {
          isDark = stored === 'true';
        }
      } catch {
        isDark = window.matchMedia('${MEDIA}').matches;
      }
      
      applyTheme(isDark);
    })()
  `;

  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
});

ThemeScript.displayName = "ThemeScript";

const DarkThemeProvider = ({ children }: DarkThemeProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    const initial = getInitialTheme();
    return initial ?? false;
  });

  const applyTheme = useCallback((isDark: boolean) => {
    const d = document.documentElement;
    d.classList.remove("light", "dark");
    d.classList.add(isDark ? "dark" : "light");
    d.style.colorScheme = isDark ? "dark" : "light";
  }, []);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    if (initialTheme !== undefined) {
      setIsDarkTheme(initialTheme);
      if (initialTheme !== isDarkTheme) {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === null) {
          saveTheme(initialTheme);
        }
      }
    }
  }, [isDarkTheme]); // Add isDarkTheme to fix warning

  useEffect(() => {
    if (!isServer) {
      applyTheme(isDarkTheme);
    }
  }, [isDarkTheme, applyTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MEDIA);

    const handleChange = (e: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === null) {
          setIsDarkTheme(e.matches);
          saveTheme(e.matches);
        }
      } catch {
        setIsDarkTheme(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;

      if (e.newValue === null) {
        const systemPreference = window.matchMedia(MEDIA).matches;
        setIsDarkTheme(systemPreference);
      } else {
        setIsDarkTheme(e.newValue === "true");
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme((prevIsDarkTheme) => {
      const newTheme = !prevIsDarkTheme;
      saveTheme(newTheme);
      return newTheme;
    });
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

export { DarkThemeContext, DarkThemeProvider };
