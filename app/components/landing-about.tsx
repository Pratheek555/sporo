"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useVisibleVideo } from "./use-visible-video";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function LandingAbout() {
  const root = useRef<HTMLElement>(null);
  useVisibleVideo(root);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from(".landing-about-portrait, .landing-about-copy", {
        y: 32, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        clearProps: "transform",
      });
    });
    return () => media.revert();
  }, { scope: root });

  return (
    <section id="philosophy" ref={root} className="landing-about" aria-labelledby="about-title">
      <div className="landing-about-stage">
        <div className="landing-about-bg" aria-hidden="true">
          <video loop muted playsInline preload="none" poster="/media/nocturne-hero.webp">
            <source src="/work.mp4" type="video/mp4" />
          </video>
          <div className="landing-about-shade" />
        </div>

        <span className="landing-about-chapter" aria-hidden="true">
          ABOUT / 02
        </span>
        <span className="landing-about-ghost" aria-hidden="true">02</span>

        <div className="landing-about-layout">
          <figure className="landing-about-portrait">
            <Image
              src="/owner.jpeg"
              alt="Temporary portrait placeholder for the studio owner"
              fill
              sizes="(max-width: 700px) 68vw, 36vw"
            />
            <span className="landing-about-portrait-curtain" aria-hidden="true" />
            <figcaption>
              <span>Founder / Artist</span>
              <small>Portrait placeholder — 2026</small>
            </figcaption>
          </figure>

          <div className="landing-about-copy">
            <p className="landing-about-kicker">The hands behind the mark</p>
            <h2 id="about-title">
              <span><i className="landing-about-copy-line">Made by hand.</i></span>
              <span><i className="landing-about-copy-line">Shaped around you.</i></span>
              <span><i className="landing-about-copy-line landing-about-copy-line--red">Carried for life.</i></span>
            </h2>

            <p>
              Spiritual Tattoo Studio is a private, appointment-only practice in
              Pondicherry. Every piece begins with a conversation—your history,
              your movement, and the way you occupy the world.
            </p>
            <p>
              We work slowly and deliberately, building original blackwork and
              fine-line compositions around the body instead of placing an image
              on top of it.
            </p>

            <blockquote className="landing-about-quote">
              “The best mark feels discovered, not added.”
            </blockquote>

            <a className="landing-about-link" href="/studio">
              <span>Enter the studio</span>
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
