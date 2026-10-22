import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LandingFooter from "../components/landing-footer";
import SiteNav from "../components/site-nav";
import { businessId, jsonLdScript, site } from "../lib/site";
import {
  piercingServices,
  serviceHref,
  services,
  tattooServices,
  type ServiceSummary,
} from "./_content/registry";
import VisitBlock, { whatsappLink } from "./_lib/visit-block";
import styles from "./services.module.css";

const title = "Tattoo & Piercing Services in Pondicherry | Spiritual Tattoo Art Studio, White Town";
const description =
  "Custom tattoos in every style and professional piercings in White Town, Pondicherry. Free consultations, walk-ins welcome, autoclave-sterilised tools.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "best tattoo shop in Pondicherry",
    "best piercing shop in Pondicherry",
    "best tattoo studio in Puducherry",
    "tattoo and piercing White Town",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title,
    description,
    url: "/services",
    siteName: site.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/media/studio-gallery/studio-gallery-2.png", width: 960, height: 1280, alt: "Inside Spiritual Tattoo Art Studio, White Town, Puducherry" }],
  },
};

const steps = [
  { title: "Talk", text: "Walk in or message us. The consultation is free, unhurried and honest." },
  { title: "Design", text: "Your idea becomes a sketch drawn for your body, not pulled from a folder." },
  { title: "Create", text: "Autoclave-sterilised tools, single-use needles, and breaks whenever you need them." },
  { title: "Heal", text: "Written aftercare for Pondicherry's humid, salty, sunny climate, plus WhatsApp support." },
];

function ServiceGrid({ items, offset = 0 }: { items: readonly ServiceSummary[]; offset?: number }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.slug}>
          <Link href={serviceHref(item.slug)}>
            <small>{String(index + 1 + offset).padStart(2, "0")} / {item.category === "tattoo" ? "Tattoo" : "Piercing"}</small>
            <strong>{item.name}</strong>
            <span>{item.blurb}</span>
            <i aria-hidden="true">↗</i>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ServicesPage() {
  const url = `${site.url}/services`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: "en-IN",
        about: { "@id": businessId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Services", item: url },
        ],
      },
      {
        "@type": "ItemList",
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.name,
          url: `${site.url}${serviceHref(service.slug)}`,
        })),
      },
    ],
  };

  return (
    <div className={styles.page}>
      <SiteNav />

      <main className={styles.main}>
        <header className={styles.hero}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li aria-current="page">Services</li>
            </ol>
            <span>White Town / Puducherry</span>
          </nav>

          <div className={styles.heroArt} aria-hidden="true">
            <Image src="/media/hero-red-art.webp" alt="" fill sizes="(max-width: 700px) 90vw, 46vw" priority />
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.script}>Twenty-four ways to leave Pondicherry a little changed.</p>
            <h1>Tattoos &amp; piercings <span>in Pondicherry</span></h1>
            <p className={styles.lede}>
              Custom tattoos in every style and careful, professional piercings, all under one roof on Law De Lauriston Street.
              Pick a service below, or walk in and let&apos;s figure it out together.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.buttonInk} href={whatsappLink()} target="_blank" rel="noreferrer">
                Free consultation <span aria-hidden="true">↗</span>
              </a>
              <a className={styles.buttonLine} href="#tattoos">
                Browse services <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <dl className={styles.facts}>
            <div><dt>Tattoo services</dt><dd>{tattooServices.length} styles &amp; specialities</dd></div>
            <div><dt>Piercings</dt><dd>{piercingServices.length} placements</dd></div>
            <div><dt>Visits</dt><dd>Walk-ins &amp; appointments</dd></div>
            <div><dt>Consultation</dt><dd>Always free</dd></div>
          </dl>
        </header>

        <section className={styles.hubIntro} aria-label="About our services">
          <div>
            <p>
              People search for the best tattoo shop in Pondicherry for all sorts of reasons. A first tattoo after years of
              &ldquo;someday&rdquo;. A keepsake from a trip to the French Quarter. A portrait of someone they miss. A cover-up
              that&apos;s overdue.
            </p>
            <p>
              Whatever brings you in, the process is the same. Mukhilan, our founder and artist, has tattooed since 2018. He
              listens first, draws for your body, and works with autoclave-sterilised tools and single-use needles. Read more
              <Link href="/services/tattoo-artist"> about Mukhilan</Link> or <Link href="/studio">step inside the studio</Link>.
            </p>
          </div>
          <div>
            <p>
              Looking for the best piercing shop in Pondicherry instead? The same care applies. Mukhilan checks your anatomy
              and talks you through jewellery and healing before anything happens. Then you get written aftercare for a
              climate that&apos;s humid, salty and very fond of the beach.
            </p>
            <p>
              We&apos;re in White Town near Central Bank of India, a short walk from the Promenade, and an easy ride from
              Auroville, Lawspet or the ECR. Walk in any day, or <Link href="/contact">get in touch</Link> first for larger work.
            </p>
          </div>
        </section>

        <section id="tattoos" className={`${styles.related} ${styles.hubGroup}`} aria-labelledby="tattoo-services-title">
          <div className={styles.sectionLabel}>
            <h2 id="tattoo-services-title">Tattoo <span>services</span></h2>
            <span>{`{${tattooServices.length} STYLES & SPECIALITIES}`}</span>
          </div>
          <ServiceGrid items={tattooServices} />
        </section>

        <section id="piercings" className={`${styles.related} ${styles.hubGroup}`} aria-labelledby="piercing-services-title">
          <div className={styles.sectionLabel}>
            <h2 id="piercing-services-title">Piercing <span>services</span></h2>
            <span>{`{${piercingServices.length} PLACEMENTS}`}</span>
          </div>
          <ServiceGrid items={piercingServices} />
        </section>

        <section className={styles.hubSteps} aria-labelledby="how-it-works-title">
          <div className={styles.sectionLabel}>
            <h2 id="how-it-works-title">How it <span>works.</span></h2>
            <span>{"{FOUR STEPS / NO PRESSURE}"}</span>
          </div>
          <ol>
            {steps.map((step, index) => (
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
