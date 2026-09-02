"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function LandingAbout() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      const backgroundVideo = section?.querySelector("video");
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!section || reducedMotion) {
        backgroundVideo?.pause();
        gsap.set(
          [
            ".landing-about-portrait",
            ".landing-about-copy-line",
            ".landing-about-copy > p",
            ".landing-about-quote",
            ".landing-about-link",
          ],
          { autoAlpha: 1, xPercent: 0, yPercent: 0, scale: 1 },
        );
        gsap.set(".landing-about-portrait-curtain", { scaleX: 0 });
        return;
      }

      const playVideo = () => {
        backgroundVideo?.play().catch(() => undefined);
      };
      const pauseVideo = () => backgroundVideo?.pause();

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          id: "landing-about",
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * (window.innerWidth > 700 ? 1.6 : 1.2)}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: playVideo,
          onEnterBack: playVideo,
          onLeave: pauseVideo,
          onLeaveBack: pauseVideo,
        },
      });

      timeline
        .fromTo(
          ".landing-about-bg video",
          { scale: 1.16 },
          { scale: 1.02, duration: 1.45, ease: "none" },
          0,
        )
        .fromTo(
          ".landing-about-shade",
          { opacity: 0.86 },
          { opacity: 0.66, duration: 1.2, ease: "none" },
          0,
        )
        .fromTo(
          ".landing-about-portrait",
          { autoAlpha: 0, xPercent: -9, yPercent: 7, scale: 0.9 },
          {
            autoAlpha: 1,
            xPercent: 0,
            yPercent: 0,
            scale: 1,
            duration: 0.62,
          },
          0.04,
        )
        .fromTo(
          ".landing-about-portrait-curtain",
          { scaleX: 1 },
          { scaleX: 0, duration: 0.62, ease: "power3.inOut" },
          0.12,
        )
        .from(
          ".landing-about-copy-line",
          {
            autoAlpha: 0,
            yPercent: 120,
            duration: 0.52,
            stagger: 0.075,
          },
          0.16,
        )
        .from(
          ".landing-about-copy > p",
          {
            autoAlpha: 0,
            y: 26,
            duration: 0.46,
            stagger: 0.08,
          },
          0.38,
        )
        .from(
          ".landing-about-quote",
          { autoAlpha: 0, x: 30, duration: 0.45 },
          0.56,
        )
        .from(
          ".landing-about-link",
          { autoAlpha: 0, y: 16, duration: 0.36 },
          0.68,
        )
        .to(
          ".landing-about-portrait img",
          { scale: 1.08, yPercent: -2.5, duration: 0.72, ease: "none" },
          0.72,
        )
        .to(
          ".landing-about-copy",
          { yPercent: -3, duration: 0.65, ease: "none" },
          0.8,
        );

      // The intro temporarily locks body scrolling; refresh once that sequence
      // has released it so the pin distance is measured against the final page.
      const refreshAfterIntro = gsap.delayedCall(6.5, () =>
        ScrollTrigger.refresh(),
      );

      return () => {
        refreshAfterIntro.kill();
        backgroundVideo?.pause();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="landing-about" aria-labelledby="about-title">
      <div className="landing-about-stage">
        <div className="landing-about-bg" aria-hidden="true">
          <video loop muted playsInline preload="metadata" poster="/media/nocturne-hero.webp">
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
