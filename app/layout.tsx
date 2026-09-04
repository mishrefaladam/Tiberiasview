import type { Metadata } from "next";
import { Manrope, Noto_Sans_Arabic } from "next/font/google";
import { siteUrl } from "@/lib/site-config";
import "./globals.css";

const latinFont = Manrope({
  variable: "--font-latin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const arabicFont = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Tiberias View",
  description: "Multilingual website for Tiberias View in Samma, Jordan.",
};

// This layout has no [locale] param of its own, so under Cache Components it's
// prerendered once and shared across all locales — getLocale() here always
// resolves to the default. The correct per-locale lang/dir is set client-side
// by <DocumentAttributes> in app/[locale]/layout.tsx instead.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${latinFont.variable} ${arabicFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-ink">{children}</body>
    </html>
  );
}
