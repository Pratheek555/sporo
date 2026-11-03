// Single source of truth for the studio's name, address, phone, hours and links.
// Keeping these identical everywhere (site, schema, Google Business Profile)
// is one of the strongest local-SEO signals, so edit them here only.

import { getServices, serviceHref, type ServiceCategory } from "../[lang]/services/_content/registry";
import { localeMeta, localePath, locales, type Locale } from "./i18n/config";

export const site = {
  name: "Spiritual Tattoo Art Studio",
  shortName: "Spiritual Tattoo Art",
  url: "https://www.spiritualtattooart.com",
  founded: 2013,
  owner: "Mukhilan",
  phone: "+91 81242 59830",
  phoneHref: "tel:+918124259830",
  email: "Mukhimax26@gmail.com",
  whatsappUrl: "https://wa.me/918124259830",
  instagramUrl: "https://www.instagram.com/spiritualart3/",
  // Google Maps share link for the studio's Business Profile (from spiritualart3.com).
  googleMapsUrl: "https://maps.app.goo.gl/qH8T8PGZXNAxRiDe8",
  directionsUrl:
    "https://www.google.com/maps?q=34+Law+De+Lauriston+St+Near+Central+Bank+of+India+White+Town+Puducherry+605001",
  address: {
    street: "No. 34, Law De Lauriston Street",
    landmark: "Near Central Bank of India",
    locality: "White Town",
    city: "Puducherry",
    region: "Puducherry",
    postalCode: "605001",
    country: "IN",
  },
  hours: [
    {
      label: "Monday – Thursday",
      time: "10 am – 8 pm",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "10:00",
      closes: "20:00",
    },
    {
      label: "Friday – Sunday",
      time: "10 am – 9 pm",
      days: ["Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "21:00",
    },
  ],
} as const;

// Stable schema.org node ids. Every page's JSON-LD points at these instead of
// repeating the studio's details, so search engines merge them into one entity.
export const businessId = `${site.url}/#studio`;
export const websiteId = `${site.url}/#website`;
export const founderId = `${site.url}/#mukhilan`;

const studioImages = [1, 2, 3, 4].map((n) => `${site.url}/media/studio-gallery/studio-gallery-${n}.png`);

// Styles and services the studio lists on spiritualart3.com, plus the service pages on this site.
const specialties = [
  "Spiritual and sacred art tattoos",
  "Traditional tattoos",
  "Custom tattoo design",
  "Sketch art",
  "Hand poke tattoos",
  "Body piercing",
];

const areasServed = [
  "Puducherry",
  "White Town",
  "Auroville",
  "Lawspet",
  "Muthialpet",
  "Reddiarpalayam",
  "Ariyankuppam",
  "Kottakuppam",
];

type SchemaOptions = {
  lang: Locale;
  /** Localized one-line description of the studio. */
  description: string;
};

function offerCatalog(lang: Locale) {
  const all = getServices(lang);
  const group = (category: ServiceCategory, name: string) => ({
    "@type": "OfferCatalog",
    name,
    itemListElement: all
      .filter((service) => service.category === category)
      .map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.blurb,
          url: `${site.url}${localePath(lang, serviceHref(service.slug))}`,
        },
      })),
  });

  return {
    "@type": "OfferCatalog",
    name: lang === "fr" ? "Tatouages et piercings" : "Tattoos and piercings",
    itemListElement: [
      group("tattoo", lang === "fr" ? "Tatouages" : "Tattoos"),
      group("piercing", lang === "fr" ? "Piercings" : "Piercings"),
    ],
  };
}

/** The studio, its website and its founder: emitted once on every page by the root layout. */
export function siteJsonLd({ lang, description }: SchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["TattooParlor", "HealthAndBeautyBusiness"],
        "@id": businessId,
        name: site.name,
        alternateName: site.shortName,
        description,
        slogan: "Where Art Meets You",
        url: site.url,
        telephone: site.phone,
        email: site.email,
        image: studioImages,
        logo: `${site.url}/cover-kali.png`,
        foundingDate: String(site.founded),
        founder: { "@id": founderId },
        address: {
          "@type": "PostalAddress",
          streetAddress: `${site.address.street}, ${site.address.landmark}`,
          addressLocality: `${site.address.locality}, ${site.address.city}`,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        hasMap: site.googleMapsUrl,
        sameAs: [site.instagramUrl, site.googleMapsUrl],
        areaServed: areasServed.map((name) => ({ "@type": "Place", name })),
        openingHoursSpecification: site.hours.map((slot) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: slot.days,
          opens: slot.opens,
          closes: slot.closes,
        })),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: site.phone,
          email: site.email,
          url: site.whatsappUrl,
          availableLanguage: ["English"],
        },
        currenciesAccepted: "INR",
        knowsAbout: specialties,
        hasOfferCatalog: offerCatalog(lang),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        alternateName: site.shortName,
        inLanguage: locales.map((locale) => localeMeta[locale].schema),
        publisher: { "@id": businessId },
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: site.owner,
        jobTitle: "Master Tattoo Artist",
        image: `${site.url}/owner.jpeg`,
        worksFor: { "@id": businessId },
        knowsAbout: specialties,
        sameAs: [site.instagramUrl],
      },
    ],
  };
}

type WebPageOptions = {
  /** Absolute URL of the page. */
  url: string;
  name: string;
  description: string;
  lang: Locale;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  /** Breadcrumb trail after "Home", as [label, absolute URL] pairs. Omit on the home page. */
  crumbs?: { home: string; trail: [string, string][] };
  mainEntity?: string;
  image?: string;
};

/** A page node tied to the site-wide WebSite and studio nodes, with an optional breadcrumb. */
export function webPageJsonLd({ url, name, description, lang, type = "WebPage", crumbs, mainEntity, image }: WebPageOptions) {
  const page = {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: localeMeta[lang].schema,
    isPartOf: { "@id": websiteId },
    about: { "@id": businessId },
    ...(mainEntity ? { mainEntity: { "@id": mainEntity } } : {}),
    primaryImageOfPage: image ?? studioImages[1],
    ...(crumbs ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };

  if (!crumbs) return [page];

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [[crumbs.home, `${site.url}${localePath(lang, "/")}`] as const, ...crumbs.trail].map(([label, item], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: label,
      item,
    })),
  };

  return [page, breadcrumb];
}

export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\u003c") };
}
