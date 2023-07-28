"use client";
import { NavBar } from "./Compontents/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " p-0 m-0"}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
