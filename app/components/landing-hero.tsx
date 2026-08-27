"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

const tunnelLines = Array.from({ length: 7 }, (_, index) => (
  <span key={index}>MARKED FOR LIFE</span>
));

export default function LandingHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set(".intro", { autoAlpha: 0, pointerEvents: "none" });
        gsap.set([".hero-title", ".enter-studio", ".hero-peacock"], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      document.body.classList.add("intro-running");

      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          document.body.classList.remove("intro-running");
          gsap.set(".intro", { pointerEvents: "none" });
        },
      });

      // Stretch the full sequence from roughly 3.8s to 6.1s.
      timeline.timeScale(0.62);

      timeline
        .set(".intro", { autoAlpha: 1 })
        .set(".intro-mark span", { yPercent: 115 })
        .set(".tunnel", { scale: 0.18, z: -900, opacity: 0 })
        .set(".tunnel-plane--top", { yPercent: -105 })
        .set(".tunnel-plane--bottom", { yPercent: 105 })
        .set(".tunnel-plane--left", { xPercent: -105 })
        .set(".tunnel-plane--right", { xPercent: 105 })
        .set([".hero-title", ".enter-studio"], {
          opacity: 0,
          y: 28,
        })
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
        .to(".tunnel", {
          scale: 4.2,
          z: 920,
          duration: 1.35,
          ease: "expo.in",
        }, 1.55)
        .to(".tunnel-plane--top .tunnel-text", { yPercent: -18, duration: 1.1 }, 1.58)
        .to(".tunnel-plane--bottom .tunnel-text", { yPercent: 18, duration: 1.1 }, 1.58)
        .to(".tunnel-plane--left .tunnel-text", { xPercent: -16, duration: 1.1 }, 1.58)
        .to(".tunnel-plane--right .tunnel-text", { xPercent: 16, duration: 1.1 }, 1.58)
        .to(".intro", { autoAlpha: 0, duration: 0.16, ease: "none" }, 2.72)
        .to(".hero-peacock", {
          opacity: 1,
          xPercent: 0,
          scale: 1,
          duration: 1.45,
          ease: "power2.out",
        }, 2.7)
        .to(".hero-title", {
          opacity: 1,
          y: 0,
          duration: 0.76,
          ease: "power3.out",
        }, 2.9)
        .to(".enter-studio", {
          opacity: 1,
          y: 0,
          duration: 0.72,
          ease: "power3.out",
        }, 3.06);

      return () => document.body.classList.remove("intro-running");
    },
    { scope: root },
  );

  return (
    <div ref={root} className="landing-shell">
      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-peacock" aria-hidden="true">
          <Image
            src="/redpeacock.png"
            alt=""
            fill
            priority
            sizes="(max-width: 700px) 82vw, 55vw"
          />
        </div>

        <h1 id="hero-title" className="hero-title">
          <span>Spiritual</span>
          <span>Tattoo Studio</span>
        </h1>

        <a className="enter-studio" href="#top" aria-label="Enter Spiritual Tattoo Studio">
          <span>Enter Studio</span>
          <i aria-hidden="true">↗</i>
        </a>
      </section>

      <div className="intro" aria-hidden="true">
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
