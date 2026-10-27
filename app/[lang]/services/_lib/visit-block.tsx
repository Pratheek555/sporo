import type { Dictionary } from "../../../lib/i18n/dictionaries/en";
import { getDictionary } from "../../../lib/i18n/get-dictionary";
import { format } from "../../../lib/i18n/text";
import { site } from "../../../lib/site";
import styles from "../services.module.css";

/** WhatsApp deep link with a pre-filled message in the visitor's language. */
export function whatsappLink(t: Dictionary["whatsapp"], topic?: string) {
  const message = topic ? format(t.messageWithTopic, { topic }) : t.message;
  return `${site.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export default async function VisitBlock({ topic }: { topic?: string }) {
  const dictionary = await getDictionary();
  const t = dictionary.services.visit;

  return (
    <section id="visit-the-studio" className={styles.visit} aria-labelledby="visit-block-title">
      <div className={styles.visitInfo}>
        <span className={styles.eyebrow}>{t.label}</span>
        <h2 id="visit-block-title">{t.title[0]}<br /><span>{t.title[1]}</span></h2>
        <address>
          {site.address.street}<br />
          {site.address.locality}, {site.address.city} {site.address.postalCode}<br />
          <small>{dictionary.contact.landmark}</small>
        </address>
        <a className={styles.lineLink} href={site.directionsUrl} target="_blank" rel="noreferrer">
          {t.directions} <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className={styles.visitHours}>
        <h3>{t.hoursTitle}</h3>
        <dl>
          {dictionary.hours.map((slot) => (
            <div key={slot.label}><dt>{slot.label}</dt><dd>{slot.time}</dd></div>
          ))}
        </dl>
        <p>{t.walkIns}</p>
      </div>

      <div className={styles.visitActions}>
        <p className={styles.visitScript}>{t.script}</p>
        <a className={styles.buttonPrimary} href={whatsappLink(dictionary.whatsapp, topic)} target="_blank" rel="noreferrer">
          {t.book} <span aria-hidden="true">↗</span>
        </a>
        <a className={styles.buttonGhost} href={site.phoneHref}>
          {format(t.call, { phone: site.phone })} <span aria-hidden="true">↗</span>
        </a>
        <a className={styles.buttonGhost} href={`mailto:${site.email}`}>
          {site.email} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
