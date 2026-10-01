import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact us | Spiritual Tattoo Studio",
  description: "Start a conversation, plan your tattoo, or find our private studio in White Town, Puducherry.",
};

// Filler links and hours: replace with the owner's details before publishing.
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

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Spiritual Tattoo Art home">
          <span className={styles.monogram} aria-hidden="true">S</span>
          <span><strong>Spiritual</strong><small>Tattoo Art / Pondicherry</small></span>
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/studio" prefetch={false}>The studio</Link>
          <Link href="/contact" aria-current="page">Contact</Link>
        </nav>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="contact-title">
          <div className={styles.heroIndex}><span>{"{CONTACT / 03}"}</span><span>Pondicherry, India</span></div>
          <div className={styles.art} aria-hidden="true">
            <Image src="/media/hero-red-art.webp" alt="" fill sizes="(max-width: 700px) 90vw, 48vw" priority />
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.script}>Every mark starts with a conversation.</p>
            <h1 id="contact-title">Let&apos;s<br /><span>connect.</span></h1>
            <p className={styles.intro}>An idea, a question, a story you want to carry.<br />We&apos;d love to hear it.</p>
            <a href="#connect" className={styles.heroLink}>Find your way to us <span aria-hidden="true">↓</span></a>
          </div>
          <div className={styles.heroFoot}><span>Custom work / Personal stories</span><span>By appointment only</span></div>
        </section>

        <section id="connect" className={styles.connect} aria-labelledby="connect-title">
          <div className={styles.sectionLabel}><h2 id="connect-title">Start somewhere.</h2><span>{"{THE FIRST STEP}"}</span></div>
          <a className={styles.contactRow} href={whatsappUrl} target="_blank" rel="noreferrer">
            <span className={styles.rowIndex}>01 /</span>
            <ContactIcon kind="whatsapp" />
            <div className={styles.rowCopy}><h3>Let&apos;s connect</h3><p>Send us your idea on WhatsApp.</p></div>
            <span className={styles.rowDetail}>+91 81242 59830</span>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </a>
          <a className={styles.contactRow} href={instagramUrl} target="_blank" rel="noreferrer">
              <span className={styles.rowIndex}>02 /</span><ContactIcon kind="instagram" />
              <div className={styles.rowCopy}><h3>Follow us</h3><p>Fresh ink. Studio moments. Work in progress.</p></div>
              <span className={styles.rowDetail}>Instagram</span><span className={styles.arrow} aria-hidden="true">↗</span>
          </a>
          <a className={styles.contactRow} href={calendlyUrl} target="_blank" rel="noreferrer">
            <span className={styles.rowIndex}>03 /</span><ContactIcon kind="calendar" />
            <div className={styles.rowCopy}><h3>Book an appointment</h3><p>Make time for your next tattoo.</p></div>
            <span className={styles.rowDetail}>Choose a time on Calendly</span>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </a>
          <div className={styles.email}><span>Prefer a letter?</span><a href="mailto:studio@spiritualart3.com">studio@spiritualart3.com <span aria-hidden="true">↗</span></a></div>
        </section>

        <section className={styles.visit} aria-labelledby="visit-title">
          <div className={styles.visitInfo}>
            <span className={styles.eyebrow}>{"{COME FIND US}"}</span>
            <h2 id="visit-title">Visit<br /><span>the studio.</span></h2>
            <address>34 Law De Lauriston Street<br />White Town, Puducherry 605001<br /><small>Near Central Bank of India</small></address>
            <a className={styles.directions} href={directionsUrl} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a>
            <div className={styles.hours}>
              <h3>Operating hours</h3>
              <dl className={styles.hoursList}>
                <div><dt>Monday to Saturday</dt><dd>11 am – 7 pm</dd></div>
                <div><dt>Sunday</dt><dd>By appointment</dd></div>
              </dl>
              <span>Message us to confirm a time before your visit.</span>
              <small>All appointment times are in IST.</small>
            </div>
          </div>
          <div className={styles.map}>
            <div className={styles.mapCaption}><span>White Town / Puducherry</span><span>Find us here ↓</span></div>
            <div className="landing-location-map">
              <iframe
                src={`${directionsUrl}&output=embed`}
                title="Spiritual Tattoo Studio location in White Town, Puducherry"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p>A quiet space for something permanent.</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Your story.<br /><em>Marked for life.</em></p>
        <Link href="/studio" prefetch={false}>Step inside the studio <span aria-hidden="true">↗</span></Link>
        <div className={styles.wordmark} aria-hidden="true">Spiritual</div>
        <div className={styles.footerIndex}><span>STS / 2026</span><span>Art / Ink / Pondicherry</span></div>
      </footer>
    </div>
  );
}
