import "@styles/global.scss";
import { Toaster } from "react-hot-toast";
import Container from "@components/@core/content";
import Sidebar from "@components/@core/sidebar";
import {
  BRAND_TITLE,
  BRAND_DESCRIPTION,
  BRAND_KEYWORDS,
} from "@utils/constants";
import { DarkThemeProvider } from "@context/DarkThemeContext";
import React, { ReactNode } from "react";

export const metadata = {
  title: BRAND_TITLE,
  description: BRAND_DESCRIPTION,
  keywords: BRAND_KEYWORDS,
  themeColor: "#e91e63",
  icons: {
    icon: "/favicon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DarkThemeProvider>
          <Sidebar />
          <Container>{children}</Container>
          <Toaster position="bottom-center" />
        </DarkThemeProvider>
      </body>
    </html>
  );
}
