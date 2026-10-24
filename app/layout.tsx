import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { jsonLdScript, localBusinessJsonLd, site } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "BEST Tattoo and piercing shop Pondicherry - if you're looking for Tattoo Shop near me or Piercing Shop near me - Spiritual Tattoo Art Studio is the place to be",
  description:
    "Original blackwork, fine-line, large-scale, and cover-up tattoos created at our studio in Pondicherry.",
  keywords: [
    "custom tattoo studio",
    "blackwork tattoo",
    "fine line tattoo",
    "tattoo consultation",
    "Spiritual Tattoo Studio",
  ],
  openGraph: {
    title: "BEST Tattoo and piercing shop Pondicherry - if you're looking for Tattoo Shop near me or Piercing Shop near me - Spiritual Tattoo Art Studio is the place to be",
    description:
      "One-of-one tattoos designed around anatomy, movement, and longevity.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(localBusinessJsonLd())} />
      </body>
    </html>
  );
}
