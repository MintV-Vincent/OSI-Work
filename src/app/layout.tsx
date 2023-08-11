"use client";
import { NavBar } from "./Compontents/NavBar";
import { Inter } from "next/font/google";
import "./globals.css";
import { JotaiProvider } from "./Compontents/JotaiProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + "overflow-auto h-screen"}>
        <JotaiProvider>
          <NavBar />
          {children}
        </JotaiProvider>
      </body>
    </html>
  );
}
