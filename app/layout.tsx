import type { Metadata } from "next";
import { Koulen, Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";

const koulen = Koulen({
  variable: "--font-koulen",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// 8-bit / arcade font used by the Space Invaders minigame UI.
const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Galactic Fleet",
  description: "Galactic Fleet — engineering across the system.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${koulen.variable} ${inter.variable} ${pressStart.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
