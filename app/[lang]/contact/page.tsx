import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "../../components/site-nav";
import { isLocale, localePath, pageAlternates } from "../../lib/i18n/config";
import { getDictionaryFor, getLang } from "../../lib/i18n/get-dictionary";
import { site } from "../../lib/site";
import styles from "./page.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const { meta } = (await getDictionaryFor(lang)).contact;
  return { title: meta.title, description: meta.description, alternates: pageAlternates(lang, "/contact") };
}

// Filler links: confirm the Instagram and Calendly URLs with the owner before publishing.
const instagramUrl = "https://www.instagram.com/spiritualtattooart/";
const calendlyUrl = "https://calendly.com/spiritualtattooart/consultation";
const whatsappUrl = "https://wa.me/918124259830";
const directionsUrl = "https://www.google.com/maps?q=34+Law+De+Lauriston+St+Near+Central+Bank+of+India+White+Town+Puducherry+605001";

function ContactIcon({ kind }: { kind: "whatsapp" | "instagram" | "calendar" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={styles.icon}>
      {kind === "whatsapp" ? (
        <>
          <path d="M27 15.5a11 11 0 0 1-16.5 9.6L5 27l1.8-5.6A11 11 0 1 1 27 15.5Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="m12 9-2 1c-1 3 4 10 9 11l2-2-3-2-1 1c-2-1-4-3-5-5l1-1-1-3Z" fill="currentColor" />
        </>
      ) : kind === "instagram" ? (
        <>
          <rect x="5" y="5" width="22" height="22" rx="6" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="23" cy="9" r="1.5" fill="currentColor" />
        </>
      ) : (
        <>
          <rect x="5" y="7" width="22" height="21" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5 13h22M11 4v6M21 4v6m-10 9 3 3 7-7" stroke="currentColor" strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}

export default async function ContactPage() {
  const lang = await getLang();
  const dictionary = await getDictionaryFor(lang);
  const t = dictionary.contact;

  return (
    <div className={styles.page}>
      <SiteNav />

      <main>
        <section className={styles.hero} aria-labelledby="contact-title">
          <div className={styles.heroIndex}><span>{t.index}</span><span>{t.place}</span></div>
          <div className={styles.art} aria-hidden="true">
            <Image src="/media/hero-red-art.webp" alt="" fill sizes="(max-width: 700px) 90vw, 48vw" priority />
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.script}>{t.script}</p>
            <h1 id="contact-title">{t.title[0]}<br /><span>{t.title[1]}</span></h1>
            <p className={styles.intro}>{t.intro[0]}<br />{t.intro[1]}</p>
            <a href="#connect" className={styles.heroLink}>{t.heroLink} <span aria-hidden="true">↓</span></a>
          </div>
          <div className={styles.heroFoot}><span>{t.footLeft}</span><span>{t.footRight}</span></div>
        </section>

        <section id="connect" className={styles.connect} aria-labelledby="connect-title">
          <div className={styles.sectionLabel}><h2 id="connect-title">{t.connectTitle}</h2><span>{t.connectLabel}</span></div>
          <a className={styles.contactRow} href={whatsappUrl} target="_blank" rel="noreferrer">
            <span className={styles.rowIndex}>01 /</span>
            <ContactIcon kind="whatsapp" />
            <div className={styles.rowCopy}><h3>{t.whatsapp.title}</h3><p>{t.whatsapp.text}</p></div>
            <span className={styles.rowDetail}>{site.phone}</span>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </a>
          <a className={styles.contactRow} href={instagramUrl} target="_blank" rel="noreferrer">
              <span className={styles.rowIndex}>02 /</span><ContactIcon kind="instagram" />
              <div className={styles.rowCopy}><h3>{t.instagram.title}</h3><p>{t.instagram.text}</p></div>
              <span className={styles.rowDetail}>{t.instagram.detail}</span><span className={styles.arrow} aria-hidden="true">↗</span>
          </a>
          <a className={styles.contactRow} href={calendlyUrl} target="_blank" rel="noreferrer">
            <span className={styles.rowIndex}>03 /</span><ContactIcon kind="calendar" />
            <div className={styles.rowCopy}><h3>{t.calendly.title}</h3><p>{t.calendly.text}</p></div>
            <span className={styles.rowDetail}>{t.calendly.detail}</span>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </a>
          <div className={styles.email}><span>{t.emailLabel}</span><a href={`mailto:${site.email}`}>{site.email} <span aria-hidden="true">↗</span></a></div>
        </section>

        <section className={styles.visit} aria-labelledby="visit-title">
          <div className={styles.visitInfo}>
            <span className={styles.eyebrow}>{t.visitLabel}</span>
            <h2 id="visit-title">{t.visitTitle[0]}<br /><span>{t.visitTitle[1]}</span></h2>
            <address>34 Law De Lauriston Street<br />White Town, Puducherry 605001<br /><small>{t.landmark}</small></address>
            <a className={styles.directions} href={directionsUrl} target="_blank" rel="noreferrer">{t.directions} <span aria-hidden="true">↗</span></a>
            <div className={styles.hours}>
              <h3>{t.hoursTitle}</h3>
              <dl className={styles.hoursList}>
                {dictionary.hours.map((slot) => (
                  <div key={slot.label}><dt>{slot.label}</dt><dd>{slot.time}</dd></div>
                ))}
              </dl>
              <span>{t.walkIns}</span>
              <small>{t.timezone}</small>
            </div>
          </div>
          <div className={styles.map}>
            <div className={styles.mapCaption}><span>{t.mapCaption[0]}</span><span>{t.mapCaption[1]}</span></div>
            <div className="landing-location-map">
              <iframe
                src={`${directionsUrl}&output=embed`}
                title={t.mapTitle}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p>{t.mapTagline}</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>{t.footerLine[0]}<br /><em>{t.footerLine[1]}</em></p>
        <Link href={localePath(lang, "/studio")} prefetch={false}>{t.footerLink} <span aria-hidden="true">↗</span></Link>
        <div className={styles.wordmark} aria-hidden="true">Spiritual</div>
        <div className={styles.footerIndex}><span>{t.footerIndex[0]}</span><span>{t.footerIndex[1]}</span></div>
      </footer>
    </div>
  );
}
