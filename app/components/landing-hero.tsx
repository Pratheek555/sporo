"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useVisibleVideo } from "./use-visible-video";

gsap.registerPlugin(useGSAP);

export default function LandingHero() {
  const root = useRef<HTMLDivElement>(null);
  useVisibleVideo(root);

  useGSAP(() => {
    // CSS owns the first frame; hydration never hides already-painted content.
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".hero-peacock", { x: 12 }, {
        x: 0, duration: 1.1, ease: "power2.out", clearProps: "transform",
      });
    });
    return () => media.revert();
  }, { scope: root });

  return (
    <div ref={root} className="landing-shell">
      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-film-frame" aria-hidden="true">
          <video loop muted playsInline preload="none" poster="/media/nocturne-hero.webp">
            <source src="/work.mp4" type="video/mp4" />
          </video>
          <span className="film-index">STS / VISUAL ARCHIVE / 001</span>
          <span className="film-state">LOOPING</span>
        </div>

        <div className="hero-peacock" aria-hidden="true">
          <Image
            src="/hero-red-art.png"
            alt=""
            fill
            priority
            sizes="(max-width: 700px) 82vw, 55vw"
          />
        </div>

        <div className="hero-tech hero-tech--studio" aria-hidden="true">
          <span>{"{CUSTOM TATTOO"}</span>
          <span>AND ART STUDIO.</span>
          <span>{"APPOINTMENT ONLY}"}</span>
        </div>

        <div className="hero-tech hero-tech--location" aria-hidden="true">
          <span>{"{PONDICHERRY /}"}</span>
          <span>{"{INDIA}"}</span>
        </div>

        <div className="hero-tech hero-tech--signal" aria-hidden="true">
          <span>{"{SIGNAL}"}</span>
          <span>VISUAL / NO SOUND</span>
        </div>

        <p className="hero-tagline">Changing the way you feel art</p>

        <div className="hero-stream hero-stream--left" aria-hidden="true">
          STS / 01 / PONDICHERRY / ART / INK / FORM
        </div>
        <div className="hero-stream hero-stream--right" aria-hidden="true">
          MEMORY / RITUAL / BODY / PERMANENCE / 2026
        </div>

        <div className="hero-copy">
          <h2 className="hero-welcome">
            <span>Bienvenue</span>
            <span className="text-red-500">À votre service</span>
          </h2>

          <h1 id="hero-title" className="hero-title">
            <span>Spiritual</span>
            <span>Tattoo <span className="text-red-500">Art</span></span>
          </h1>
        </div>

        <Link
          className="enter-studio"
          href="/studio"
          aria-label="Enter Spiritual Tattoo Studio"

        >
          <span>Enter Studio</span>
          <i aria-hidden="true">↗</i>
        </Link>
      </section>

    </div>
  );
}
