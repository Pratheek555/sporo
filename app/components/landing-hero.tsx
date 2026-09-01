"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";

gsap.registerPlugin(useGSAP);

const tunnelLines = Array.from({ length: 7 }, (_, index) => (
  <span key={index}>MARKED FOR LIFE</span>
));

export default function LandingHero() {
  const root = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        root.current?.querySelector("video")?.pause();
        gsap.set(".intro", { autoAlpha: 0, pointerEvents: "none" });
        gsap.set([
          ".hero-title",
          ".hero-welcome",
          ".enter-studio",
          ".hero-peacock",
          ".hero-film-frame",
          ".hero-tech",
          ".hero-tagline",
          ".hero-stream",
        ], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      document.body.classList.add("intro-running");

      // Keep video decoding out of the heaviest part of the intro. The file is
      // already preloaded and starts just before the hero is revealed.
      const heroVideo = root.current?.querySelector("video");
      heroVideo?.pause();

      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          document.body.classList.remove("intro-running");
          gsap.set(".intro", { pointerEvents: "none" });
        },
      });

      // Give the sequence a deliberate pace without slowing individual eases.
      timeline.timeScale(0.62);

      timeline
        .set(".intro", { autoAlpha: 1 })
        .set(".intro-backdrop", { opacity: 1 })
        .set(".intro-mark span", { yPercent: 115 })
        .set(".tunnel", { scale: 0.18, opacity: 0 })
        .set(".tunnel-plane--top", { yPercent: -105 })
        .set(".tunnel-plane--bottom", { yPercent: 105 })
        .set(".tunnel-plane--left", { xPercent: -105 })
        .set(".tunnel-plane--right", { xPercent: 105 })
        .set([".hero-title", ".hero-welcome", ".enter-studio"], {
          opacity: 0,
          y: 28,
        })
        .set([".hero-tech", ".hero-tagline", ".hero-stream"], {
          opacity: 0,
          y: 12,
        })
        .set(".hero-film-frame", { opacity: 0, scale: 0.96 })
        .set(".hero-peacock", { opacity: 0, xPercent: 8, scale: 1.04 })
        .to(".intro-mark span", {
          yPercent: 0,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
        }, 0.22)
        .to(".intro-mark", { opacity: 0, duration: 0.22 }, 0.88)
        .to(".tunnel", {
          opacity: 1,
          scale: 1,
          z: 0,
          duration: 0.55,
          ease: "power3.out",
        }, 0.9)
        .to(".tunnel-plane--top", { yPercent: 0, duration: 0.55 }, 0.9)
        .to(".tunnel-plane--bottom", { yPercent: 0, duration: 0.55 }, 0.9)
        .to(".tunnel-plane--left", { xPercent: 0, duration: 0.55 }, 0.9)
        .to(".tunnel-plane--right", { xPercent: 0, duration: 0.55 }, 0.9)
        .to(".intro-backdrop", {
          opacity: 0,
          duration: 0.48,
          ease: "power2.inOut",
        }, 1.05)
        // Open the four sides instead of upscaling the entire clipped scene.
        // This keeps each text surface at a stable raster size while the
        // transparent centre reveals the hero continuously underneath.
        .to(".tunnel-plane--top", {
          yPercent: -112,
          duration: 1.25,
          ease: "power3.inOut",
        }, 1.55)
        .to(".tunnel-plane--bottom", {
          yPercent: 112,
          duration: 1.25,
          ease: "power3.inOut",
        }, 1.55)
        .to(".tunnel-plane--left", {
          xPercent: -112,
          duration: 1.25,
          ease: "power3.inOut",
        }, 1.55)
        .to(".tunnel-plane--right", {
          xPercent: 112,
          duration: 1.25,
          ease: "power3.inOut",
        }, 1.55)
        .to(".tunnel-void span", {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        }, 1.62)
        .call(() => {
          heroVideo?.play().catch(() => undefined);
        }, [], 1.75)
        .to(".intro", { autoAlpha: 0, duration: 0.3, ease: "power1.out" }, 2.55)
        .to(".hero-peacock", {
          opacity: 1,
          xPercent: 0,
          scale: 1,
          duration: 1.45,
          ease: "power2.out",
        }, 1.85)
        .to(".hero-film-frame", {
          opacity: 0.42,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        }, 1.9)
        .to([".hero-tech", ".hero-tagline", ".hero-stream"], {
          opacity: 1,
          y: 0,
          duration: 0.62,
          stagger: 0.06,
          ease: "power3.out",
        }, 2.05)
        .to([".hero-welcome", ".hero-title"], {
          opacity: 1,
          y: 0,
          duration: 0.76,
          ease: "power3.out",
        }, 2.1)
        .to(".enter-studio", {
          opacity: 1,
          y: 0,
          duration: 0.72,
          ease: "power3.out",
        }, 2.3);

      gsap.to(".hero-peacock", {
        scale: 1.012,
        duration: 5.5,
        delay: 6.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      return () => document.body.classList.remove("intro-running");
    },
    { scope: root },
  );

  return (
    <div ref={root} className="landing-shell">
      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-film-frame" aria-hidden="true">
          <video loop muted playsInline preload="auto">
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

        <p className="hero-tagline">Where art meets you, comes with you</p>

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

        <a
          className="enter-studio"
          href="/studio"
          aria-label="Enter Spiritual Tattoo Studio"
          onClick={(event) => {
            event.preventDefault();
            router.push("/studio");
          }}
        >
          <span>Enter Studio</span>
          <i aria-hidden="true">↗</i>
        </a>
      </section>

      <div className="intro" aria-hidden="true">
        <div className="intro-backdrop" />

        <div className="intro-mark">
          <span>SPIRITUAL</span>
          <span>TATTOO STUDIO</span>
        </div>

        <div className="tunnel">
          <div className="tunnel-plane tunnel-plane--top">
            <div className="tunnel-text">{tunnelLines}</div>
          </div>
          <div className="tunnel-plane tunnel-plane--right">
            <div className="tunnel-text">{tunnelLines}</div>
          </div>
          <div className="tunnel-plane tunnel-plane--bottom">
            <div className="tunnel-text">{tunnelLines}</div>
          </div>
          <div className="tunnel-plane tunnel-plane--left">
            <div className="tunnel-text">{tunnelLines}</div>
          </div>
          <div className="tunnel-void">
            <span>ENTER</span>
          </div>
        </div>
      </div>
    </div>
  );
}
