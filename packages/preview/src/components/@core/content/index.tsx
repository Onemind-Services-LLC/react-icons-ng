"use client";
import React, { useEffect, useState } from "react";
import { useDarkTheme } from "@context/DarkThemeContext";
import { BsFillSunFill } from "@onemind-services-llc/react-icons-ng/bs";
import { BsFillMoonStarsFill } from "@onemind-services-llc/react-icons-ng/bs";

export default function Container({ children }: { children: React.ReactNode }) {
  const { isDarkTheme, toggleTheme } = useDarkTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for hydration to complete for toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          right: "0",
          top: "0",
          padding: "calc(var(--space-3) + 10px)",
        }}
      >
        {mounted && (
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
                  transform: isDarkTheme
                    ? "translateX(24px)"
                    : "translateX(0px)",
                }}
              />
            </label>
          </>
        )}
      </div>

      <main className="container">{children}</main>
    </div>
  );
}
