import type { CSSProperties } from "react";
import { getDictionary } from "../lib/i18n/get-dictionary";
import { format } from "../lib/i18n/text";
import styles from "./landing-testimonials.module.css";

const googleReviewsUrl =
  "https://www.google.com/search?q=spiritualart+pondicherry&oq=spiritualart+pondicherry&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDUxMDZqMGo3qAIAsAIA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x3a5363ab0ef0d2cd:0xa4ef7c80af258de1,1,,,,";

// Reviewers and themes live here; each review's text comes from the dictionary
// (`testimonials.quotes`, in the same order) so it can be shown in the visitor's language.
const testimonials = [
  { number: "01", theme: "ink", author: "Nicolas Joffroy" },
  { number: "02", theme: "paper", author: "Lydie Asselin" },
  { number: "03", theme: "signal", author: "Chris Coles" },
  { number: "04", theme: "ink", author: "Yael Radhakrishnan" },
  { number: "05", theme: "paper", author: "Adelinemira RAZASEGARAN" },
  { number: "06", theme: "signal", author: "Sweta Soren" },
  { number: "07", theme: "ink", author: "Charlotte DE GROOTE" },
  { number: "08", theme: "paper", author: "Janine Röseler" },
] as const;

const reviewStyle: CSSProperties & { "--review-count": number } = {
  "--review-count": testimonials.length,
};

export default async function LandingTestimonials() {
  const { testimonials: t } = await getDictionary();
  const total = String(testimonials.length).padStart(2, "0");

  return (
    <section
      id="stories"
      className="landing-testimonials"
      style={reviewStyle}
      aria-labelledby="testimonials-title"
    >
      <h2 id="testimonials-title" className="sr-only">
        {t.heading}
      </h2>

      <div className="landing-testimonials-stage">
        <div className="landing-testimonials-track">
          {testimonials.map((testimonial, index) => (
            <article
              className={`landing-testimonial-panel landing-testimonial-panel--${testimonial.theme}`}
              key={testimonial.number}
            >
              <header className={styles.reviewHeader}>
                <span className="landing-testimonial-chapter">{format(t.chapter, { total })}</span>
                <a className={styles.googleBrand} href={googleReviewsUrl} target="_blank" rel="noreferrer" aria-label={t.googleLabel}>
                  <span className={styles.googleWord} aria-hidden="true">
                    <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
                  </span>
                  <span>{t.reviews}</span>
                </a>
              </header>
              <span className="landing-testimonial-ghost" aria-hidden="true">
                {testimonial.number}
              </span>

              <div className={`landing-testimonial-copy ${styles.quoteCopy}`}>
                <blockquote>
                  <p><span className={styles.quoteMark} aria-hidden="true">“</span>{t.quotes[index]}<span className={styles.quoteMark} aria-hidden="true">”</span></p>
                </blockquote>
              </div>

              <footer className="landing-testimonial-meta">
                <span>{testimonial.number} / {total}</span>
                <div className={styles.reviewer}>
                  <span className={styles.avatar} aria-hidden="true">{testimonial.author.split(" ").map((name) => name[0]).slice(0, 2).join("")}</span>
                  <div>
                    <cite className={styles.author}>{testimonial.author}</cite>
                    <div className={styles.rating} role="img" aria-label={t.stars}>
                      <span aria-hidden="true">★★★★★</span>
                      <small aria-hidden="true">5.0</small>
                    </div>
                  </div>
                </div>
                <span className={styles.reviewLink}>
                  <a href={googleReviewsUrl} target="_blank" rel="noreferrer">
                    {t.googleReview}
                  </a>
                </span>
              </footer>
            </article>
          ))}
        </div>

        <div className="landing-testimonials-progress" aria-hidden="true">
          <span>{t.progress}</span>
          <i>
            <span />
          </i>
          <span className="landing-testimonials-hint">
            <span className="landing-testimonials-hint--scroll">{t.scrollHint}</span>
            <span className="landing-testimonials-hint--swipe">{t.swipeHint}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
