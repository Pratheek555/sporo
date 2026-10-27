import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LandingFooter from "../../../components/landing-footer";
import SiteNav from "../../../components/site-nav";
import { defaultLocale, isLocale, localeMeta, localePath, pageAlternates } from "../../../lib/i18n/config";
import { getDictionaryFor } from "../../../lib/i18n/get-dictionary";
import { format } from "../../../lib/i18n/text";
import { businessId, jsonLdScript, site } from "../../../lib/site";
import { articles } from "../_content/articles";
import { getArticle } from "../_content/get-article";
import { getServiceSummary, serviceHref } from "../_content/registry";
import { extractHeadings, renderInline, renderMarkdown, stripInline } from "../_lib/markdown";
import VisitBlock, { whatsappLink } from "../_lib/visit-block";
import styles from "../services.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};

  const found = getArticle(lang, slug);
  if (!found) return {};

  const { article, translated } = found;
  const path = serviceHref(slug);
  // An untranslated page repeats the English article, so it points search engines at the original.
  const pageLang = translated ? lang : defaultLocale;

  return {
    title: { absolute: article.seo.title },
    description: article.seo.description,
    keywords: article.seo.keywords,
    alternates: translated ? pageAlternates(lang, path) : { canonical: path },
    robots: translated ? undefined : { index: false, follow: true },
    openGraph: {
      title: article.seo.title,
      description: article.seo.description,
      url: localePath(pageLang, path),
      siteName: site.name,
      locale: localeMeta[pageLang].openGraph,
      type: "article",
      images: [{ url: "/media/studio-gallery/studio-gallery-2.png", width: 960, height: 1280, alt: (await getDictionaryFor(pageLang)).services.meta.ogAlt }],
    },
    twitter: { card: "summary_large_image", title: article.seo.title, description: article.seo.description },
  };
}

export default async function ServicePage({ params }: PageProps<"/[lang]/services/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const found = getArticle(lang, slug);
  const summary = getServiceSummary(slug, lang);
  if (!found || !summary) notFound();

  const { article, translated } = found;
  const dictionary = await getDictionaryFor(lang);
  const d = dictionary.services;
  const a = d.article;

  const path = localePath(lang, serviceHref(slug));
  const url = `${site.url}${path}`;
  const headings = extractHeadings(article.body);
  const related = article.related.map((relatedSlug) => getServiceSummary(relatedSlug, lang)).filter((item) => item !== undefined);
  const categoryLabel = summary.category === "tattoo" ? d.tattooCategory : d.piercingCategory;
  const contentLang = translated ? lang : defaultLocale;
  // Only mark the article body's language when it differs from the page (untranslated fallback).
  const bodyLang = translated ? undefined : contentLang;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: article.seo.title,
        description: article.seo.description,
        inLanguage: localeMeta[contentLang].schema,
        about: { "@id": businessId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        primaryImageOfPage: `${site.url}/media/studio-gallery/studio-gallery-2.png`,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: d.home, item: `${site.url}${localePath(lang, "/")}` },
          { "@type": "ListItem", position: 2, name: dictionary.nav.services, item: `${site.url}${localePath(lang, "/services")}` },
          { "@type": "ListItem", position: 3, name: summary.name, item: url },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: format(d.schemaService, { name: summary.name }),
        serviceType: summary.name,
        description: article.seo.description,
        url,
        provider: { "@id": businessId },
        areaServed: ["Puducherry", "White Town", "Auroville", "Lawspet", "Kottakuppam"].map((name) => ({ "@type": "Place", name })),
        offers: { "@type": "Offer", description: d.schemaOffer },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: article.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: stripInline(faq.a) },
        })),
      },
    ],
  };

  const toc = (
    <ol>
      {headings.map((heading, index) => (
        <li key={heading.id}>
          <a href={`#${heading.id}`}><small>{String(index + 1).padStart(2, "0")}</small>{heading.text}</a>
        </li>
      ))}
      <li><a href="#faq"><small>{String(headings.length + 1).padStart(2, "0")}</small>{a.faqToc}</a></li>
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
              <li><Link href={localePath(lang, "/services")}>{dictionary.nav.services}</Link></li>
              <li><span>{categoryLabel}</span></li>
              <li aria-current="page">{summary.name}</li>
            </ol>
            <span>{d.place}</span>
          </nav>

          <div className={styles.heroArt} aria-hidden="true">
            <Image src="/media/hero-red-art.webp" alt="" fill sizes="(max-width: 700px) 90vw, 46vw" priority />
          </div>

          <div className={styles.heroCopy} lang={bodyLang}>
            <p className={styles.script}>{article.kicker}</p>
            <h1>{article.h1.lead} <span>{article.h1.accent}</span></h1>
            <p className={styles.lede}>{renderInline(article.lede, "lede", contentLang)}</p>
            <div className={styles.heroActions} lang={lang}>
              <a className={styles.buttonInk} href={whatsappLink(dictionary.whatsapp, summary.name)} target="_blank" rel="noreferrer">
                {a.consultation} <span aria-hidden="true">↗</span>
              </a>
              <a className={styles.buttonLine} href={site.directionsUrl} target="_blank" rel="noreferrer">
                {a.walkIn} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <dl className={styles.facts} lang={bodyLang}>
            {article.facts.map((fact) => (
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
              <a className={styles.tocCta} href={whatsappLink(dictionary.whatsapp, summary.name)} target="_blank" rel="noreferrer">
                {a.askMukhilan} <span aria-hidden="true">↗</span>
              </a>
            </nav>
          </aside>

          <article className={styles.article} lang={bodyLang}>
            {!translated && (
              <aside className={styles.callout} lang={lang}>
                <p>{a.untranslated}</p>
              </aside>
            )}
            {renderMarkdown(article.body, { lang: contentLang, tableLabel: dictionary.services.article.tableFallback })}
          </article>
        </div>

        <section id="faq" className={styles.faq} aria-labelledby="faq-title">
          <div className={styles.sectionLabel}>
            <h2 id="faq-title">{a.faqHeading[0]}<br /><span>{a.faqHeading[1]}</span></h2>
            <span>{format(a.faqLabel, { name: summary.name.toUpperCase() })}</span>
          </div>
          <div className={styles.faqList} lang={bodyLang}>
            {article.faqs.map((faq, index) => (
              <details key={faq.q} open={index === 0}>
                <summary>
                  <small>{String(index + 1).padStart(2, "0")} /</small>
                  <h3>{faq.q}</h3>
                  <i aria-hidden="true" />
                </summary>
                <p>{renderInline(faq.a, `faq-${index}`, contentLang)}</p>
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

        <VisitBlock topic={summary.name} />
      </main>

      <LandingFooter />

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
    </div>
  );
}
