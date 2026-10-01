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
] as const;

export default function LandingTestimonials() {
  return (
    <section
      id="stories"
      className="landing-testimonials"
      aria-labelledby="testimonials-title"
    >
      <h2 id="testimonials-title" className="sr-only">
        Client testimonials
      </h2>

      <div className="landing-testimonials-stage">
        <div className="landing-testimonials-track">
          {testimonials.map((testimonial) => (
            <article
              className={`landing-testimonial-panel landing-testimonial-panel--${testimonial.theme}`}
              key={testimonial.number}
            >
              <span className="landing-testimonial-chapter">
                TESTIMONIALS / 03
              </span>
              <span className="landing-testimonial-ghost" aria-hidden="true">
                {testimonial.number}
              </span>

              <div className="landing-testimonial-copy">
                <span className="landing-testimonial-mark" aria-hidden="true">
                  “
                </span>
                <blockquote>
                  <p>{testimonial.quote}</p>
                </blockquote>
              </div>

              <footer className="landing-testimonial-meta">
                <span>{testimonial.number} / 03</span>
                <span>{testimonial.author}</span>
                <span>
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
          <span>Scroll to read</span>
        </div>
      </div>
    </section>
  );
}
