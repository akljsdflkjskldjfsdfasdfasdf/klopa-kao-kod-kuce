import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Montserrat } from "next/font/google";
import "./globals.css";
import { config } from "@/lib/config";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const pageTitle = `${config.groom} ${config.amp} ${config.bride} — Pozivnica`;
const pageDescription = `Pozivamo vas na naše venčanje • ${config.weddingDayLabel}, ${config.weddingDateLabel}`;

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    locale: "sr_RS",
    siteName: pageTitle,
    // OG slika se automatski generiše iz app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr"
      className={`${cormorant.variable} ${greatVibes.variable} ${montserrat.variable} antialiased`}
    >
      <body className="min-h-screen bg-cream text-ink">{children}</body>
    </html>
  );
}
