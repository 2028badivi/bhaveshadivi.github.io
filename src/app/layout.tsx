import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bhavesh Adivi",
  description: "Personal portfolio of Bhavesh, a highly-motivated high school sophomore with a passion for STEM, AI, and Biomedical Engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
