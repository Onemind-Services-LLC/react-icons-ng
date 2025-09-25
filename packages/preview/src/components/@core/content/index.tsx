"use client";
import React from "react";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./theme-toggle"), { ssr: false });

export default function Container({ children }: { children: React.ReactNode }) {
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
        <ThemeToggle />
      </div>

      <main className="container">{children}</main>
    </div>
  );
}
