import { useDarkTheme } from "@context/DarkThemeContext";
import React from "react";

export default function Container({ children }) {
  const { isDarkTheme } = useDarkTheme();
  return (
    <div className={`${isDarkTheme ? "dark-theme" : ""}`}>
      <main className="container">{children}</main>
    </div>
  );
}
