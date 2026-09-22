"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      const trackElement = track.current;
      const progressElement = progress.current;
      if (!section || !trackElement || !progressElement) return;
      const media = gsap.matchMedia();
      media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(progressElement, { scaleX: 0, transformOrigin: "left center" });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "landing-testimonials",
          trigger: section,
          start: "top top",
          end: () => {
            const horizontalDistance =
              trackElement.scrollWidth - window.innerWidth;
            return `+=${Math.max(0, horizontalDistance)}`;
          },
          pin: true,
          scrub: 0.25,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          trackElement,
          {
            x: () => -Math.max(0, trackElement.scrollWidth - section.clientWidth),
            duration: 1,
          },
          0,
        )
        .to(progressElement, { scaleX: 1, duration: 1 }, 0)
        .fromTo(
          ".landing-testimonial-ghost",
          { xPercent: 9 },
          { xPercent: -9, duration: 1 },
          0,
        );

      let disposed = false;
      void document.fonts.ready.then(() => {
        if (!disposed) ScrollTrigger.refresh();
      });

      return () => {
        disposed = true;
      };
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="stories"
      ref={root}
      className="landing-testimonials"
      aria-labelledby="testimonials-title"
    >
      <h2 id="testimonials-title" className="sr-only">
        Client testimonials
      </h2>

      <div className="landing-testimonials-stage">
        <div ref={track} className="landing-testimonials-track">
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
            <span ref={progress} />
          </i>
          <span>Scroll to read</span>
        </div>
      </div>
    </section>
  );
}
