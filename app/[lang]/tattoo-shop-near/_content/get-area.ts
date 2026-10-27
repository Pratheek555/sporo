import type { Locale } from "../../../lib/i18n/config";
import { frenchTypography } from "../../../lib/i18n/text";
import { areas } from "./areas";
import { areasFr } from "./areas-fr";
import type { AreaPage } from "./types";

const frenchCache = new Map<string, AreaPage>();

export function getArea(lang: Locale, slug: string): AreaPage | undefined {
  if (lang === "en") return areas[slug];
  const page = areasFr[slug];
  if (!page) return undefined;
  if (!frenchCache.has(slug)) frenchCache.set(slug, frenchTypography(page));
  return frenchCache.get(slug);
}
