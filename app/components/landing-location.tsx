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
        <p>
          34 Law De Lauriston Street<br />
          Near Central Bank of India, 605001
        </p>
        <a href={directionsUrl} target="_blank" rel="noreferrer">
          Open in Google Maps <i aria-hidden="true">↗</i>
        </a>
      </div>

      <div className="landing-location-map">
        <iframe
          src={mapUrl}
          title="Spiritual Tattoo Studio location in White Town, Puducherry"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
