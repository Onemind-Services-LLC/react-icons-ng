"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
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

const DarkThemeProvider = ({ children }: DarkThemeProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("darkTheme") === null) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setIsDarkTheme(true);
        localStorage.setItem("darkTheme", "true");
      } else localStorage.setItem("darkTheme", "false");
    } else {
      setIsDarkTheme(
        localStorage.getItem("darkTheme") === "true" ? true : false,
      );
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((prevIsDarkTheme) => {
      localStorage.setItem("darkTheme", (!prevIsDarkTheme).toString());
      return !prevIsDarkTheme;
    });
  };

  return (
    <DarkThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
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
