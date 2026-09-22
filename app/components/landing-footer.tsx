const studioAddress =
  "34 Law De Lauriston Street, White Town, Puducherry 605001";

const studioDetails = [
  { label: "Studio", value: "Spiritual Tattoo Art Studio" },
  {
    label: "Address",
    value: studioAddress,
    href: "https://www.google.com/maps?q=34+Law+De+Lauriston+St+Near+Central+Bank+of+India+White+Town+Puducherry+605001",
  },
  { label: "Phone", value: "+91 81242 59830", href: "tel:+918124259830" },
];

export default function LandingFooter() {
  return (
    <footer className="landing-footer" aria-labelledby="landing-footer-title">
      <div className="landing-footer-grid">
        <div className="landing-footer-contact">
          <span>Start a conversation</span>
          <a href="mailto:studio@spiritualart3.com">
            studio@spiritualart3.com
          </a>
        </div>

        <div className="landing-footer-location">
          <span>Private studio</span>
          <strong>Pondicherry / India</strong>
          <small>Appointment only</small>
        </div>

        <address className="landing-footer-details" aria-label="Studio details">
          {studioDetails.map((detail) => (
            <div key={detail.label} className="landing-footer-detail">
              <span>{detail.label}</span>
              {detail.href ? (
                <a
                  href={detail.href}
                  {...(detail.label === "Address"
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
        Your story.
        <span>Marked for life.</span>
      </h2>

      <div className="landing-footer-index" aria-hidden="true">
        <span>STS / 2026</span>
        <span>ORIGINAL WORK / PERMANENT FORM</span>
      </div>
    </footer>
  );
}
