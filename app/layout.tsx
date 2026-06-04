import type { Metadata } from "next";
import { Space_Grotesk, Crimson_Pro } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kicksnare — Websites and digital products that grow revenue",
  description:
    "A small team of specialists shipping websites, digital products, and growth experiments that turn traffic into revenue. No long-term retainers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${crimsonPro.variable}`}>
      <body>{children}</body>
    </html>
  );
}
