"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, localePath, type Locale } from "./config";

const LocaleContext = createContext<Locale>(defaultLocale);

/** Hands the current locale to client components, which can't read the `[lang]` root param. */
export function LocaleProvider({ lang, children }: { lang: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>;
}

export const useLang = () => useContext(LocaleContext);

/** Returns a function that prefixes internal hrefs with the current locale. */
export function useLocalePath() {
  const lang = useLang();
  return (href: string) => localePath(lang, href);
}
