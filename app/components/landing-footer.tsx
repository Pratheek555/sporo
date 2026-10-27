import Link from "next/link";
import { localePath } from "../lib/i18n/config";
import { getDictionaryFor, getLang } from "../lib/i18n/get-dictionary";
import { site } from "../lib/site";

const studioAddress =
  "34 Law De Lauriston Street, White Town, Puducherry 605001";

export default async function LandingFooter() {
  const lang = await getLang();
  const t = (await getDictionaryFor(lang)).footer;

  const studioDetails = [
    { key: "studio", label: t.studio, value: site.name },
    { key: "address", label: t.address, value: studioAddress, href: site.directionsUrl },
    { key: "phone", label: t.phone, value: site.phone, href: site.phoneHref },
  ];

  return (
    <footer className="landing-footer" aria-labelledby="landing-footer-title">
      <div className="landing-footer-grid">
        <div className="landing-footer-contact">
          <span>{t.startConversation}</span>
          <a href={localePath(lang, "/contact")}>{t.contactUs}</a>
          <Link href={localePath(lang, "/services")}>{t.allServices}</Link>
          <a href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>

        <div className="landing-footer-location">
          <span>{t.locationLabel}</span>
          <strong>{t.locationPlace}</strong>
          <small>{t.locationNote}</small>
        </div>

        <address className="landing-footer-details" aria-label={t.detailsLabel}>
          {studioDetails.map((detail) => (
            <div key={detail.key} className="landing-footer-detail">
              <span>{detail.label}</span>
              {detail.href ? (
                <a
                  href={detail.href}
                  {...(detail.key === "address"
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {detail.value}
                  <i aria-hidden="true">↗</i>
                </a>
              ) : (
                <strong>{detail.value}</strong>
              )}
            </div>
          ))}
        </address>
      </div>

      <div className="landing-footer-wordmark" aria-hidden="true">
        <span>SPIRITUAL</span>
      </div>

      <h2 id="landing-footer-title" className="landing-footer-cta">
        {t.cta[0]}
        <span>{t.cta[1]}</span>
      </h2>

      <div className="landing-footer-index" aria-hidden="true">
        <span>{t.index[0]}</span>
        <span>{t.index[1]}</span>
      </div>
    </footer>
  );
}
