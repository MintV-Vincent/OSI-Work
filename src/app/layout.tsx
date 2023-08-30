"use client";
import { NavBar } from "./Compontents/NavBar";
import { Inter } from "next/font/google";
import "./globals.css";
import { JotaiProvider } from "app/Compontents/JotaiProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JotaiProvider>
          <NavBar />
          {children}
        </JotaiProvider>
      </body>
    </html>
  );
}
