import { getDictionary } from "../lib/i18n/get-dictionary";
import { format } from "../lib/i18n/text";
import { site } from "../lib/site";
import DeferredMap from "./deferred-map";

const mapUrl =
  "https://www.google.com/maps?q=34+Law+De+Lauriston+St+Near+Central+Bank+of+India+White+Town+Puducherry+605001&output=embed";

const directionsUrl =
  "https://www.google.com/maps?q=34+Law+De+Lauriston+St+Near+Central+Bank+of+India+White+Town+Puducherry+605001";

export default async function LandingLocation() {
  const { location: t } = await getDictionary();

  return (
    <section id="visit" className="landing-location" aria-labelledby="landing-location-title">
      <div className="landing-location-heading">
        <span>{t.label}</span>
        <h2 id="landing-location-title">White Town / Puducherry</h2>
        <p className="landing-location-name">{site.name}</p>
        <p>
          {t.address[0]}<br />
          {t.address[1]}
        </p>
        <div className="landing-location-links">
          <a href={site.phoneHref} aria-label={format(t.callAria, { name: site.name, phone: site.phone })}>
            {site.phone} <i aria-hidden="true">{t.call}</i>
          </a>
          <a href={directionsUrl} target="_blank" rel="noreferrer">
            {t.maps} <i aria-hidden="true">↗</i>
          </a>
        </div>
      </div>

      <DeferredMap src={mapUrl} title={t.mapTitle} />
    </section>
  );
}
