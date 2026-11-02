import AreaDirectory from "../components/area-directory";
import type { Metadata } from "next";
import LandingAbout from "../components/landing-about";
import LandingFooter from "../components/landing-footer";
import LandingHero from "../components/landing-hero";
import LandingLocation from "../components/landing-location";
import LandingTestimonials from "../components/landing-testimonials";
import SiteNav from "../components/site-nav";
import { isLocale, localePath, pageAlternates } from "../lib/i18n/config";
import { getDictionary, getLang } from "../lib/i18n/get-dictionary";
import { businessId, jsonLdScript, site, webPageJsonLd } from "../lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { alternates: pageAlternates(lang, "/") };
}

export default async function Home() {
  const lang = await getLang();
  const { hero, about, meta } = await getDictionary();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": webPageJsonLd({
      url: `${site.url}${localePath(lang, "/")}`,
      name: meta.title,
      description: meta.description,
      lang,
      mainEntity: businessId,
    }),
  };

  return (
    <main className="landing-page">
      <SiteNav />
      <LandingHero t={hero} />
      <LandingAbout t={about} />
      <LandingTestimonials />
      <AreaDirectory lang={lang} />
      <LandingLocation />
      <LandingFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
    </main>
  );
}
