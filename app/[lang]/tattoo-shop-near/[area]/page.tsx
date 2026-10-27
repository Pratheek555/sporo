import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LandingFooter from "../../../components/landing-footer";
import SiteNav from "../../../components/site-nav";
import { isLocale, localeMeta, localePath, pageAlternates } from "../../../lib/i18n/config";
import { getDictionaryFor } from "../../../lib/i18n/get-dictionary";
import { businessId, jsonLdScript, site } from "../../../lib/site";
import { getServiceSummary, serviceHref } from "../../services/_content/registry";
import { extractHeadings, renderInline, renderMarkdown, stripInline } from "../../services/_lib/markdown";
import VisitBlock, { whatsappLink } from "../../services/_lib/visit-block";
import styles from "../../services/services.module.css";
import { areaHref, areas } from "../_content/areas";
import { getArea } from "../_content/get-area";
import areaStyles from "../area.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(areas).map((area) => ({ area }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/tattoo-shop-near/[area]">): Promise<Metadata> {
  const { lang, area: slug } = await params;
  if (!isLocale(lang)) return {};
  const page = getArea(lang, slug);
  if (!page) return {};

  const path = areaHref(slug);
  return {
    title: { absolute: page.seo.title },
    description: page.seo.description,
    keywords: page.seo.keywords,
    alternates: pageAlternates(lang, path),
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url: localePath(lang, path),
      siteName: site.name,
      locale: localeMeta[lang].openGraph,
      type: "website",
      images: [{ url: "/media/studio-gallery/studio-gallery-2.png", width: 960, height: 1280, alt: (await getDictionaryFor(lang)).services.meta.ogAlt }],
    },
    twitter: { card: "summary_large_image", title: page.seo.title, description: page.seo.description },
  };
}

