import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://klopakaokodkuce.rs"),
  title: {
    default: "Klopa kao kod kuće — Domaća kuhinja | Novi Sad",
    template: "%s | Klopa kao kod kuće",
  },
  description:
    "Domaća srpska kuhinja u srcu Novog Sada. Sveža gotova jela svakog dana — sarma, gulaš, punjene paprike, karađorđeve i još mnogo toga. Cara Dušana 11a.",
  keywords: [
    "domaća kuhinja",
    "gotova jela",
    "restoran Novi Sad",
    "klopa kao kod kuće",
    "srpska kuhinja",
    "dostava hrane Novi Sad",
  ],
  openGraph: {
    title: "Klopa kao kod kuće — Domaća kuhinja | Novi Sad",
    description:
      "Sveža domaća gotova jela svakog dana u Novom Sadu. Kao kod mame.",
    locale: "sr_RS",
    type: "website",
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
      suppressHydrationWarning
      className={`${display.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
