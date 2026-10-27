import type { MetadataRoute } from "next";
import { articlesFr } from "./[lang]/services/_content/articles-fr";
import { serviceHref, services } from "./[lang]/services/_content/registry";
import { areaHref, areas } from "./[lang]/tattoo-shop-near/_content/areas";
import { defaultLocale, localePath, locales, type Locale } from "./lib/i18n/config";
import { site } from "./lib/site";

type Page = {
  path: string;
  changeFrequency: "monthly" | "yearly";
  priority: number;
  /** Locales the page exists in; defaults to all of them. */
  languages?: readonly Locale[];
};

const absolute = (lang: Locale, path: string) => {
  const localized = localePath(lang, path);
  return localized === "/" ? site.url : `${site.url}${localized}`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: Page[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    ...services.map((service) => ({
      path: serviceHref(service.slug),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      // A French article that isn't translated yet is noindexed, so it stays out of the sitemap.
      languages: service.slug in articlesFr ? locales : [defaultLocale],
    })),
    ...Object.values(areas).map((area) => ({
      path: areaHref(area.slug),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
    { path: "/studio", changeFrequency: "yearly", priority: 0.6 },
  ];

  return pages.flatMap(({ path, changeFrequency, priority, languages = locales }) => {
    const alternates =
      languages.length > 1
        ? { languages: Object.fromEntries(languages.map((lang) => [lang, absolute(lang, path)])) }
        : undefined;

    return languages.map((lang) => ({
      url: absolute(lang, path),
      lastModified,
      changeFrequency,
      priority,
      ...(alternates && { alternates }),
    }));
  });
}
