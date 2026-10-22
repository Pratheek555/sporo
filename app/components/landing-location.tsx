import DeferredMap from "./deferred-map";
import { site } from "../lib/site";

const mapUrl =
  "https://www.google.com/maps?q=34+Law+De+Lauriston+St+Near+Central+Bank+of+India+White+Town+Puducherry+605001&output=embed";

const directionsUrl =
  "https://www.google.com/maps?q=34+Law+De+Lauriston+St+Near+Central+Bank+of+India+White+Town+Puducherry+605001";

export default function LandingLocation() {
  return (
    <section id="visit" className="landing-location" aria-labelledby="landing-location-title">
      <div className="landing-location-heading">
        <span>{"{FIND THE STUDIO}"}</span>
        <h2 id="landing-location-title">White Town / Puducherry</h2>
        <p className="landing-location-name">{site.name}</p>
        <p>
          34 Law De Lauriston Street<br />
          Near Central Bank of India, 605001
        </p>
        <div className="landing-location-links">
          <a href={site.phoneHref} aria-label={`Call ${site.name} at ${site.phone}`}>
            {site.phone} <i aria-hidden="true">Call ↗</i>
          </a>
          <a href={directionsUrl} target="_blank" rel="noreferrer">
            Open in Google Maps <i aria-hidden="true">↗</i>
          </a>
        </div>
      </div>

      <DeferredMap src={mapUrl} />
    </section>
  );
}
