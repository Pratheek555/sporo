"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "./site-nav";
import { useVisibleVideo } from "./use-visible-video";

export default function LandingHero() {
  const root = useRef<HTMLDivElement>(null);
  useVisibleVideo(root);

  return (
    <>
      <SiteNav />

      <div ref={root} className="landing-shell">
        <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-film-frame" aria-hidden="true">
          <video data-src="/media/cover_page_video.mp4" loop muted playsInline preload="none" poster="/media/nocturne-hero.webp" />
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

        <div className="hero-stream hero-stream--left" aria-hidden="true">
          STS / 01 / PONDICHERRY / ART / INK / FORM
        </div>
        <div className="hero-stream hero-stream--right" aria-hidden="true">
          MEMORY / RITUAL / BODY / PERMANENCE / 2026
        </div>

        <div className="hero-content">
          <p className="hero-tagline">Changing the way you feel art</p>
          <div className="hero-copy">
            <h2 className="hero-welcome">
              <span>Bienvenue</span>
              <span className="text-red-500">À votre service</span>
            </h2>

            <h1 id="hero-title" className="hero-title">
              <span className="hero-title-seo">Tattoo &amp; Piercing Studio in Pondicherry: </span>
              <span>Spiritual</span>
              <span>Tattoo <span className="text-red-500">Art</span></span>
            </h1>
            <p className="hero-descriptor">
              <span>Tattoo and piercing shop in Pondicherry</span>
              <span className="hero-descriptor-note">Best and most trusted</span>
            </p>
          </div>
          </div>

          <Link
            className="enter-studio"
            href="/studio"
            prefetch={false}
            aria-label="Enter Spiritual Tattoo Studio"
          >
            <svg className="enter-studio-ring" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <path id="enter-studio-ring-path" d="M11,50 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" />
              </defs>
              <text>
                <textPath href="#enter-studio-ring-path" textLength="236" lengthAdjust="spacing">
                  Step inside the archive <tspan>•</tspan> Enter studio <tspan>•</tspan>
                </textPath>
              </text>
            </svg>
            <i aria-hidden="true">↗</i>
          </Link>
          </section>
        </div>
      </>
    );
  }
