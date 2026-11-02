import type { Metadata } from "next";
import StudioExperience from "../../components/studio-experience";
import LandingFooter from "../../components/landing-footer";
import StudioWorkReel from "../../components/studio-work-reel";
import { isLocale, localePath, pageAlternates } from "../../lib/i18n/config";
import { getDictionary, getDictionaryFor, getLang } from "../../lib/i18n/get-dictionary";
import { founderId, jsonLdScript, site, webPageJsonLd } from "../../lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/studio">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const { meta } = (await getDictionaryFor(lang)).studio;
  return { title: meta.title, description: meta.description, alternates: pageAlternates(lang, "/studio") };
}

export default async function StudioPage() {
  const lang = await getLang();
  const { studio, footer, services } = await getDictionary();
  const url = `${site.url}${localePath(lang, "/studio")}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": webPageJsonLd({
      url,
      name: studio.meta.title,
      description: studio.meta.description,
      lang,
      type: "AboutPage",
      crumbs: { home: services.home, trail: [[footer.studio, url]] },
      mainEntity: founderId,
    }),
  };

  return (
    <div className="studio-page">
      <StudioExperience t={studio} />
      <StudioWorkReel t={studio.reel} />
      <LandingFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
    </div>
  );
}
