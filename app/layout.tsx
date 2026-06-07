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
  metadataBase: new URL("https://www.kicksnare.digital"),
  alternates: {
    canonical: "/",
  },
  title: "Kicksnare — Websites and digital products that grow revenue",
  description:
    "A small team of specialists shipping websites, digital products, and growth experiments that turn traffic into revenue. No long-term retainers.",
  openGraph: {
    title: "Kicksnare — Websites and digital products that grow revenue",
    description:
      "A small team of specialists shipping websites, digital products, and growth experiments that turn traffic into revenue. No long-term retainers.",
    url: "https://www.kicksnare.digital",
    siteName: "Kicksnare",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kicksnare — Websites and digital products that grow revenue",
    description:
      "A small team of specialists shipping websites, digital products, and growth experiments that turn traffic into revenue. No long-term retainers.",
    site: "@kicksnare12",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kicksnare",
    url: "https://www.kicksnare.digital",
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.kicksnare.digital/#organization",
    name: "Kicksnare Digital",
    url: "https://www.kicksnare.digital",
    email: "hi@kicksnare.studio",
    description:
      "A small team of specialists shipping websites, digital products, and growth experiments that turn traffic into revenue.",
    knowsAbout: [
      "Web Design",
      "Web Development",
      "Landing Pages",
      "Conversion Rate Optimization",
      "Growth Marketing",
    ],
    areaServed: { "@type": "Country", name: "United Kingdom" },
    founder: {
      "@type": "Person",
      "@id": "https://www.kicksnare.digital/#founder",
      name: "OO",
      jobTitle: "Founder",
      knowsAbout: [
        "Product Management",
        "Retail",
        "Web Design",
        "Growth Marketing",
      ],
      worksFor: { "@id": "https://www.kicksnare.digital/#organization" },
    },
    sameAs: ["https://x.com/kicksnare12"],
    priceRange: "££",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "The 48-Hour Launch Site",
            description:
              "Professional 5-page website designed and built in 48 hours, including all copywriting, mobile optimisation, and SEO setup.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO & Google Business Profile Setup",
            description:
              "Search engine optimisation and Google Business Profile configuration for local visibility.",
          },
        },
      ],
    },
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${crimsonPro.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
