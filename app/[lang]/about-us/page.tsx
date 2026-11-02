import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "../../components/site-nav";
import LandingFooter from "../../components/landing-footer";
import { isLocale, localePath, pageAlternates } from "../../lib/i18n/config";
import { getLang } from "../../lib/i18n/get-dictionary";
import { founderId, jsonLdScript, site, webPageJsonLd } from "../../lib/site";
import { aboutContent } from "./content";
import styles from "./page.module.css";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = aboutContent[lang];
  return { ...meta, alternates: pageAlternates(lang, "/about-us"), openGraph: { ...meta, images: [{ url: "/owner.jpeg", alt: aboutContent[lang].portrait }] } };
}

export default async function AboutPage() {
  const lang = await getLang();
  const t = aboutContent[lang];
  const href = (path: string) => localePath(lang, path);
  const jsonLd = { "@context": "https://schema.org", "@graph": webPageJsonLd({ url: `${site.url}${href("/about-us")}`, name: t.meta.title, description: t.meta.description, lang, type: "AboutPage", mainEntity: founderId, image: `${site.url}/owner.jpeg` }) };

  return (
    <div className={styles.page}>
      <SiteNav />
      <main>
        <section className={styles.hero} aria-labelledby="about-heading">
          <div className={styles.index}><span>{t.label}</span><span>{t.place}</span></div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.script}>Mukhilan</p>
              <h1 id="about-heading">{t.title[0]}<br />{t.title[1]}<br /><em>{t.title[2]}</em></h1>
              <p className={styles.intro}>{t.intro}</p>
              <a className={styles.textLink} href="#story">{t.read} <span aria-hidden="true">↓</span></a>
            </div>
            <figure className={styles.portrait}>
              <div className={styles.portraitImage}><Image src="/owner.jpeg" alt={t.portrait} fill sizes="(max-width: 760px) 90vw, 43vw" priority /></div>
              <figcaption><span>{t.caption}</span><span>01 /</span></figcaption>
            </figure>
          </div>
          <div className={styles.heroFoot}><span>{t.since}</span><span>SPIRITUAL TATTOO ART STUDIO</span></div>
        </section>

        <dl className={styles.facts}>
          {t.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
        </dl>

        <div id="story" className={styles.story}>
          {t.chapters.map((chapter, index) => (
            <section key={chapter.label} className={styles.chapter} aria-labelledby={`chapter-${index}`}>
              <p className={styles.label}><span>0{index + 1}</span> / {chapter.label}</p>
              <div className={styles.chapterCopy}>
                <h2 id={`chapter-${index}`}>{chapter.title}</h2>
                {chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {index === 1 && <figure className={styles.work}><div><Image src="/media/studio-films/living-marks.jpg" alt={t.workAlt} fill sizes="(max-width: 760px) 90vw, 32vw" /></div><figcaption>{t.workCaption}</figcaption></figure>}
            </section>
          ))}
        </div>

        <figure className={styles.quote}>
          <blockquote>{t.quote}</blockquote>
          <figcaption>— {t.quoteBy}</figcaption>
        </figure>

        <section className={styles.journey} aria-labelledby="journey-heading">
          <div className={styles.journeyIntro}><p className={styles.label}>{t.journeyLabel}</p><h2 id="journey-heading">{t.journeyTitle}</h2><span className={styles.year} aria-hidden="true">2013<span>—</span></span></div>
          <ol className={styles.timeline}>{t.timeline.map((step) => <li key={step.time}><span className={styles.label}>{step.time}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
        </section>

        <section className={styles.philosophy} aria-labelledby="philosophy-heading">
          <figure className={styles.studioImage}><Image src="/media/studio-gallery/studio-gallery-1.png" alt={t.studioAlt} fill sizes="(max-width: 760px) 100vw, 45vw" /><figcaption>{t.imageCaption}</figcaption></figure>
          <div className={styles.philosophyCopy}><p className={styles.label}>{t.philosophyLabel}</p><h2 id="philosophy-heading">{t.philosophyTitle[0]}<br /><em>{t.philosophyTitle[1]}</em></h2><p>{t.philosophyText}</p><p>{t.closing}</p><div className={styles.links}><Link className={styles.textLink} href={href("/studio")}>{t.studioLink} <span aria-hidden="true">↗</span></Link><Link className={styles.textLink} href={href("/contact")}>{t.contactLink} <span aria-hidden="true">↗</span></Link></div></div>
        </section>

        <section className={styles.cta} aria-labelledby="cta-heading">
          <h2 id="cta-heading">{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
          <Link className={styles.button} href={href("/contact")}>{t.contactLink} <span aria-hidden="true">→</span></Link>
        </section>
      </main>
      <LandingFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
    </div>
  );
}
