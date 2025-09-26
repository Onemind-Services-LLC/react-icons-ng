import React, { ReactNode, Suspense } from "react";
import "@styles/global.scss";
import "highlight.js/styles/night-owl.css";
import { Toaster } from "react-hot-toast";
import Container from "@components/@core/content";
import Sidebar from "@components/@core/sidebar";
import {
  BRAND_TITLE,
  BRAND_DESCRIPTION,
  BRAND_KEYWORDS,
} from "@utils/constants";
import { DarkThemeProvider } from "@context/DarkThemeContext";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: BRAND_TITLE,
  description: BRAND_DESCRIPTION,
  keywords: BRAND_KEYWORDS,
  icons: {
    icon: "/favicon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#e91e63",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DarkThemeProvider>
          <Suspense>
            <Sidebar />
          </Suspense>
          <Container>
            <Suspense>{children}</Suspense>
          </Container>
          <Toaster position="bottom-center" />
        </DarkThemeProvider>
      </body>
    </html>
  );
}
