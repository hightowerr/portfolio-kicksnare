import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
