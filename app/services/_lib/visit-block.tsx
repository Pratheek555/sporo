import { site } from "../../lib/site";
import styles from "../services.module.css";

export function whatsappLink(topic?: string) {
  const message = topic
    ? `Hi Spiritual Tattoo Art! I'd like a free consultation. I'm interested in: ${topic}.`
    : "Hi Spiritual Tattoo Art! I'd like a free consultation.";
  return `${site.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export default function VisitBlock({ topic }: { topic?: string }) {
  return (
    <section id="visit-the-studio" className={styles.visit} aria-labelledby="visit-block-title">
      <div className={styles.visitInfo}>
        <span className={styles.eyebrow}>{"{COME FIND US}"}</span>
        <h2 id="visit-block-title">Visit<br /><span>the studio.</span></h2>
        <address>
          {site.address.street}<br />
          {site.address.locality}, {site.address.city} {site.address.postalCode}<br />
          <small>{site.address.landmark}</small>
        </address>
        <a className={styles.lineLink} href={site.directionsUrl} target="_blank" rel="noreferrer">
          Get directions <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className={styles.visitHours}>
        <h3>Opening hours</h3>
        <dl>
          {site.hours.map((slot) => (
            <div key={slot.label}><dt>{slot.label}</dt><dd>{slot.time}</dd></div>
          ))}
        </dl>
        <p>Walk-ins are welcome. For bigger pieces, message us first so we can keep a chair and enough time free for you.</p>
      </div>

      <div className={styles.visitActions}>
        <p className={styles.visitScript}>Every mark starts with a conversation.</p>
        <a className={styles.buttonPrimary} href={whatsappLink(topic)} target="_blank" rel="noreferrer">
          Book a free consultation <span aria-hidden="true">↗</span>
        </a>
        <a className={styles.buttonGhost} href={site.phoneHref}>
          Call {site.phone} <span aria-hidden="true">↗</span>
        </a>
        <a className={styles.buttonGhost} href={`mailto:${site.email}`}>
          {site.email} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
