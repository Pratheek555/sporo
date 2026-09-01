"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

const artPages = [
  {
    number: "01",
    title: "THE FIRST LINE",
    note: "A mark begins as a conversation between memory, anatomy and intent.",
    src: "/media/nocturne-hero.webp",
    alt: "A tattoo artist drawing a botanical blackwork tattoo",
    className: "studio-book-art--photo",
  },
  {
    number: "02",
    title: "BODY / FORM",
    note: "Each composition is drawn to move with the body that carries it.",
    src: "/media/nocturne-work-grid.webp",
    alt: "A collection of blackwork and fine-line tattoo studies",
    className: "studio-book-art--grid",
  },
  {
    number: "03",
    title: "INK / MATTER",
    note: "Texture, weight and negative space turn an image into a living object.",
    src: "/media/nocturne-ink-object.webp",
    alt: "A sculptural black ink form",
    className: "studio-book-art--object",
  },
  {
    number: "04",
    title: "CARRIED ALWAYS",
    note: "The final work leaves the studio and becomes part of your own mythology.",
    src: "/redpeacock.png",
    alt: "An ornate red peacock illustration",
    className: "studio-book-art--peacock",
  },
];

const cursorTrailDots = Array.from({ length: 20 }, (_, index) => (
  <span key={index} aria-hidden="true" />
));

