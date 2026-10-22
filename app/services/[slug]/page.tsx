import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LandingFooter from "../../components/landing-footer";
import SiteNav from "../../components/site-nav";
import { businessId, jsonLdScript, site } from "../../lib/site";
import { articles } from "../_content/articles";
import { getServiceSummary, serviceHref } from "../_content/registry";
import { extractHeadings, renderInline, renderMarkdown, stripInline } from "../_lib/markdown";
import VisitBlock, { whatsappLink } from "../_lib/visit-block";
import styles from "../services.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return {};

  const path = serviceHref(slug);
  return {
    title: { absolute: article.seo.title },
    description: article.seo.description,
    keywords: article.seo.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: article.seo.title,
      description: article.seo.description,
      url: path,
      siteName: site.name,
      locale: "en_IN",
      type: "article",
      images: [{ url: "/media/studio-gallery/studio-gallery-2.png", width: 960, height: 1280, alt: "Inside Spiritual Tattoo Art Studio, White Town, Puducherry" }],
    },
    twitter: { card: "summary_large_image", title: article.seo.title, description: article.seo.description },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const article = articles[slug];
  const summary = getServiceSummary(slug);
  if (!article || !summary) notFound();

  const url = `${site.url}${serviceHref(slug)}`;
  const headings = extractHeadings(article.body);
  const related = article.related.map(getServiceSummary).filter((item) => item !== undefined);
  const categoryLabel = summary.category === "tattoo" ? "Tattoos" : "Piercings";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: article.seo.title,
        description: article.seo.description,
        inLanguage: "en-IN",
        about: { "@id": businessId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        primaryImageOfPage: `${site.url}/media/studio-gallery/studio-gallery-2.png`,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
          { "@type": "ListItem", position: 3, name: summary.name, item: url },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${summary.name} in Pondicherry`,
        serviceType: summary.name,
        description: article.seo.description,
        url,
        provider: { "@id": businessId },
        areaServed: ["Puducherry", "White Town", "Auroville", "Lawspet", "Kottakuppam"].map((name) => ({ "@type": "Place", name })),
        offers: { "@type": "Offer", description: "Free consultation. Walk-ins and appointments available." },
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
      <li><a href="#faq"><small>{String(headings.length + 1).padStart(2, "0")}</small>Questions, answered</a></li>
      <li><a href="#visit-the-studio"><small>{String(headings.length + 2).padStart(2, "0")}</small>Visit the studio</a></li>
    </ol>
  );

  return (
    <div className={styles.page}>
      <SiteNav />

      <main className={styles.main}>
        <header className={styles.hero}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><span>{categoryLabel}</span></li>
              <li aria-current="page">{summary.name}</li>
            </ol>
            <span>White Town / Puducherry</span>
          </nav>

          <div className={styles.heroArt} aria-hidden="true">
            <Image src="/media/hero-red-art.webp" alt="" fill sizes="(max-width: 700px) 90vw, 46vw" priority />
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.script}>{article.kicker}</p>
            <h1>{article.h1.lead} <span>{article.h1.accent}</span></h1>
            <p className={styles.lede}>{renderInline(article.lede, "lede")}</p>
            <div className={styles.heroActions}>
              <a className={styles.buttonInk} href={whatsappLink(summary.name)} target="_blank" rel="noreferrer">
                Free consultation <span aria-hidden="true">↗</span>
              </a>
              <a className={styles.buttonLine} href={site.directionsUrl} target="_blank" rel="noreferrer">
                Walk in / Get directions <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <dl className={styles.facts}>
            {article.facts.map((fact) => (
              <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
            ))}
          </dl>
        </header>

        <div className={styles.layout}>
          <aside className={styles.tocColumn} aria-label="On this page">
            <details className={styles.tocMobile}>
              <summary>On this page <span aria-hidden="true">+</span></summary>
              {toc}
            </details>
            <nav className={styles.toc} aria-label="Table of contents">
              <p>{"{ON THIS PAGE}"}</p>
              {toc}
              <a className={styles.tocCta} href={whatsappLink(summary.name)} target="_blank" rel="noreferrer">
                Ask Mukhilan <span aria-hidden="true">↗</span>
              </a>
            </nav>
          </aside>

          <article className={styles.article}>{renderMarkdown(article.body)}</article>
        </div>

        <section id="faq" className={styles.faq} aria-labelledby="faq-title">
          <div className={styles.sectionLabel}>
            <h2 id="faq-title">Questions,<br /><span>answered.</span></h2>
            <span>{`{${summary.name.toUpperCase()} / FAQ}`}</span>
          </div>
          <div className={styles.faqList}>
            {article.faqs.map((faq, index) => (
              <details key={faq.q} open={index === 0}>
                <summary>
                  <small>{String(index + 1).padStart(2, "0")} /</small>
                  <h3>{faq.q}</h3>
                  <i aria-hidden="true" />
                </summary>
                <p>{renderInline(faq.a, `faq-${index}`)}</p>
              </details>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className={styles.related} aria-labelledby="related-title">
            <div className={styles.sectionLabel}>
              <h2 id="related-title">Keep exploring</h2>
              <Link href="/services">All services ↗</Link>
            </div>
            <ul>
              {related.map((item, index) => (
                <li key={item.slug}>
                  <Link href={serviceHref(item.slug)}>
                    <small>{String(index + 1).padStart(2, "0")} / {item.category === "tattoo" ? "Tattoo" : "Piercing"}</small>
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
