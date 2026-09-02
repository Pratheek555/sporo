import Image from "next/image";

const footerLinks = [
  { label: "Enter studio", href: "/studio" },
  { label: "Book a session", href: "mailto:studio@spiritualart3.com" },
  { label: "Back to top", href: "#top" },
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

        <nav className="landing-footer-nav" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href}>
              <span>{link.label}</span>
              <i aria-hidden="true">↗</i>
            </a>
          ))}
        </nav>
      </div>

      <div className="landing-footer-wordmark" aria-hidden="true">
        <span>SPIRITUAL</span>
        <span className="landing-footer-emblem">
          <Image
            src="/cover-kali.png"
            alt=""
            fill
            sizes="(max-width: 700px) 56px, 8vw"
          />
        </span>
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
