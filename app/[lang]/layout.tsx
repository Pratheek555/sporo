import type { Metadata } from "next";
import { Barlow_Condensed, Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, localeMeta, locales } from "../lib/i18n/config";
import { getDictionaryFor } from "../lib/i18n/get-dictionary";
import { LocaleProvider } from "../lib/i18n/locale-context";
import { jsonLdScript, localBusinessJsonLd, site } from "../lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The original display face contains no accented glyphs. Use a complete condensed
// family for French headings rather than mixing wide fallback letters into words.
const frenchDisplay = Barlow_Condensed({
  variable: "--font-french-display",
  weight: "700",
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const { meta } = await getDictionaryFor(lang);
  return {
    metadataBase: new URL(site.url),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.ogDescription,
      type: "website",
      locale: localeMeta[lang].openGraph,
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} ${lang === "fr" ? frenchDisplay.variable : ""} h-full antialiased`}
    >
      <body>
        <LocaleProvider lang={lang}>{children}</LocaleProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(localBusinessJsonLd())} />
      </body>
    </html>
  );
}
