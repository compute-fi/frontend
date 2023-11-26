"use client";
import type { Metadata } from "next";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "@/services/provider";
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, colorMode] = useMode();
  return (
    <html lang="en">
      <body>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Providers>
              <div className="app">
                <Sidebar />
                <main className="content">
                  <Navbar />
                  {children}
                </main>
              </div>
            </Providers>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </body>
    </html>
  );
}
