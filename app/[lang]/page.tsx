import type { Metadata } from "next";
import LandingAbout from "../components/landing-about";
import LandingFooter from "../components/landing-footer";
import LandingHero from "../components/landing-hero";
import LandingLocation from "../components/landing-location";
import LandingTestimonials from "../components/landing-testimonials";
import SiteNav from "../components/site-nav";
import { isLocale, pageAlternates } from "../lib/i18n/config";
import { getDictionary } from "../lib/i18n/get-dictionary";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { alternates: pageAlternates(lang, "/") };
}

export default async function Home() {
  const { hero, about } = await getDictionary();

  return (
    <main className="landing-page">
      <SiteNav />
      <LandingHero t={hero} />
      <LandingAbout t={about} />
      <LandingTestimonials />
      <LandingLocation />
      <LandingFooter />
    </main>
  );
}