export default function StudioExperience() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const page = useRef(0);
  const coverReady = useRef(false);
  const opening = useRef(false);
  const opened = useRef(false);
  const turning = useRef(false);
  const reducedMotion = useRef(false);

  const { contextSafe } = useGSAP(
    () => {
      reducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set(".studio-book-shell", { autoAlpha: 0, scale: 0.84, y: 34 });
      gsap.set(".studio-book", { xPercent: -25, rotationX: 2 });
      gsap.set(".studio-book-left", { scaleX: 0, transformOrigin: "right center" });
      gsap.set(".studio-book-cover", {
        rotationY: 0,
        transformOrigin: "left center",
      });
      gsap.set(".studio-book-art", { autoAlpha: 0, scale: 1.04 });
      gsap.set('.studio-book-art[data-art="0"]', { autoAlpha: 1 });
      gsap.set(".studio-book-turn", { autoAlpha: 0, rotationY: 0 });
      gsap.set(".studio-book-caption > *", { autoAlpha: 0, y: 18 });
      gsap.set(".studio-cursor-light", {
        opacity: 0,
        visibility: "visible",
        xPercent: -50,
        yPercent: -50,
      });
      gsap.set(".studio-cursor-trail", {
        opacity: 0,
        visibility: "visible",
      });
      gsap.set(".studio-cursor-trail span", {
        xPercent: -50,
        yPercent: -50,
      });

      if (reducedMotion.current) {
        if (count.current) count.current.textContent = "100";
        gsap.set(".studio-loader-progress", { scaleX: 1 });
        gsap.set(".studio-loader", { display: "none" });
        gsap.set(".studio-book-shell", { autoAlpha: 1, scale: 1, y: 0 });
        coverReady.current = true;
        return;
      }

      const counter = { value: 0 };
      const loader = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      loader
        .set(".studio-loader-word span", { yPercent: 118 })
        .set(".studio-loader-action", { autoAlpha: 0, y: 18 })
        .to(".studio-loader-word span", {
          yPercent: 0,
          duration: 0.72,
          stagger: 0.055,
          ease: "power4.out",
        })
        .to(
          counter,
          {
            value: 100,
            duration: 1.75,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count.current) {
                count.current.textContent = Math.round(counter.value)
                  .toString()
                  .padStart(3, "0");
              }
            },
          },
          0.18,
        )
        .to(
          ".studio-loader-progress",
          { scaleX: 1, duration: 1.75, ease: "power2.inOut" },
          0.18,
        )
        .to(".studio-loader-word", {
          letterSpacing: "0.16em",
          duration: 0.58,
        })
        .to(
          ".studio-loader-action",
          { autoAlpha: 1, y: 0, duration: 0.52, ease: "power3.out" },
          "-=0.18",
        )
        .to(
          ".studio-loader-action",
          { autoAlpha: 0, y: -12, duration: 0.3 },
          "+=0.38",
        )
        .to(
          ".studio-loader-word",
          { scale: 1.08, autoAlpha: 0, duration: 0.44 },
          "<",
        )
        .to(".studio-loader-panel--left", { xPercent: -101, duration: 0.9 }, "<0.18")
        .to(".studio-loader-panel--right", { xPercent: 101, duration: 0.9 }, "<")
        .to(".studio-loader-meta", { autoAlpha: 0, duration: 0.24 }, "<")
        .set(".studio-loader", { display: "none" })
        .to(
          ".studio-book-shell",
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.84, ease: "power3.out" },
          "-=0.48",
        )
        .fromTo(
          ".studio-book-cover-face > *",
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.56,
            stagger: 0.06,
            ease: "power3.out",
            immediateRender: false,
          },
          "-=0.28",
        )
        .add(() => {
          coverReady.current = true;
        });

      const stage = root.current?.querySelector<HTMLElement>(
        ".studio-book-stage",
      );
      const book = root.current?.querySelector<HTMLElement>(".studio-book");
      const cursorLight = root.current?.querySelector<HTMLElement>(
        ".studio-cursor-light",
      );
      const cursorTrail = root.current?.querySelector<HTMLElement>(
        ".studio-cursor-trail",
      );
      const trailDots = Array.from(
        root.current?.querySelectorAll<HTMLElement>(
          ".studio-cursor-trail span",
        ) ?? [],
      );
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

      if (!stage || !book || !cursorLight || !cursorTrail || !hasFinePointer) return;

      const moveBookX = gsap.quickTo(book, "x", {
        duration: 0.72,
        ease: "power3.out",
      });
      const moveBookY = gsap.quickTo(book, "y", {
        duration: 0.72,
        ease: "power3.out",
      });
      const tiltBookX = gsap.quickTo(book, "rotationX", {
        duration: 0.72,
        ease: "power3.out",
      });
      const tiltBookY = gsap.quickTo(book, "rotationY", {
        duration: 0.72,
        ease: "power3.out",
      });
      const moveLightX = gsap.quickTo(cursorLight, "x", {
        duration: 0.24,
        ease: "power2.out",
      });
      const moveLightY = gsap.quickTo(cursorLight, "y", {
        duration: 0.24,
        ease: "power2.out",
      });
      const showLight = gsap.quickTo(cursorLight, "opacity", {
        duration: 0.28,
        ease: "power2.out",
      });
      const moveTrailX = trailDots.map((dot, index) =>
        gsap.quickTo(dot, "x", {
          duration: 0.3 + index * 0.075,
          ease: "power2.out",
        }),
      );
      const moveTrailY = trailDots.map((dot, index) =>
        gsap.quickTo(dot, "y", {
          duration: 0.3 + index * 0.075,
          ease: "power2.out",
        }),
      );
      const trailPositions = trailDots.map(() => ({ x: 0, y: 0 }));
      const trailHistory: Array<{ x: number; y: number }> = [];
      const trailSampleSpacing = 2;
      let trailHasPosition = false;
      const showTrail = gsap.quickTo(cursorTrail, "opacity", {
        duration: 0.32,
        ease: "power2.out",
      });

      const resetPointerScene = () => {
        showLight(0);
        showTrail(0);
        trailHistory.length = 0;
        trailHasPosition = false;
        moveBookX(0);
        moveBookY(0);
        tiltBookX(0);
        tiltBookY(0);
      };

      const handlePointerMove = (event: PointerEvent) => {
        if (!opened.current || turning.current) return;

        const bounds = stage.getBoundingClientRect();
        const localX = event.clientX - bounds.left;
        const localY = event.clientY - bounds.top;
        const normalizedX = Math.max(-1, Math.min(1, localX / bounds.width * 2 - 1));
        const normalizedY = Math.max(-1, Math.min(1, localY / bounds.height * 2 - 1));

        moveLightX(localX);
        moveLightY(localY);
        showLight(1);
        trailHistory.unshift({ x: localX, y: localY });
        if (trailHistory.length > 48) trailHistory.length = 48;
        if (!trailHasPosition) {
          trailPositions.forEach((position) => {
            position.x = localX;
            position.y = localY;
          });
          trailHasPosition = true;
        } else {
          trailPositions.forEach((position, index) => {
            const historyIndex = Math.min(
              (index + 1) * trailSampleSpacing,
              trailHistory.length - 1,
            );
            const historyPosition = trailHistory[historyIndex] ?? trailHistory[0];
            position.x = historyPosition.x;
            position.y = historyPosition.y;
          });
        }
        trailPositions.forEach((position, index) => {
          moveTrailX[index](position.x);
          moveTrailY[index](position.y);
        });
        showTrail(1);
        moveBookX(normalizedX * 9);
        moveBookY(normalizedY * 6);
        tiltBookX(normalizedY * -2.8);
        tiltBookY(normalizedX * 4.2);
      };

      stage.addEventListener("pointermove", handlePointerMove, { passive: true });
      stage.addEventListener("pointerleave", resetPointerScene);

      return () => {
        stage.removeEventListener("pointermove", handlePointerMove);
        stage.removeEventListener("pointerleave", resetPointerScene);
      };
    },
    { scope: root },
  );

  const updatePageCopy = (index: number) => {
    const number = root.current?.querySelector<HTMLElement>(
      ".studio-step-current",
    );
    const label = root.current?.querySelector<HTMLElement>(
      ".studio-step-label",
    );
    const bookNumber = root.current?.querySelector<HTMLElement>(
      ".studio-book-page-number",
    );
    const title = root.current?.querySelector<HTMLElement>(
      ".studio-book-page-title",
    );
    const note = root.current?.querySelector<HTMLElement>(
      ".studio-book-page-note",
    );

    if (number) number.textContent = artPages[index].number;
    if (label) label.textContent = artPages[index].title;
    if (bookNumber) bookNumber.textContent = `PLATE / ${artPages[index].number}`;
    if (title) title.textContent = artPages[index].title;
    if (note) note.textContent = artPages[index].note;
  };

  const updateFooterInstruction = (instruction: string) => {
    const footerInstruction = root.current?.querySelector<HTMLElement>(
      ".studio-footer-instruction",
    );
    if (footerInstruction) footerInstruction.textContent = instruction;
  };

  const begin = () => {
    contextSafe(() => {
      if (!coverReady.current || opening.current || opened.current) return;

      opening.current = true;

      if (reducedMotion.current) {
        opened.current = true;
        opening.current = false;
        gsap.set(".studio-book", { xPercent: 0, rotationX: 0 });
        gsap.set(".studio-book-left", { scaleX: 1 });
        gsap.set(".studio-book-cover", { rotationY: -180, zIndex: 1 });
        gsap.set('.studio-book-art[data-art="0"]', { autoAlpha: 1, scale: 1 });
        gsap.set(".studio-book-caption > *", { autoAlpha: 1, y: 0 });
        updateFooterInstruction("CLICK LEFT / PREVIOUS · CLICK RIGHT / NEXT");
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => {
          opened.current = true;
          opening.current = false;
        },
      });

      timeline
        .addLabel("openCover", 0)
        .to(".studio-cover-prompt", { autoAlpha: 0, y: -8, duration: 0.28 }, "openCover")
        .to(
          ".studio-book",
          { xPercent: 0, rotationX: 0, duration: 1.28, ease: "power4.inOut" },
          "openCover",
        )
        .to(".studio-book-left", { scaleX: 1, duration: 1.22 }, "openCover")
        .to(
          ".studio-book-cover",
          { rotationY: -180, duration: 1.22, ease: "power3.inOut" },
          "openCover",
        )
        .set(".studio-book-cover", { zIndex: 1 })
        .to(
          '.studio-book-art[data-art="0"]',
          { scale: 1, duration: 0.82, ease: "power3.out" },
          0.42,
        )
        .add(
          () => updateFooterInstruction("CLICK LEFT / PREVIOUS · CLICK RIGHT / NEXT"),
          0.64,
        )
        .to(
          ".studio-book-caption > *",
          { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.5, ease: "power3.out" },
          0.82,
        );
    })();
  };

  const turnPage = (event: React.MouseEvent<HTMLElement>) => {
    contextSafe(() => {
      if (!opened.current || turning.current) return;
      if ((event.target as HTMLElement).closest("a, button")) return;

      const book = root.current?.querySelector<HTMLElement>(".studio-book");
      const turn = root.current?.querySelector<HTMLElement>(".studio-book-turn");
      if (!book || !turn) return;

      const bounds = book.getBoundingClientRect();
      const clickedInsideBook =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      if (!clickedInsideBook) return;

      const current = page.current;
      const direction =
        event.clientX < bounds.left + bounds.width / 2 ? "backward" : "forward";
      const next = direction === "forward" ? current + 1 : current - 1;

      if (next < 0 || next >= artPages.length) return;

      turning.current = true;

      if (reducedMotion.current) {
        gsap.set(`.studio-book-art[data-art="${current}"]`, { autoAlpha: 0 });
        gsap.set(`.studio-book-art[data-art="${next}"]`, { autoAlpha: 1, scale: 1 });
        page.current = next;
        updatePageCopy(next);
        turning.current = false;
        return;
      }

      const frontKind = direction === "forward" ? "art" : "note";
      const backKind = direction === "forward" ? "note" : "art";
      const frontLayer = root.current?.querySelector<HTMLElement>(
        `[data-turn-face="front"][data-turn-kind="${frontKind}"][data-turn-index="${current}"]`,
      );
      const backLayer = root.current?.querySelector<HTMLElement>(
        `[data-turn-face="back"][data-turn-kind="${backKind}"][data-turn-index="${next}"]`,
      );

      if (!frontLayer || !backLayer) {
        turning.current = false;
        return;
      }

      turn.classList.toggle("studio-book-turn--backward", direction === "backward");

      gsap.set(".studio-book-turn-layer", { autoAlpha: 0 });
      gsap.set([frontLayer, backLayer], { autoAlpha: 1 });
      gsap.set(".studio-book-turn-front", { autoAlpha: 1 });
      gsap.set(".studio-book-turn-back", { autoAlpha: 0 });
      gsap.set(".studio-book-turn", {
        autoAlpha: 1,
        rotationY: 0,
        z: 0,
        zIndex: 28,
      });

      if (direction === "forward") {
        gsap.set(`.studio-book-art[data-art="${current}"]`, { autoAlpha: 0 });
        gsap.set(`.studio-book-art[data-art="${next}"]`, {
          autoAlpha: 1,
          scale: 1.025,
        });
      }

      const timeline = gsap.timeline({
        defaults: { ease: "sine.inOut" },
        onComplete: () => {
          page.current = next;
          turning.current = false;
        },
      });

      const turnDuration = 1.68;
      const turnMidpoint = turnDuration / 2;

      timeline
        .to(
          ".studio-book-turn",
          {
            rotationY: direction === "forward" ? -180 : 180,
            duration: turnDuration,
            ease: "sine.inOut",
          },
          0,
        )
        .to(
          ".studio-book-turn",
          { z: 24, duration: turnMidpoint, ease: "sine.out" },
          0,
        )
        .to(
          ".studio-book-turn",
          { z: 0, duration: turnMidpoint, ease: "sine.in" },
          turnMidpoint,
        )
        .to(
          ".studio-book-shadow",
          { opacity: 0.72, duration: turnMidpoint, ease: "sine.out" },
          0,
        )
        .set(".studio-book-turn-front", { autoAlpha: 0 }, turnMidpoint)
        .set(".studio-book-turn-back", { autoAlpha: 1 }, turnMidpoint)
        .add(() => {
          if (direction === "backward") {
            gsap.set(`.studio-book-art[data-art="${current}"]`, { autoAlpha: 0 });
            gsap.set(`.studio-book-art[data-art="${next}"]`, {
              autoAlpha: 1,
              scale: 1.025,
            });
          }
          updatePageCopy(next);
        }, turnMidpoint)
        .to(
          `.studio-book-art[data-art="${next}"]`,
          { scale: 1, duration: 0.78, ease: "sine.out" },
          turnMidpoint,
        )
        .to(
          ".studio-book-shadow",
          { opacity: 0.28, duration: turnMidpoint, ease: "sine.in" },
          turnMidpoint,
        )
        .to(
          ".studio-progress-fill",
          {
            scaleX: (next + 1) / artPages.length,
            duration: 1.08,
            ease: "sine.inOut",
          },
          0.3,
        )
        .set(".studio-book-turn", {
          autoAlpha: 0,
          rotationY: 0,
          z: 0,
          zIndex: 0,
        })
        .set(".studio-book-turn-front", { autoAlpha: 1 })
        .set(".studio-book-turn-back", { autoAlpha: 0 })
        .set(".studio-book-turn-layer", { autoAlpha: 0 });
    })();
  };

  return (
    <div ref={root} className="studio-shell studio-book-experience">
      <div className="studio-noise" aria-hidden="true" />

      <main id="archive" className="studio-book-stage" onClick={turnPage}>
        <p className="studio-art-statement">EVERYTHING IS ART</p>
        <div className="studio-cursor-trail" aria-hidden="true">
          {cursorTrailDots}
        </div>
        <div className="studio-cursor-light" aria-hidden="true" />
        <div className="studio-book-shell">
          <div className="studio-book">
            <section className="studio-book-page studio-book-left" aria-label="Artwork notes">
              <div className="studio-book-left-rule" />
              <span className="studio-book-page-number">PLATE / 01</span>
              <h1 className="studio-book-page-title">THE FIRST LINE</h1>
              <p className="studio-book-page-note">
                A mark begins as a conversation between memory, anatomy and intent.
              </p>
              <div className="studio-book-seal" aria-hidden="true">
                <Image src="/redpeacock.png" alt="" fill sizes="22vw" />
              </div>
              <small>SPIRITUAL TATTOO STUDIO / ORIGINAL WORK</small>
            </section>

            <section className="studio-book-page studio-book-right" aria-label="Tattoo artwork">
              <div className="studio-book-artwork">
                {artPages.map((art, index) => (
                  <figure
                    key={art.number}
                    className={`studio-book-art ${art.className}`}
                    data-art={index}
                  >
                    <Image src={art.src} alt={art.alt} fill sizes="(max-width: 800px) 78vw, 42vw" />
                    {index === artPages.length - 1 && (
                      <figcaption id="booking" className="studio-book-booking">
                        <span>YOUR STORY / YOUR SKIN</span>
                        <a href="mailto:studio@spiritualart3.com">START A CONVERSATION ↗</a>
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
              <div className="studio-book-shadow" aria-hidden="true" />
            </section>

            <div className="studio-book-turn" aria-hidden="true">
              <div className="studio-book-turn-front">
                {artPages.map((art, index) => (
                  <figure
                    key={`front-art-${art.number}`}
                    className={`studio-book-turn-layer studio-book-turn-art ${art.className}`}
                    data-turn-face="front"
                    data-turn-kind="art"
                    data-turn-index={index}
                  >
                    <Image src={art.src} alt="" fill sizes="42vw" />
                  </figure>
                ))}
                {artPages.map((art, index) => (
                  <div
                    key={`front-note-${art.number}`}
                    className="studio-book-turn-layer studio-book-turn-note"
                    data-turn-face="front"
                    data-turn-kind="note"
                    data-turn-index={index}
                  >
                    <span>PLATE / {art.number}</span>
                    <strong>{art.title}</strong>
                    <p>{art.note}</p>
                    <small>SPIRITUAL TATTOO STUDIO / ORIGINAL WORK</small>
                  </div>
                ))}
              </div>
              <div className="studio-book-turn-back">
                {artPages.map((art, index) => (
                  <div
                    key={`back-note-${art.number}`}
                    className="studio-book-turn-layer studio-book-turn-note"
                    data-turn-face="back"
                    data-turn-kind="note"
                    data-turn-index={index}
                  >
                    <span>PLATE / {art.number}</span>
                    <strong>{art.title}</strong>
                    <p>{art.note}</p>
                    <small>SPIRITUAL TATTOO STUDIO / ORIGINAL WORK</small>
                  </div>
                ))}
                {artPages.map((art, index) => (
                  <figure
                    key={`back-art-${art.number}`}
                    className={`studio-book-turn-layer studio-book-turn-art ${art.className}`}
                    data-turn-face="back"
                    data-turn-kind="art"
                    data-turn-index={index}
                  >
                    <Image src={art.src} alt="" fill sizes="42vw" />
                  </figure>
                ))}
              </div>
            </div>

            <div
              className="studio-book-cover"
              role="button"
              tabIndex={0}
              aria-label="Open the Spiritual Tattoo Art archive book"
              onClick={(event) => {
                event.stopPropagation();
                begin();
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  begin();
                }
              }}
            >
              <div className="studio-book-cover-face">
                <span className="studio-cover-kicker">THE BOOK OF LIVING MARKS / 01</span>
                <div className="studio-cover-kali" aria-hidden="true">
                  <Image src="/cover-kali.png" alt="" fill sizes="40vw" priority />
                </div>
                <div className="studio-cover-title" aria-hidden="true">
                  <Image src="/cover-spiritual-title.png" alt="" fill sizes="40vw" priority />
                </div>
                <span className="studio-cover-prompt">CLICK COVER / OPEN ARCHIVE ↗</span>
              </div>
              <div className="studio-book-cover-inside">
                <Image src="/redpeacock.png" alt="" fill sizes="42vw" />
                <span>MADE ONCE / CARRIED ALWAYS</span>
              </div>
            </div>

            <div className="studio-book-spine" aria-hidden="true" />
          </div>
        </div>

        <div className="studio-book-caption">
          <span>LEFT / PREVIOUS · RIGHT / NEXT</span>
          <p>One archive. Four studies in line, body, matter and permanence.</p>
        </div>
      </main>

      <footer className="studio-footer">
        <div className="studio-step">
          <span className="studio-step-current">01</span>
          <i>/ 04</i>
          <strong className="studio-step-label">THE FIRST LINE</strong>
        </div>
        <div className="studio-progress" aria-hidden="true">
          <span className="studio-progress-fill" />
        </div>
        <p className="studio-footer-instruction">CLICK THE COVER TO OPEN THE ARCHIVE</p>
      </footer>

      <div className="studio-loader">
        <div className="studio-loader-panel studio-loader-panel--left" />
        <div className="studio-loader-panel studio-loader-panel--right" />
        <div className="studio-loader-meta studio-loader-meta--top">
          SPIRITUAL TATTOO STUDIO / PRIVATE ARCHIVE
        </div>
        <div className="studio-loader-word" aria-label="Ink ritual">
          <span>INK</span>
          <span>/</span>
          <span>001</span>
        </div>
        <div className="studio-loader-action">
          <span>PREPARING THE ARCHIVE</span>
          <small>VISUAL EXPERIENCE / NO SOUND</small>
        </div>
        <div className="studio-loader-meta studio-loader-meta--bottom">
          <span ref={count}>000</span>%
          <i><b className="studio-loader-progress" /></i>
        </div>
      </div>
    </div>
  );
}
