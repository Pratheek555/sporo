import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LandingFooter from "../../components/landing-footer";
import SiteNav from "../../components/site-nav";
import { isLocale, localeMeta, localePath, pageAlternates, type Locale } from "../../lib/i18n/config";
import type { Dictionary } from "../../lib/i18n/dictionaries/en";
import { getDictionaryFor } from "../../lib/i18n/get-dictionary";
import { format } from "../../lib/i18n/text";
import { businessId, jsonLdScript, site } from "../../lib/site";
import { getServices, serviceHref, type ServiceSummary } from "./_content/registry";
import VisitBlock, { whatsappLink } from "./_lib/visit-block";
import { renderInline } from "./_lib/markdown";
import styles from "./services.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const { meta } = (await getDictionaryFor(lang)).services;
  const path = localePath(lang, "/services");
  return {
    title: { absolute: meta.title },
    description: meta.description,
    keywords: meta.keywords,
    alternates: pageAlternates(lang, "/services"),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      siteName: site.name,
      locale: localeMeta[lang].openGraph,
      type: "website",
      images: [{ url: "/media/studio-gallery/studio-gallery-2.png", width: 960, height: 1280, alt: meta.ogAlt }],
    },
  };
}

function ServiceGrid({
  items,
  lang,
  labels,
  offset = 0,
}: {
  items: readonly ServiceSummary[];
  lang: Locale;
  labels: Dictionary["services"];
  offset?: number;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.slug}>
          <Link href={localePath(lang, serviceHref(item.slug))}>
            <small>{String(index + 1 + offset).padStart(2, "0")} / {item.category === "tattoo" ? labels.cardTattoo : labels.cardPiercing}</small>
            <strong>{item.name}</strong>
            <span>{item.blurb}</span>
            <i aria-hidden="true">↗</i>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dictionary = await getDictionaryFor(lang);
  const d = dictionary.services;
  const hub = d.hub;

  const services = getServices(lang);
  const tattooServices = services.filter((service) => service.category === "tattoo");
  const piercingServices = services.filter((service) => service.category === "piercing");

  const url = `${site.url}${localePath(lang, "/services")}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: d.meta.title,
        description: d.meta.description,
        inLanguage: localeMeta[lang].schema,
        about: { "@id": businessId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: d.home, item: `${site.url}${localePath(lang, "/")}` },
          { "@type": "ListItem", position: 2, name: dictionary.nav.services, item: url },
        ],
      },
      {
        "@type": "ItemList",
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.name,
          url: `${site.url}${localePath(lang, serviceHref(service.slug))}`,
        })),
      },
    ],
  };

  const counts = (key: "tattooLabel" | "piercingLabel", n: number) => format(hub[key], { n });

  return (
    <div className={styles.page}>
      <SiteNav />

      <main className={styles.main}>
        <header className={styles.hero}>
          <nav className={styles.breadcrumb} aria-label={d.breadcrumbLabel}>
            <ol>
              <li><Link href={localePath(lang, "/")}>{d.home}</Link></li>
              <li aria-current="page">{dictionary.nav.services}</li>
            </ol>
            <span>{d.place}</span>
          </nav>

          <div className={styles.heroArt} aria-hidden="true">
            <Image src="/media/hero-red-art.webp" alt="" fill sizes="(max-width: 700px) 90vw, 46vw" priority />
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.script}>{hub.script}</p>
            <h1>{hub.h1[0]}<span>{hub.h1[1]}</span></h1>
            <p className={styles.lede}>{hub.lede}</p>
            <div className={styles.heroActions}>
              <a className={styles.buttonInk} href={whatsappLink(dictionary.whatsapp)} target="_blank" rel="noreferrer">
                {hub.consultation} <span aria-hidden="true">↗</span>
              </a>
              <a className={styles.buttonLine} href="#tattoos">
                {hub.browse} <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <dl className={styles.facts}>
            <div><dt>{hub.facts[0].label}</dt><dd>{format(hub.facts[0].value, { n: tattooServices.length })}</dd></div>
            <div><dt>{hub.facts[1].label}</dt><dd>{format(hub.facts[1].value, { n: piercingServices.length })}</dd></div>
            <div><dt>{hub.facts[2].label}</dt><dd>{hub.facts[2].value}</dd></div>
            <div><dt>{hub.facts[3].label}</dt><dd>{hub.facts[3].value}</dd></div>
          </dl>
        </header>

        <section className={styles.hubIntro} aria-label={hub.introLabel}>
          {hub.intro.map((column, columnIndex) => (
            <div key={columnIndex}>
              {column.map((paragraph, index) => (
                <p key={index}>{renderInline(paragraph, `intro-${columnIndex}-${index}`, lang)}</p>
              ))}
            </div>
          ))}
        </section>

        <section id="tattoos" className={`${styles.related} ${styles.hubGroup}`} aria-labelledby="tattoo-services-title">
          <div className={styles.sectionLabel}>
            <h2 id="tattoo-services-title">{hub.tattooHeading[0]}<span>{hub.tattooHeading[1]}</span></h2>
            <span>{counts("tattooLabel", tattooServices.length)}</span>
          </div>
          <ServiceGrid items={tattooServices} lang={lang} labels={d} />
        </section>

        <section id="piercings" className={`${styles.related} ${styles.hubGroup}`} aria-labelledby="piercing-services-title">
          <div className={styles.sectionLabel}>
            <h2 id="piercing-services-title">{hub.piercingHeading[0]}<span>{hub.piercingHeading[1]}</span></h2>
            <span>{counts("piercingLabel", piercingServices.length)}</span>
          </div>
          <ServiceGrid items={piercingServices} lang={lang} labels={d} />
        </section>

        <section className={styles.hubSteps} aria-labelledby="how-it-works-title">
          <div className={styles.sectionLabel}>
            <h2 id="how-it-works-title">{hub.stepsHeading[0]}<span>{hub.stepsHeading[1]}</span></h2>
            <span>{hub.stepsLabel}</span>
          </div>
          <ol>
            {hub.steps.map((step, index) => (
              <li key={step.title}>
                <small>{String(index + 1).padStart(2, "0")} /</small>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <VisitBlock />
      </main>

      <LandingFooter />

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
    </div>
  );
}
