"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ScrollExperienceProps = {
  children: React.ReactNode;
};

export default function ScrollExperience({ children }: ScrollExperienceProps) {
  const root = useRef<HTMLDivElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const mobileMenu = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);

    const pageRegions = root.current?.querySelectorAll<HTMLElement>(
      ":scope > main, :scope > footer",
    );
    pageRegions?.forEach((region) => {
      region.inert = menuOpen;
    });

    if (!menuOpen) {
      return () => {
        document.body.classList.remove("menu-open");
        pageRegions?.forEach((region) => {
          region.inert = false;
        });
      };
    }

    const focusable = [
      menuToggle.current,
      ...(mobileMenu.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []),
    ].filter(
      (element): element is HTMLButtonElement | HTMLAnchorElement =>
        element !== null,
    );

    window.requestAnimationFrame(() => focusable[1]?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        window.requestAnimationFrame(() => menuToggle.current?.focus());
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("menu-open");
      pageRegions?.forEach((region) => {
        region.inert = false;
      });
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 821px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    desktop.addEventListener("change", closeAtDesktop);
    return () => desktop.removeEventListener("change", closeAtDesktop);
  }, []);

  useGSAP(
    (_, contextSafe) => {
      if (!root.current) return;

      const select = gsap.utils.selector(root);
      const makeContextSafe = contextSafe!;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(select(".page-loader"), { display: "none" });
        gsap.set(
          select(
            ".site-header, .header-mark, .hero-wordmark, .hero-primary-copy, .hero-secondary-copy, .hero-full-image, .work-card, .service-row, .ritual-object, .ritual-copy, .ritual-note, .testimonial-card, .manifesto-word",
          ),
          { autoAlpha: 1, x: 0, y: 0, scale: 1, rotation: 0 },
        );
      } else {
        const intro = gsap.timeline({
          defaults: { ease: "power3.inOut" },
        });

        intro
          .to(".loader-progress", { scaleX: 1, duration: 0.65 })
          .to(
            ".loader-count",
            { yPercent: -110, autoAlpha: 0, duration: 0.35 },
            "-=0.18",
          )
          .to(
            ".page-loader",
            { yPercent: -100, duration: 0.85, ease: "power4.inOut" },
            "-=0.05",
          )
          .from(
            ".hero-wordmark",
            { y: 90, autoAlpha: 0, duration: 0.9 },
            "-=0.4",
          )
          .from(
            ".hero-heading-word",
            {
              yPercent: 105,
              autoAlpha: 0,
              stagger: 0.045,
              duration: 0.65,
            },
            "-=0.72",
          );
      }

      const progressElement = select(".scroll-progress")[0] as HTMLElement;
      if (progressElement) {
        const setProgress = gsap.quickSetter(progressElement, "scaleX");
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => setProgress(self.progress),
        });
      }

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 821px)",
          mobile: "(max-width: 820px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions as {
            desktop: boolean;
            mobile: boolean;
            reduceMotion: boolean;
          };

          if (reduceMotion) return;

          const tiles = select(".hero-tile") as HTMLElement[];
          gsap.set(tiles, {
            x: (_, element: HTMLElement) =>
              Number(element.dataset.scatterX || 0) * (desktop ? 1 : 0.55),
            y: (_, element: HTMLElement) =>
              Number(element.dataset.scatterY || 0) * (desktop ? 1 : 0.55),
            rotation: (_, element: HTMLElement) =>
              Number(element.dataset.scatterR || 0),
            scale: desktop ? 0.62 : 0.78,
            autoAlpha: 0,
          });

          const hero = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ".hero-scroll",
              start: "top top",
              end: "bottom bottom",
              pin: ".hero-stage",
              pinSpacing: false,
              scrub: desktop ? 1.05 : 0.55,
              invalidateOnRefresh: true,
            },
          });

          hero
            .addLabel("compress", 0)
            .to(
              ".hero-wordmark",
              {
                scale: desktop ? 0.12 : 0.22,
                y: desktop ? -8 : -2,
                transformOrigin: "left top",
                duration: 0.9,
              },
              "compress",
            )
            .to(
              ".hero-primary-copy",
              { y: desktop ? -220 : -110, autoAlpha: 0, duration: 0.58 },
              "compress",
            )
            .to(
              ".hero-secondary-copy",
              { y: -70, autoAlpha: 0, duration: 0.45 },
              "compress",
            )
            .to(
              ".hero-scroll-cue",
              { y: -24, autoAlpha: 0, duration: 0.22 },
              "compress",
            )
            .to(".site-header", { autoAlpha: 1, duration: 0.3 }, 0.16)
            .to(".hero-mosaic", { autoAlpha: 1, duration: 0.18 }, 0.42)
            .to(
              tiles,
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                autoAlpha: 1,
                stagger: { amount: 0.55, from: "random" },
                duration: 0.92,
              },
              0.45,
            )
            .to(
              ".hero-full-image",
              { autoAlpha: 1, duration: 0.25 },
              1.22,
            )
            .to(tiles, { autoAlpha: 0, duration: 0.2 }, 1.24)
            .to(
              ".hero-image-caption",
              { autoAlpha: 1, y: 0, duration: 0.35 },
              1.28,
            )
            .to(
              ".hero-mosaic",
              { scale: desktop ? 1.34 : 1.18, duration: 0.86 },
              1.32,
            )
            .to(
              ".hero-image-shade",
              { autoAlpha: 0.42, duration: 0.6 },
              1.52,
            )
            .to(
              ".hero-mosaic",
              { scale: 1.62, autoAlpha: 0, duration: 0.72 },
              2.15,
            )
            .fromTo(
              ".hero-glyph",
              { autoAlpha: 0, scale: 0.2, rotation: -18 },
              {
                autoAlpha: 1,
                scale: 1,
                rotation: 0,
                duration: 0.58,
                immediateRender: false,
              },
              2.36,
            )
            .to(".hero-wordmark", { autoAlpha: 0, duration: 0.24 }, 2.88)
            .to(".header-mark", { autoAlpha: 1, duration: 0.24 }, 2.88)
            .to(
              ".hero-glyph",
              { scale: 0.18, y: -130, autoAlpha: 0, duration: 0.55 },
              3.05,
            )
            .fromTo(
              ".hero-exit-label",
              { autoAlpha: 0, y: 56 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                immediateRender: false,
              },
              3.12,
            );

          (select(".work-card") as HTMLElement[]).forEach((card, index) => {
            gsap.from(card, {
              y: desktop ? 120 : 56,
              autoAlpha: 0,
              duration: 1,
              ease: "power3.out",
              delay: (index % 2) * 0.08,
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            });

            const art = card.querySelector(".work-art");
            if (art) {
              gsap.fromTo(
                art,
                { yPercent: -7, scale: 1.08 },
                {
                  yPercent: 7,
                  scale: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.6,
                  },
                },
              );
            }
          });

          gsap.from(".studio-statement-line", {
            yPercent: 105,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".studio-statement",
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });

          gsap.to(".trust-rail-track", {
            xPercent: -50,
            duration: 22,
            ease: "none",
            repeat: -1,
          });

          (select(".service-row") as HTMLElement[]).forEach((row) => {
            gsap.from(row, {
              x: desktop ? 80 : 28,
              autoAlpha: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            });
          });

          const ritual = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ".ritual-scroll",
              start: "top top",
              end: "bottom bottom",
              pin: ".ritual-stage",
              pinSpacing: false,
              scrub: desktop ? 1.1 : 0.6,
              invalidateOnRefresh: true,
            },
          });

          ritual
            .fromTo(
              ".ritual-object-mono",
              { autoAlpha: 0, scale: 0.48, rotation: -8 },
              {
                autoAlpha: 1,
                scale: desktop ? 0.84 : 0.72,
                rotation: 0,
                duration: 0.7,
                immediateRender: false,
              },
              0,
            )
            .fromTo(
              ".ritual-copy",
              { autoAlpha: 0, y: 48 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.4,
                immediateRender: false,
              },
              0.18,
            )
            .to(
              ".ritual-object-mono",
              { scale: desktop ? 1.05 : 0.9, xPercent: 9, rotation: 5, duration: 0.9 },
              0.62,
            )
            .to(
              ".ritual-stage",
              { backgroundColor: "#38262a", duration: 0.72 },
              0.74,
            )
            .to(".ritual-object-color", { autoAlpha: 1, duration: 0.62 }, 0.78)
            .to(".ritual-object-mono", { autoAlpha: 0, duration: 0.5 }, 0.82)
            .to(
              ".ritual-copy",
              { autoAlpha: 0.2, x: desktop ? -140 : -40, duration: 0.5 },
              0.88,
            )
            .fromTo(
              ".ritual-note",
              { autoAlpha: 0, y: 30 },
              {
                autoAlpha: 1,
                y: 0,
                stagger: 0.12,
                duration: 0.5,
                immediateRender: false,
              },
              1.02,
            )
            .to(
              ".ritual-object",
              {
                yPercent: -62,
                scale: desktop ? 1.34 : 1.08,
                rotation: -7,
                duration: 0.78,
              },
              1.76,
            )
            .to(".ritual-notes", { autoAlpha: 0, duration: 0.3 }, 1.9)
            .to(".ritual-copy", { autoAlpha: 0, duration: 0.28 }, 1.9)
            .fromTo(
              ".ritual-outro-line",
              { yPercent: 100, autoAlpha: 0 },
              {
                yPercent: 0,
                autoAlpha: 1,
                stagger: 0.08,
                duration: 0.52,
                immediateRender: false,
              },
              1.94,
            );

          if (desktop) {
            const testimonialTrack = select(
              ".testimonial-track",
            )[0] as HTMLElement;
            const testimonialStage = select(
              ".testimonial-stage",
            )[0] as HTMLElement;

            if (testimonialTrack && testimonialStage) {
              const testimonials = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                  trigger: ".testimonials-scroll",
                  start: "top top",
                  end: "bottom bottom",
                  pin: testimonialStage,
                  pinSpacing: false,
                  scrub: 0.85,
                  invalidateOnRefresh: true,
                },
              });

              testimonials
                .fromTo(
                  ".testimonial-card",
                  { y: 110, autoAlpha: 0.28 },
                  {
                    y: 0,
                    autoAlpha: 1,
                    stagger: 0.06,
                    duration: 0.25,
                    immediateRender: false,
                  },
                  0,
                )
                .to(
                  testimonialTrack,
                  {
                    x: () =>
                      -Math.max(
                        0,
                        testimonialTrack.scrollWidth - window.innerWidth + 90,
                      ),
                    duration: 1,
                  },
                  0,
                );
            }
          } else {
            gsap.from(".testimonial-card", {
              y: 56,
              autoAlpha: 0,
              stagger: 0.12,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".testimonial-track",
                start: "top 84%",
                toggleActions: "play none none reverse",
              },
            });
          }

          gsap.to(".manifesto-word", {
            color: "#f4eee7",
            stagger: 0.035,
            ease: "none",
            scrollTrigger: {
              trigger: ".manifesto-copy",
              start: "top 74%",
              end: "bottom 38%",
              scrub: 0.65,
            },
          });

          gsap.from(".journal-panel", {
            y: 90,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".journal-strip",
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        },
      );

      const cursor = select(".cursor-dot")[0] as HTMLElement;
      let handlePointerMove: ((event: PointerEvent) => void) | undefined;
      let handlePointerLeave: (() => void) | undefined;

      if (cursor && window.matchMedia("(pointer: fine)").matches) {
        const xTo = gsap.quickTo(cursor, "x", {
          duration: 0.32,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(cursor, "y", {
          duration: 0.32,
          ease: "power3.out",
        });

        handlePointerMove = makeContextSafe((event: PointerEvent) => {
          xTo(event.clientX);
          yTo(event.clientY);
          gsap.to(cursor, { autoAlpha: 1, duration: 0.16, overwrite: true });
        });
        handlePointerLeave = makeContextSafe(() => {
          gsap.to(cursor, { autoAlpha: 0, duration: 0.2, overwrite: true });
        });

        window.addEventListener("pointermove", handlePointerMove);
        document.documentElement.addEventListener(
          "pointerleave",
          handlePointerLeave,
        );
      }

      let isMounted = true;
      const refresh = makeContextSafe(() => ScrollTrigger.refresh());
      document.fonts.ready.then(() => {
        if (isMounted) refresh();
      });

      return () => {
        isMounted = false;
        media.revert();
        if (handlePointerMove) {
          window.removeEventListener("pointermove", handlePointerMove);
        }
        if (handlePointerLeave) {
          document.documentElement.removeEventListener(
            "pointerleave",
            handlePointerLeave,
          );
        }
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="experience-root">
      <div className="page-loader" aria-hidden="true">
        <div className="loader-count">N/01</div>
        <div className="loader-rule">
          <span className="loader-progress" />
        </div>
      </div>

      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-dot" aria-hidden="true">
        <span>VIEW</span>
      </div>

      <header className="site-header">
        <a
          className="header-mark"
          href="#top"
          aria-label="Nocturne home"
          onClick={() => setMenuOpen(false)}
        >
          NØCTURNE
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#work">[ WORK ]</a>
          <a href="#studio">[ STUDIO ]</a>
          <a href="#process">[ PROCESS ]</a>
          <a href="#booking">[ BOOK ]</a>
        </nav>
        <button
          ref={menuToggle}
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          [{menuOpen ? "CLOSE" : "MENU"}]
        </button>
      </header>

      <div
        ref={mobileMenu}
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>
            Work <span>01</span>
          </a>
          <a href="#studio" onClick={() => setMenuOpen(false)}>
            Studio <span>02</span>
          </a>
          <a href="#process" onClick={() => setMenuOpen(false)}>
            Process <span>03</span>
          </a>
          <a href="#booking" onClick={() => setMenuOpen(false)}>
            Book <span>04</span>
          </a>
        </nav>
      </div>

      {children}
    </div>
  );
}
