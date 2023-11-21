import { useDarkTheme } from "@context/DarkThemeContext";
import React from "react";
import { BsFillSunFill } from "@onemind-services-llc/react-icons-ng/bs";
import { BsFillMoonStarsFill } from "@onemind-services-llc/react-icons-ng/bs";

export default function Container({ children }) {
  const { isDarkTheme, toggleTheme } = useDarkTheme();
  return (
    <div className={`${isDarkTheme ? "dark-theme" : ""}`}>
      <div
        style={{
          position: "absolute",
          right: "0",
          top: "0",
          padding: "calc(var(--space-3) + 10px)",
        }}
      >
        <input
          type="checkbox"
          className="checkbox"
          id="checkbox"
          onClick={() => {
            console.log("vishal kumar");
            toggleTheme();
          }}
        />
        <label htmlFor="checkbox" className="checkbox-label">
          <BsFillSunFill
            style={{
              color: "#f1c40f",
            }}
          />
          <BsFillMoonStarsFill
            style={{
              color: "#f39c12",
            }}
          />
          <span
            className="ball"
            style={{
              transform: isDarkTheme ? "translateX(24px)" : "translateX(0px)",
            }}
          />
        </label>
      </div>
      <main className="container">{children}</main>
    </div>
  );
}
