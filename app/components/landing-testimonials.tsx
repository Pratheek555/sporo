import type { CSSProperties } from "react";
import styles from "./landing-testimonials.module.css";

const googleReviewsUrl =
  "https://www.google.com/search?q=spiritualart+pondicherry&oq=spiritualart+pondicherry&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDUxMDZqMGo3qAIAsAIA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x3a5363ab0ef0d2cd:0xa4ef7c80af258de1,1,,,,";

const testimonials = [
  {
    number: "01",
    theme: "ink",
    author: "Nicolas Joffroy",
    quote: "Excellent tattoo artist, and someone I trust completely.",
  },
  {
    number: "02",
    theme: "paper",
    author: "Lydie Asselin",
    quote: "Beautiful, delicate, and exactly what I had imagined.",
  },
  {
    number: "03",
    theme: "signal",
    author: "Chris Coles",
    quote: "Very clean and professional.",
  },
  {
    number: "04",
    theme: "ink",
    author: "Yael Radhakrishnan",
    quote: "Mukhilan is a true artist and a deeply spiritual person.",
  },
  {
    number: "05",
    theme: "paper",
    author: "Adelinemira RAZASEGARAN",
    quote: "The artist was professional, talented, and made me feel comfortable throughout the whole process.",
  },
  {
    number: "06",
    theme: "signal",
    author: "Sweta Soren",
    quote: "His work is really detailed and beautifully done, and he always gives helpful advice on the placement and size.",
  },
  {
    number: "07",
    theme: "ink",
    author: "Charlotte DE GROOTE",
    quote: "The piercer was super friendly, very welcoming, and flexible.",
  },
  {
    number: "08",
    theme: "paper",
    author: "Janine Röseler",
    quote: "Mister Mukhilan is an absolut great Artist. So friendly and patient.",
  },
] as const;

const reviewStyle: CSSProperties & { "--review-count": number } = {
  "--review-count": testimonials.length,
};

export default function LandingTestimonials() {
  return (
    <section
      id="stories"
      className="landing-testimonials"
      style={reviewStyle}
      aria-labelledby="testimonials-title"
    >
      <h2 id="testimonials-title" className="sr-only">
        Google reviews from our clients
      </h2>

      <div className="landing-testimonials-stage">
        <div className="landing-testimonials-track">
          {testimonials.map((testimonial) => (
            <article
              className={`landing-testimonial-panel landing-testimonial-panel--${testimonial.theme}`}
              key={testimonial.number}
            >
              <header className={styles.reviewHeader}>
                <span className="landing-testimonial-chapter">CLIENT STORIES / {String(testimonials.length).padStart(2, "0")}</span>
                <a className={styles.googleBrand} href={googleReviewsUrl} target="_blank" rel="noreferrer" aria-label="Read our reviews on Google">
                  <span className={styles.googleWord} aria-hidden="true">
                    <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
                  </span>
                  <span>Reviews ↗</span>
                </a>
              </header>
              <span className="landing-testimonial-ghost" aria-hidden="true">
                {testimonial.number}
              </span>

              <div className={`landing-testimonial-copy ${styles.quoteCopy}`}>
                <blockquote>
                  <p><span className={styles.quoteMark} aria-hidden="true">“</span>{testimonial.quote}<span className={styles.quoteMark} aria-hidden="true">”</span></p>
                </blockquote>
              </div>

              <footer className="landing-testimonial-meta">
                <span>{testimonial.number} / {String(testimonials.length).padStart(2, "0")}</span>
                <div className={styles.reviewer}>
                  <span className={styles.avatar} aria-hidden="true">{testimonial.author.split(" ").map((name) => name[0]).slice(0, 2).join("")}</span>
                  <div>
                    <cite className={styles.author}>{testimonial.author}</cite>
                    <div className={styles.rating} role="img" aria-label="5 out of 5 stars">
                      <span aria-hidden="true">★★★★★</span>
                      <small aria-hidden="true">5.0</small>
                    </div>
                  </div>
                </div>
                <span className={styles.reviewLink}>
                  <a href={googleReviewsUrl} target="_blank" rel="noreferrer">
                    Google review ↗
                  </a>
                </span>
              </footer>
            </article>
          ))}
        </div>

        <div className="landing-testimonials-progress" aria-hidden="true">
          <span>What they carry</span>
          <i>
            <span />
          </i>
          <span className="landing-testimonials-hint">
            <span className="landing-testimonials-hint--scroll">Scroll to read</span>
            <span className="landing-testimonials-hint--swipe">Swipe to read →</span>
          </span>
        </div>
      </div>
    </section>
  );
}
