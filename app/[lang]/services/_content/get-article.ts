import type { Locale } from "../../../lib/i18n/config";
import { frenchTypography } from "../../../lib/i18n/text";
import { articles } from "./articles";
import { articlesFr } from "./articles-fr";
import type { ServiceArticle } from "./types";

const frenchCache = new Map<string, ServiceArticle>();

export type LocalizedArticle = {
  article: ServiceArticle;
  /** False when `lang` has no translation yet and the English article is returned instead. */
  translated: boolean;
};

export function getArticle(lang: Locale, slug: string): LocalizedArticle | undefined {
  const english = articles[slug];
  if (!english) return undefined;
  if (lang === "en") return { article: english, translated: true };

  const french = articlesFr[slug];
  if (!french) return { article: english, translated: false };

  let cached = frenchCache.get(slug);
  if (!cached) {
    cached = frenchTypography(french);
    frenchCache.set(slug, cached);
  }
  return { article: cached, translated: true };
}
