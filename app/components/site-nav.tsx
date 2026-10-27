import { getServices } from "../[lang]/services/_content/registry";
import { getDictionaryFor, getLang } from "../lib/i18n/get-dictionary";
import SiteNavClient from "./site-nav-client";

// Server wrapper: resolves the locale's strings and service names so the client
// navigation ships no dictionaries or content registry of its own.
export default async function SiteNav() {
  const lang = await getLang();
  const { nav } = await getDictionaryFor(lang);
  const services = getServices(lang).map(({ slug, name, category }) => ({ slug, name, category }));

  return (
    <SiteNavClient
      t={nav}
      tattooServices={services.filter((service) => service.category === "tattoo")}
      piercingServices={services.filter((service) => service.category === "piercing")}
    />
  );
}
