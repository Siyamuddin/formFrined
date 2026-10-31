import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { en } from "@/lib/i18n/en";
import "./globals.css";

const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: en.metaTitle,
  description: en.metaDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} antialiased`}>{children}</body>
    </html>
  );
}