export default async function AreaPage({ params }: PageProps<"/[lang]/tattoo-shop-near/[area]">) {
  const { lang, area: slug } = await params;
  if (!isLocale(lang)) notFound();
  const page = getArea(lang, slug);
  if (!page) notFound();
  const dictionary = await getDictionaryFor(lang);
  const { whatsapp } = dictionary;
  const d = dictionary.services;
  const a = d.article;

  const url = `${site.url}${localePath(lang, areaHref(slug))}`;
  const topic = lang === "fr" ? `un tatouage (je viens de ${page.area})` : `a tattoo (I'm coming from ${page.area})`;
  const headings = extractHeadings(page.body);
  const related = page.related.map((relatedSlug) => getServiceSummary(relatedSlug, lang)).filter((item) => item !== undefined);
  const crumb = lang === "fr" ? `Salon de tatouage près de ${page.area}` : `Tattoo shop near ${page.area}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.seo.title,
        description: page.seo.description,
        inLanguage: localeMeta[lang].schema,
        about: { "@id": businessId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        primaryImageOfPage: `${site.url}/media/studio-gallery/studio-gallery-2.png`,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: d.home, item: `${site.url}${localePath(lang, "/")}` },
          { "@type": "ListItem", position: 2, name: crumb, item: url },
        ],
      },
      {
        // The full TattooParlor node is emitted site-wide by the root layout;
        // this extends it with the neighbourhood the page targets.
        "@type": "TattooParlor",
        "@id": businessId,
        name: site.name,
        areaServed: { "@type": "Place", name: page.area },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: crumb,
        serviceType: d.cardTattoo,
        description: page.seo.description,
        url,
        provider: { "@id": businessId },
        areaServed: { "@type": "Place", name: page.area },
        offers: { "@type": "Offer", description: d.schemaOffer },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: stripInline(faq.a) },
        })),
      },
    ],
  };

  const faqLabel = `${page.faqTitle.lead} ${page.faqTitle.accent}`;
  const toc = (
    <ol>
      {headings.map((heading, index) => (
        <li key={heading.id}>
          <a href={`#${heading.id}`}><small>{String(index + 1).padStart(2, "0")}</small>{heading.text}</a>
        </li>
      ))}
      <li><a href="#faq"><small>{String(headings.length + 1).padStart(2, "0")}</small>{faqLabel}</a></li>
      <li><a href="#visit-the-studio"><small>{String(headings.length + 2).padStart(2, "0")}</small>{a.visitToc}</a></li>
    </ol>
  );

  return (
    <div className={styles.page}>
      <SiteNav />

      <main className={styles.main}>
        <header className={styles.hero}>
          <nav className={styles.breadcrumb} aria-label={d.breadcrumbLabel}>
            <ol>
              <li><Link href={localePath(lang, "/")}>{d.home}</Link></li>
              <li aria-current="page">{crumb}</li>
            </ol>
            <span>{d.place}</span>
          </nav>

          <div className={styles.heroArt} aria-hidden="true">
            <Image src="/media/hero-red-art.webp" alt="" fill sizes="(max-width: 700px) 90vw, 46vw" priority />
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.script}>{page.kicker}</p>
            <h1 className={areaStyles.heading}>{page.h1.lead} <span>{page.h1.accent}</span></h1>
            <p className={styles.lede}>{renderInline(page.lede, "lede", lang)}</p>
            <div className={styles.heroActions}>
              <a className={styles.buttonInk} href={whatsappLink(whatsapp, topic)} target="_blank" rel="noreferrer">
                {a.consultation} <span aria-hidden="true">↗</span>
              </a>
              <a className={styles.buttonLine} href={site.directionsUrl} target="_blank" rel="noreferrer">
                {a.walkIn} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <dl className={styles.facts}>
            {page.facts.map((fact) => (
              <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
            ))}
          </dl>
        </header>

        <div className={styles.layout}>
          <aside className={styles.tocColumn} aria-label={a.onThisPage}>
            <details className={styles.tocMobile}>
              <summary>{a.onThisPage} <span aria-hidden="true">+</span></summary>
              {toc}
            </details>
            <nav className={styles.toc} aria-label={a.tocLabel}>
              <p>{a.tocTitle}</p>
              {toc}
              <a className={styles.tocCta} href={whatsappLink(whatsapp, topic)} target="_blank" rel="noreferrer">
                {a.askMukhilan} <span aria-hidden="true">↗</span>
              </a>
            </nav>
          </aside>

          <article className={styles.article}>{renderMarkdown(page.body, { lang, tableLabel: a.tableFallback })}</article>
        </div>

        <section id="faq" className={styles.faq} aria-labelledby="faq-title">
          <div className={styles.sectionLabel}>
            <h2 id="faq-title">{page.faqTitle.lead}<br /><span>{page.faqTitle.accent}</span></h2>
            <span>{`{${page.area.toUpperCase()} / FAQ}`}</span>
          </div>
          <div className={styles.faqList}>
            {page.faqs.map((faq, index) => (
              <details key={faq.q} open={index === 0}>
                <summary>
                  <small>{String(index + 1).padStart(2, "0")} /</small>
                  <h3>{faq.q}</h3>
                  <i aria-hidden="true" />
                </summary>
                <p>{renderInline(faq.a, `faq-${index}`, lang)}</p>
              </details>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className={styles.related} aria-labelledby="related-title">
            <div className={styles.sectionLabel}>
              <h2 id="related-title">{a.exploreHeading}</h2>
              <Link href={localePath(lang, "/services")}>{a.allServices}</Link>
            </div>
            <ul>
              {related.map((item, index) => (
                <li key={item.slug}>
                  <Link href={localePath(lang, serviceHref(item.slug))}>
                    <small>{String(index + 1).padStart(2, "0")} / {item.category === "tattoo" ? d.cardTattoo : d.cardPiercing}</small>
                    <strong>{item.name}</strong>
                    <span>{item.blurb}</span>
                    <i aria-hidden="true">↗</i>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <VisitBlock topic={topic} />
      </main>

      <LandingFooter />

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
    </div>
  );
}
