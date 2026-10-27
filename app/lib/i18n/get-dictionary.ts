import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { isLocale, type Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";
import { frenchTypography } from "./text";

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((module) => module.default),
  fr: () => import("./dictionaries/fr").then((module) => frenchTypography(module.default)),
};

/** The locale of the current request, read from the `[lang]` root segment. Server components only. */
export async function getLang(): Promise<Locale> {
  const value = await lang();
  if (!value || !isLocale(value)) notFound();
  return value;
}

export const getDictionaryFor = (locale: Locale) => loaders[locale]();

export async function getDictionary(): Promise<Dictionary> {
  return getDictionaryFor(await getLang());
}
