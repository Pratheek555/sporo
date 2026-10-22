import type { MetadataRoute } from "next";
import { site } from "./lib/site";
import { serviceHref, services } from "./services/_content/registry";
import { areaHref, areas } from "./tattoo-shop-near/_content/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((service) => ({
      url: `${site.url}${serviceHref(service.slug)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...Object.values(areas).map((area) => ({
      url: `${site.url}${areaHref(area.slug)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${site.url}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/studio`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];
}
