import type { Metadata } from "next";
import { Rubik, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pokedex | Pokemon Explorer",
  description:
    "Browse, search, and inspect Pokemon with live data from PokeAPI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${inter.variable} ${jetbrainsMono.variable} font-body bg-dex-bg text-dex-text antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
