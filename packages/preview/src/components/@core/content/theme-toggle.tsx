"use client";
import React from "react";
import { useDarkTheme } from "@context/DarkThemeContext";
import {
  BsFillSunFill,
  BsFillMoonStarsFill,
} from "@onemind-services-llc/react-icons-ng/bs";

export default function ThemeToggle() {
  const { isDarkTheme, toggleTheme } = useDarkTheme();

  return (
    <>
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        checked={isDarkTheme}
        onChange={toggleTheme}
      />
      <label htmlFor="checkbox" className="checkbox-label">
        <BsFillSunFill style={{ color: "#f1c40f" }} />
        <BsFillMoonStarsFill style={{ color: "#f39c12" }} />
        <span
          className="ball"
          style={{
            transform: isDarkTheme ? "translateX(24px)" : "translateX(0px)",
          }}
        />
      </label>
    </>
  );
}
