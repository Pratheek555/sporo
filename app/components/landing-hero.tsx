"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "../lib/i18n/dictionaries/en";
import { useLocalePath } from "../lib/i18n/locale-context";
import { useVisibleVideo } from "./use-visible-video";

export default function LandingHero({ t }: { t: Dictionary["hero"] }) {
  const root = useRef<HTMLDivElement>(null);
  const href = useLocalePath();
  useVisibleVideo(root);

  return (
    <>
      <div ref={root} className="landing-shell">
        <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-film-frame" aria-hidden="true">
          <video data-src="/media/cover_page_video.mp4" loop muted playsInline preload="none" poster="/media/nocturne-hero.webp" />
          <span className="film-index">{t.filmIndex}</span>
          <span className="film-state">{t.filmState}</span>
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
          {t.streamLeft}
        </div>
        <div className="hero-stream hero-stream--right" aria-hidden="true">
          {t.streamRight}
        </div>

        <div className="hero-content">
          <p className="hero-tagline">{t.tagline}</p>
          <div className="hero-copy">
            <h2 className="hero-welcome">
              <span>{t.welcome[0]}</span>
              <span className="text-red-500">{t.welcome[1]}</span>
            </h2>

            <h1 id="hero-title" className="hero-title">
              <span className="hero-title-seo">{t.titleSeo}</span>
              <span>Spiritual</span>
              <span>Tattoo <span className="text-red-500">Art</span></span>
            </h1>
            <h2 className="sr-only">{t.subtitleSeo}</h2>
            <p className="hero-descriptor">
              <span className="hero-descriptor-kicker">{t.descriptorKicker[0]} <i>{t.descriptorKicker[1]}</i> {t.descriptorKicker[2]}</span>
              <span className="hero-descriptor-note">{t.descriptorNote}</span>
            </p>
          </div>
          </div>

          <Link
            className="enter-studio"
            href={href("/studio")}
            prefetch={false}
            aria-label={t.enterLabel}
          >
            <svg className="enter-studio-ring" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <path id="enter-studio-ring-path" d="M11,50 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" />
              </defs>
              <text>
                <textPath href="#enter-studio-ring-path" textLength="236" lengthAdjust="spacing">
                  {t.ring[0]} <tspan>•</tspan> {t.ring[1]} <tspan>•</tspan>
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
