import type { Metadata } from "next";
import { Cormorant_Garamond, Italiana, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BookShelfNav } from "@/components/BookShelfNav";
import { CosmicBackground } from "@/components/CosmicBackground";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sunday's Reading",
  description: "Book reviews and recommendations by Sunday.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${italiana.variable} ${inter.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-bg text-ink">
        <CosmicBackground />
        <div className="grain" aria-hidden />
        <BookShelfNav />
        <main className="relative z-10">{children}</main>
        <footer className="relative z-10 border-t border-violet-bright/10 mt-32 py-10 text-center text-xs uppercase tracking-[0.3em] text-ink-muted/60">
          <span className="text-gradient-violet">Sunday&rsquo;s Reading</span>
        </footer>
      </body>
    </html>
  );
}
