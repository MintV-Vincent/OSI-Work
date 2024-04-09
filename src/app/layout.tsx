"use client";
import { NavBar } from "./Compontents/NavBar";
import { Inter } from "next/font/google";
import "./globals.css";
import { JotaiProvider } from "app/Compontents/JotaiProvider";
import { MantineProvider } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <JotaiProvider>
            <NavBar />
            {children}
          </JotaiProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
