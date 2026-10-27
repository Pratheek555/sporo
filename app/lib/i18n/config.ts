// Locale configuration shared by the proxy, server components and client components.
// English is the default locale and keeps its unprefixed URLs (/services); every other
// locale lives under its own prefix (/fr/services). proxy.ts rewrites the unprefixed
// URLs onto the internal /en tree, so visitors never see "/en".

export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const localeMeta: Record<
  Locale,
  {
    /** Shown in the language switch. */
    short: string;
    /** Open Graph `locale` value. */
    openGraph: string;
    /** schema.org `inLanguage` value. */
    schema: string;
    /** Announced by screen readers on the link that switches *to* this locale, written in that locale. */
    switchLabel: string;
  }
> = {
  en: { short: "EN", openGraph: "en_IN", schema: "en-IN", switchLabel: "View the site in English" },
  fr: { short: "FR", openGraph: "fr_FR", schema: "fr", switchLabel: "Voir le site en français" },
};

const isInternal = (href: string) => href.startsWith("/") && !href.startsWith("//");

/** Prefixes an internal href with the locale: ("fr", "/services#faq") -> "/fr/services#faq". */
export function localePath(lang: Locale, href: string) {
  if (lang === defaultLocale || !isInternal(href)) return href;

  const suffixStart = href.search(/[?#]/);
  const path = suffixStart === -1 ? href : href.slice(0, suffixStart);
  const suffix = suffixStart === -1 ? "" : href.slice(suffixStart);
  return `${path === "/" ? `/${lang}` : `/${lang}${path}`}${suffix}`;
}

/** Splits a pathname into its locale and the locale-free path: "/fr/contact" -> { lang: "fr", path: "/contact" }. */
export function splitLocale(pathname: string): { lang: Locale; path: string } {
  for (const lang of locales) {
    if (pathname === `/${lang}`) return { lang, path: "/" };
    if (pathname.startsWith(`/${lang}/`)) return { lang, path: pathname.slice(lang.length + 1) };
  }
  return { lang: defaultLocale, path: pathname };
}

/** Where the language switch should send a visitor who is on `path` and wants `target`. */
export function switchLocalePath(target: Locale, path: string) {
  return localePath(target, path);
}

/** Canonical + hreflang alternates for a page that exists in every locale. */
export function pageAlternates(lang: Locale, path: string) {
  return {
    canonical: localePath(lang, path),
    languages: {
      ...Object.fromEntries(locales.map((locale) => [locale, localePath(locale, path)])),
      "x-default": localePath(defaultLocale, path),
    },
  };
}
