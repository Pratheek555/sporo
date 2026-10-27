"use client";

import { useRef } from "react";
import Image from "next/image";
import type { Dictionary } from "../lib/i18n/dictionaries/en";
import { useLocalePath } from "../lib/i18n/locale-context";
import { useVisibleVideo } from "./use-visible-video";
import { useScrollAnimation } from "./use-scroll-animation";

const animateAbout: Parameters<typeof useScrollAnimation>[1] = ({ gsap, section }) => {
  gsap.from(".landing-about-portrait, .landing-about-copy", {
    y: 32, duration: 0.8, stagger: 0.1, ease: "power3.out",
    scrollTrigger: { trigger: section, start: "top 85%", once: true },
    clearProps: "transform",
  });
};

export default function LandingAbout({ t }: { t: Dictionary["about"] }) {
  const root = useRef<HTMLElement>(null);
  const href = useLocalePath();
  useVisibleVideo(root);

  useScrollAnimation(root, animateAbout);

  return (
    <section id="philosophy" ref={root} className="landing-about" aria-labelledby="about-title">
      <div className="landing-about-stage">
        <div className="landing-about-bg" aria-hidden="true">
          <video data-src="/media/landing-ambient.mp4" loop muted playsInline preload="none" poster="/media/nocturne-hero.webp" />
          <div className="landing-about-shade" />
        </div>

        <span className="landing-about-chapter" aria-hidden="true">
          {t.chapter}
        </span>

        <div className="landing-about-layout">
          <figure className="landing-about-portrait">
            <Image
              src="/owner.jpeg"
              alt={t.portraitAlt}
              fill
              sizes="(max-width: 700px) 68vw, 36vw"
            />
            <span className="landing-about-portrait-curtain" aria-hidden="true" />
            <figcaption>
              <span>{t.portraitCaption}</span>
            </figcaption>
          </figure>

          <div className="landing-about-copy">
            <p className="landing-about-kicker">{t.kicker}</p>
            <h2 id="about-title">
              <span><i className="landing-about-copy-line">{t.lines[0]}</i></span>
              <span><i className="landing-about-copy-line">{t.lines[1]}</i></span>
              <span><i className="landing-about-copy-line landing-about-copy-line--red">{t.lines[2]}</i></span>
            </h2>

            {t.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <blockquote className="landing-about-quote">
              {t.quote}
            </blockquote>

            <a className="landing-about-link" href={href("/studio")}>
              <span>{t.link}</span>
              <i aria-hidden="true">↗</i>
            </a>
          </div>
        </div>

        <div className="landing-about-progress" aria-hidden="true">
          <span>01</span>
          <i />
          <span>02</span>
        </div>
      </div>
    </section>
  );
}
