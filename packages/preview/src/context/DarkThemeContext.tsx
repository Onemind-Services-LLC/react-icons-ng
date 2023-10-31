import React, { createContext, useContext, useState, ReactNode } from "react";

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

  const toggleTheme = () => {
    setIsDarkTheme((prevIsDarkTheme) => !prevIsDarkTheme);
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
