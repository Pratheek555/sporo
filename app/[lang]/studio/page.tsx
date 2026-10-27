import type { Metadata } from "next";
import StudioExperience from "../../components/studio-experience";
import LandingFooter from "../../components/landing-footer";
import StudioWorkReel from "../../components/studio-work-reel";
import { isLocale, pageAlternates } from "../../lib/i18n/config";
import { getDictionary, getDictionaryFor } from "../../lib/i18n/get-dictionary";

export async function generateMetadata({ params }: PageProps<"/[lang]/studio">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const { meta } = (await getDictionaryFor(lang)).studio;
  return { title: meta.title, description: meta.description, alternates: pageAlternates(lang, "/studio") };
}

export default async function StudioPage() {
  const { studio } = await getDictionary();

  return (
    <div className="studio-page">
      <StudioExperience t={studio} />
      <StudioWorkReel t={studio.reel} />
      <LandingFooter />
    </div>
  );
}
