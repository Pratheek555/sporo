import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AreaDirectory, { areasLabel } from "../../components/area-directory";
import SiteNav from "../../components/site-nav";
import LandingFooter from "../../components/landing-footer";
import { isLocale, localeMeta, localePath, pageAlternates, type Locale } from "../../lib/i18n/config";
import { businessId, jsonLdScript, site, websiteId } from "../../lib/site";
import { areas, areaHref } from "./_content/areas";
import { getArea } from "./_content/get-area";
import VisitBlock from "../services/_lib/visit-block";
import styles from "../services/services.module.css";

const copy = (lang: Locale) => lang === "fr" ? {
  title: "Les quartiers desservis à Puducherry | Spiritual Tattoo Art Studio",
  description: "Préparez votre visite au studio de tatouage et piercing à White Town depuis Puducherry, Auroville et les quartiers voisins.",
  home: "Accueil", lead: "Les quartiers", accent: "desservis.",
} : {
  title: "Areas We Serve in Puducherry | Spiritual Tattoo Art Studio",
  description: "Plan your visit to our White Town tattoo and piercing studio from Puducherry, Auroville and nearby neighbourhoods. Explore all 11 local area guides.",
  home: "Home", lead: "Areas we", accent: "serve.",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = copy(lang);
  return { title: { absolute: d.title }, description: d.description, alternates: pageAlternates(lang, "/tattoo-shop-near"),
    openGraph: { title: d.title, description: d.description, url: localePath(lang, "/tattoo-shop-near"), siteName: site.name, locale: localeMeta[lang].openGraph, type: "website" } };
}

export default async function AreasPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = copy(lang);
  const url = `${site.url}${localePath(lang, "/tattoo-shop-near")}`;
  const jsonLd = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: d.title, description: d.description, inLanguage: localeMeta[lang].schema, isPartOf: { "@id": websiteId }, about: { "@id": businessId }, breadcrumb: { "@id": `${url}#breadcrumb` }, mainEntity: { "@id": `${url}#areas` } },
    { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
      { "@type": "ListItem", position: 1, name: d.home, item: `${site.url}${localePath(lang, "/")}` },
      { "@type": "ListItem", position: 2, name: areasLabel(lang), item: url },
    ] },
    { "@type": "ItemList", "@id": `${url}#areas`, itemListElement: Object.keys(areas).map((slug, index) => ({ "@type": "ListItem", position: index + 1, name: getArea(lang, slug)!.area, url: `${site.url}${localePath(lang, areaHref(slug))}` })) },
  ] };
  return <div className={styles.page}>
    <SiteNav />
    <main className={styles.main}>
      <header className={styles.hero}>
        <nav className={styles.breadcrumb} aria-label={lang === "fr" ? "Fil d’Ariane" : "Breadcrumb"}><ol><li><Link href={localePath(lang, "/")}>{d.home}</Link></li><li aria-current="page">{areasLabel(lang)}</li></ol><span>PUDUCHERRY / INDIA</span></nav>
        <div className={styles.heroCopy}><p className={styles.script}>White Town & beyond</p><h1>{d.lead}<span>{d.accent}</span></h1><p className={styles.lede}>{d.description}</p></div>
      </header>
      <AreaDirectory lang={lang} directory />
      <VisitBlock />
    </main>
    <LandingFooter />
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
  </div>;
}
