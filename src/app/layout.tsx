import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bhavesh Adivi",
  description: "High school researcher @TJHSST | CS + Biomedicine | Terminal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <body className="min-h-full bg-black text-green-400 font-mono">{children}</body>
    </html>
  );
}
