"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useVisibleVideo } from "./use-visible-video";

export default function LandingHero() {
  const root = useRef<HTMLDivElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  useVisibleVideo(root);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <header className={`landing-nav${navOpen ? " is-open" : ""}`}>
        <a className="landing-nav-brand" href="#top" aria-label="Spiritual Tattoo Art home">
          <span className="landing-nav-monogram" aria-hidden="true">S</span>
          <span className="landing-nav-wordmark">
            <strong>Spiritual</strong>
            <small>Tattoo Art / Pondicherry</small>
          </span>
        </a>

        <span className="landing-nav-edition" aria-hidden="true">
          Private studio<br />Est. 2018
        </span>

        <nav className="landing-nav-links" aria-label="Primary navigation">
          <a href="#philosophy" onClick={() => setNavOpen(false)}>
            <small>01</small><span>Philosophy</span>
          </a>
          <a href="#stories" onClick={() => setNavOpen(false)}>
            <small>02</small><span>Stories</span>
          </a>
          <a href="#visit" onClick={() => setNavOpen(false)}>
            <small>03</small><span>Visit</span>
          </a>
          <Link href="/contact"><small>04</small><span>Contact</span></Link>
        </nav>

        <Link className="landing-nav-cta" href="/studio" prefetch={false}>
          <span>Enter studio</span><i aria-hidden="true">↗</i>
        </Link>

        <button
          className="landing-nav-toggle"
          type="button"
          aria-expanded={navOpen}
          aria-controls="landing-mobile-nav"
          onClick={() => setNavOpen((open) => !open)}
        >
          <span>{navOpen ? "Close" : "Menu"}</span>
          <i aria-hidden="true"><b /><b /></i>
        </button>

        <div
          id="landing-mobile-nav"
          className="landing-mobile-nav"
          aria-hidden={!navOpen}
          inert={!navOpen}
        >
          <nav aria-label="Mobile navigation">
            <a href="#philosophy" onClick={() => setNavOpen(false)}>
              <small>01 /</small><span>Philosophy</span><i aria-hidden="true">↘</i>
            </a>
            <a href="#stories" onClick={() => setNavOpen(false)}>
              <small>02 /</small><span>Stories</span><i aria-hidden="true">↘</i>
            </a>
            <a href="#visit" onClick={() => setNavOpen(false)}>
              <small>03 /</small><span>Visit</span><i aria-hidden="true">↘</i>
            </a>
            <Link href="/studio" prefetch={false} onClick={() => setNavOpen(false)}>
              <small>04 /</small><span>Enter studio</span><i aria-hidden="true">↗</i>
            </Link>
            <Link href="/contact" onClick={() => setNavOpen(false)}>
              <small>05 /</small><span>Contact us</span><i aria-hidden="true">↗</i>
            </Link>
          </nav>
          <p>Custom work / Appointment only</p>
        </div>
      </header>

      <div ref={root} className="landing-shell">
        <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-film-frame" aria-hidden="true">
          <video data-src="/media/landing-ambient.mp4" loop muted playsInline preload="none" poster="/media/nocturne-hero.webp" />
          <span className="film-index">STS / VISUAL ARCHIVE / 001</span>
          <span className="film-state">LOOPING</span>
        </div>

        <div className="hero-peacock" aria-hidden="true">
          <Image
            src="/media/hero-red-art.webp"
            alt=""
            fill
            preload
            unoptimized
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
          prefetch={false}
          aria-label="Enter Spiritual Tattoo Studio"

        >
          <span>Enter Studio</span>
          <i aria-hidden="true">↗</i>
        </Link>
        </section>
      </div>
    </>
  );
}
