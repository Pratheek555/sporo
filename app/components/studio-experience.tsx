"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import type { Dictionary } from "../lib/i18n/dictionaries/en";
import { useLocalePath } from "../lib/i18n/locale-context";
import StudioFilmGallery from "./studio-film-gallery";
import styles from "./studio-book-interaction.module.css";

gsap.registerPlugin(useGSAP);

type ArtImage = {
  src: string;
  alt: string;
};

type ArtPageBase = {
  number: string;
  title: string;
  note: string;
  className: string;
};

type ArtPage =
  | (ArtPageBase & { kind: "gallery"; images: [ArtImage, ArtImage, ArtImage, ArtImage] })
  | (ArtPageBase & { kind: "single"; image: ArtImage });

const studioGallerySources = [
  "/media/studio-gallery/studio-gallery-1.png",
  "/media/studio-gallery/studio-gallery-2.png",
  "/media/studio-gallery/studio-gallery-3.png",
  "/media/studio-gallery/studio-gallery-4.png",
] as const;

const archiveYears = Array.from({ length: 9 }, (_, index) => 2018 + index);

// Images, layout classes and page order are fixed; titles, notes and alt text come from the dictionary.
function buildArtPages(t: Dictionary["studio"]): ArtPage[] {
  const [first, second, third] = t.pages;

  return [
    {
      number: "01",
      ...first,
      kind: "gallery",
      images: studioGallerySources.map((src, index) => ({ src, alt: t.galleryAlts[index] })) as [
        ArtImage,
        ArtImage,
        ArtImage,
        ArtImage,
      ],
      className: "studio-book-art--gallery",
    },
    {
      number: "02",
      ...second,
      kind: "single",
      image: { src: "/media/nocturne-ink-object.webp", alt: t.objectAlt },
      className: "studio-book-art--object",
    },
    {
      number: "03",
      ...third,
      kind: "single",
      image: { src: "/media/studio-flash-sheet.webp", alt: t.flashAlt },
      className: "studio-book-art--flash",
    },
  ];
}

function ArtMedia({ art, decorative = false }: { art: ArtPage; decorative?: boolean }) {
  const images = art.kind === "gallery" ? art.images : [art.image];
  const sizes = decorative ? "42vw" : "(max-width: 800px) 78vw, 42vw";

  if (images.length > 1) {
    return (
      <div className="studio-book-image-grid">
        {images.map((image) => (
          <span className="studio-book-image-grid__cell" key={image.src}>
            <Image src={image.src} alt={decorative ? "" : image.alt} fill sizes={sizes} />
          </span>
        ))}
      </div>
    );
  }

  const image = images[0];
  return image ? <Image src={image.src} alt={decorative ? "" : image.alt} fill sizes={sizes} /> : null;
}

export default function StudioExperience({ t }: { t: Dictionary["studio"] }) {
  const artPages = buildArtPages(t);
  const href = useLocalePath();
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [busy, setBusy] = useState(false);
  const page = useRef(0);
  const coverReady = useRef(false);
  const opening = useRef(false);
  const opened = useRef(false);
  const turning = useRef(false);
  const reducedMotion = useRef(false);

  const { contextSafe } = useGSAP(
    () => {
      const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
      const syncMotion = () => { reducedMotion.current = preference.matches; };
      syncMotion();
      preference.addEventListener("change", syncMotion);

      gsap.set(".studio-book-shell", { autoAlpha: 0, scale: 0.84, y: 34 });
      gsap.set(".studio-book-caption > *", { autoAlpha: 0, y: 18 });

      if (reducedMotion.current) {
        if (count.current) count.current.textContent = "100";
        gsap.set(".studio-loader-progress", { scaleX: 1 });
        gsap.set(".studio-loader", { display: "none" });
        gsap.set(".studio-book-shell", { autoAlpha: 1, scale: 1, y: 0 });
        gsap.set(".studio-book-caption > *", { autoAlpha: 1, y: 0 });
        coverReady.current = true;
      } else {
        const counter = { value: 0 };
        const loader = gsap.timeline({ defaults: { ease: "power3.inOut" } });

        const yearStart = 0.38;
        const yearStep = 0.36;
        const finalYearStart = yearStart + (archiveYears.length - 1) * yearStep;
        const progressDuration = (archiveYears.length - 1) * yearStep + 0.22;

        loader
          .set(".studio-loader-year-track", { y: 0 })
          .set(".studio-loader-caption > *", { autoAlpha: 0, y: 12 })
          .from(
            ".studio-loader-meta--top > *",
            { autoAlpha: 0, y: -10, duration: 0.42, stagger: 0.06 },
            0.08,
          )
          .fromTo(
            ".studio-loader-caption > *",
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.44,
              stagger: 0.06,
              ease: "power3.out",
              immediateRender: false,
            },
            0.24,
          )
          .to(
            counter,
            {
              value: 100,
              duration: progressDuration,
              ease: "none",
              onUpdate: () => {
                if (count.current) {
                  count.current.textContent = Math.round(counter.value).toString();
                }
              },
            },
            yearStart,
          )
          .to(
            ".studio-loader-progress",
            { scaleX: 1, duration: progressDuration, ease: "none" },
            yearStart,
          );

        archiveYears.slice(1).forEach((_, index) => {
          const yearIndex = index + 1;
          const position = yearStart + index * yearStep;

          loader.to(
            ".studio-loader-year-track",
            {
              y: () => {
                const yearWindow = root.current?.querySelector<HTMLElement>(
                  ".studio-loader-years",
                );
                return -(yearWindow?.clientHeight ?? 0) * yearIndex;
              },
              duration: 0.22,
              ease: "power4.inOut",
            },
            position + yearStep,
          );
        });

        loader
          .to(
            ".studio-loader-years",
            { scale: 1.035, duration: 0.58, ease: "power2.inOut" },
            finalYearStart + 0.2,
          )
          .to(
            ".studio-loader-meta, .studio-loader-caption",
            { autoAlpha: 0, duration: 0.28, ease: "power2.out" },
            finalYearStart + 0.62,
          )
          .to(
            ".studio-loader-years",
            { autoAlpha: 0, yPercent: -8, duration: 0.34, ease: "power3.in" },
            finalYearStart + 0.66,
          )
          .to(
            ".studio-loader",
            { yPercent: -101, duration: 0.92, ease: "power4.inOut" },
            finalYearStart + 0.86,
          )
          .set(".studio-loader", { display: "none" })
          .to(
            ".studio-book-shell",
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.84, ease: "power3.out" },
            "-=0.58",
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
          .to(
            ".studio-book-caption > *",
            { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" },
            "-=0.18",
          )
          .add(() => {
            coverReady.current = true;
          });
      }

      return () => {
        preference.removeEventListener("change", syncMotion);
        coverReady.current = false;
      };
    },
    { scope: root },
  );

  const updatePageCopy = (index: number) => {
    setCurrentPage(index);
    const number = root.current?.querySelector<HTMLElement>(
      ".studio-step-current",
    );
    const label = root.current?.querySelector<HTMLElement>(
      ".studio-step-label",
    );
    const title = root.current?.querySelector<HTMLElement>(
      ".studio-book-page-title",
    );
    const note = root.current?.querySelector<HTMLElement>(
      ".studio-book-page-note",
    );

    if (number) number.textContent = artPages[index].number;
    if (label) label.textContent = artPages[index].title;
    if (title) title.textContent = artPages[index].title;
    if (note) note.textContent = artPages[index].note;
  };

  const begin = () => {
    contextSafe(() => {
      if (!coverReady.current || opening.current || opened.current) return;

      opening.current = true;
      setBusy(true);

      if (reducedMotion.current) {
        opened.current = true;
        opening.current = false;
        gsap.set(".studio-book", { "--book-open": 1 });
        gsap.set(".studio-book > .studio-book-left", { autoAlpha: 1 });
        gsap.set(".studio-book-cover", { rotationY: -180, autoAlpha: 0 });
        setIsOpen(true);
        setBusy(false);
        gsap.set('.studio-book-art[data-art="0"]', { autoAlpha: 1, scale: 1 });
        gsap.set(".studio-book-caption > *", { autoAlpha: 1, y: 0 });
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => {
          opened.current = true;
          opening.current = false;
          setIsOpen(true);
          setBusy(false);
        },
      });

      timeline
        .addLabel("openCover", 0)
        .to(".studio-cover-prompt", { autoAlpha: 0, y: -8, duration: 0.28 }, "openCover")
        .to(
          ".studio-book",
          { "--book-open": 1, duration: 1.15, ease: "sine.inOut" },
          "openCover",
        )
        .to(
          ".studio-book-cover",
          { rotationY: -180, duration: 1.15, ease: "sine.inOut" },
          "openCover",
        )
        .set(".studio-book > .studio-book-left", { autoAlpha: 1 })
        .set(".studio-book-cover", { autoAlpha: 0 })
        .to(
          '.studio-book-art[data-art="0"]',
          { scale: 1, duration: 0.82, ease: "power3.out" },
          0.42,
        )
        .to(
          ".studio-book-caption > *",
          { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.5, ease: "power3.out" },
          0.82,
        );
    })();
  };

  const turnPage = (direction: "forward" | "backward") => {
    contextSafe(() => {
    if (!opened.current || turning.current) return;
    const current = page.current;
    const next = direction === "forward" ? current + 1 : current - 1;
    if (next < 0 || next >= artPages.length) return;

    turning.current = true;
    setBusy(true);
    const finish = () => {
      page.current = next;
      updatePageCopy(next);
      turning.current = false;
      setBusy(false);
    };
    const currentArt = '.studio-book-art[data-art="' + current + '"]';
    const nextArt = '.studio-book-art[data-art="' + next + '"]';

    if (reducedMotion.current) {
      gsap.set(currentArt, { autoAlpha: 0 });
      gsap.set(nextArt, { autoAlpha: 1 });
      gsap.set(".studio-progress-fill", { scaleX: (next + 1) / artPages.length });
      finish();
      return;
    }

    // A full-size artwork and readable external notes suit narrow screens.
    if (window.matchMedia("(max-width: 800px)").matches) {
      gsap.timeline({ onComplete: finish })
        .to(currentArt, { autoAlpha: 0, duration: 0.16 })
        .fromTo(nextArt, { autoAlpha: 0, x: direction === "forward" ? 12 : -12 },
          { autoAlpha: 1, x: 0, duration: 0.3, ease: "power2.out" })
        .to(".studio-progress-fill", { scaleX: (next + 1) / artPages.length, duration: 0.3 }, 0);
      return;
    }

    const turn = root.current?.querySelector<HTMLElement>(".studio-book-turn");
    if (!turn) { turning.current = false; setBusy(false); return; }
    const frontKind = direction === "forward" ? "art" : "note";
    const backKind = direction === "forward" ? "note" : "art";
    const front = '[data-turn-face="front"][data-turn-kind="' + frontKind + '"][data-turn-index="' + current + '"]';
    const back = '[data-turn-face="back"][data-turn-kind="' + backKind + '"][data-turn-index="' + next + '"]';
    turn.classList.toggle("studio-book-turn--backward", direction === "backward");
    gsap.set(".studio-book-turn-layer", { autoAlpha: 0 });
    gsap.set([front, back], { autoAlpha: 1 });
    // Backface culling chooses the visible face; never swap it on a timer.
    gsap.set(".studio-book-turn-front, .studio-book-turn-back", { autoAlpha: 1 });
    gsap.set(turn, { autoAlpha: 1, rotationY: 0, z: 1, zIndex: 28 });
    if (direction === "forward") {
      gsap.set(currentArt, { autoAlpha: 0 });
      gsap.set(nextArt, { autoAlpha: 1 });
    } else {
      // The preceding notes are revealed beneath the turning left leaf.
      updatePageCopy(next);
    }
    gsap.timeline({ onComplete: finish })
      .to(turn, { rotationY: direction === "forward" ? -180 : 180, duration: 1.05, ease: "sine.inOut" }, 0)
      .to(".studio-book-shadow", { opacity: 0.6, duration: 0.5, ease: "sine.out" }, 0)
      .to(".studio-book-shadow", { opacity: 0.28, duration: 0.55, ease: "sine.in" }, 0.5)
      .to(".studio-progress-fill", { scaleX: (next + 1) / artPages.length, duration: 0.8 }, 0.1)
      .set(currentArt, { autoAlpha: 0 }, 1.05)
      .set(nextArt, { autoAlpha: 1 }, 1.05)
      .call(() => updatePageCopy(next), [], 1.05)
      .set(turn, { autoAlpha: 0, rotationY: 0, z: 0, zIndex: 0 }, 1.05);
    })();
  };

  return (
    <div ref={root} className={`studio-shell studio-book-experience ${styles.editorialBook}`}>
      <div className="studio-noise" aria-hidden="true" />

      <main id="archive" className="studio-book-stage" data-open={isOpen}>
        <Link className="studio-back-link" href={href("/")}>{t.backLink}</Link>
        <span className="studio-archive-meta">{t.archiveMeta}</span>
        <p className="studio-art-statement">{t.statement}</p>
        <div className="studio-book-shell">
          <div className="studio-book">
            <section
              className="studio-book-page studio-book-left"
              aria-label={t.notesLabel}
              inert={!isOpen}
              onClick={() => turnPage("backward")}
            >
              <button
                type="button"
                className={styles.pageTap}
                aria-label={t.prevPageLabel}
                disabled={!isOpen || busy || currentPage === 0}
              />
              <div className="studio-book-left-rule" />
              <h1 className="studio-book-page-title">{artPages[0].title}</h1>
              <p className="studio-book-page-note">
                {artPages[0].note}
              </p>
              <div className="studio-book-seal" aria-hidden="true">
                <Image src="/redpeacock.png" alt="" fill sizes="22vw" />
              </div>
              <small>{t.signature}</small>
            </section>

            <section
              className="studio-book-page studio-book-right"
              aria-label={t.artworkLabel}
              inert={!isOpen}
              onClick={(event) => {
                if (event.target instanceof Element && event.target.closest("a")) return;
                turnPage("forward");
              }}
            >
              <button
                type="button"
                className={styles.pageTap}
                aria-label={t.nextPageLabel}
                disabled={!isOpen || busy || currentPage === artPages.length - 1}
              />
              <div className="studio-book-artwork">
                {artPages.map((art, index) => (
                  <figure
                    key={art.number}
                    className={`studio-book-art ${art.className}`}
                    data-art={index}
                    aria-hidden={index !== currentPage}
                    inert={index !== currentPage}
                  >
                    <ArtMedia art={art} />
                    {index === artPages.length - 1 && (
                      <figcaption id="booking" className="studio-book-booking">
                        <span>{t.booking.label}</span>
                        <a href="mailto:studio@spiritualart3.com">{t.booking.cta}</a>
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
                    <ArtMedia art={art} decorative />
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
                    <strong>{art.title}</strong>
                    <p>{art.note}</p>
                    <small>{t.signature}</small>
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
                    <strong>{art.title}</strong>
                    <p>{art.note}</p>
                    <small>{t.signature}</small>
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
                    <ArtMedia art={art} decorative />
                  </figure>
                ))}
              </div>
            </div>

            <div
              className="studio-book-cover"
              role="button"
              tabIndex={isOpen ? -1 : 0}
              aria-disabled={busy}
              aria-expanded={isOpen}
              aria-label={t.coverLabel}
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
                <span className="studio-cover-kicker">{t.coverKicker}</span>
                <div className="studio-cover-kali" aria-hidden="true">
                  <Image src="/cover-kali.png" alt="" fill sizes="40vw" preload />
                </div>
                <span className="studio-cover-prompt">{t.coverPrompt} <span aria-hidden="true">↗</span></span>
              </div>
              <div className="studio-book-cover-inside studio-book-left" aria-hidden="true">
                <div className="studio-book-left-rule" />
                <h2 className="studio-book-page-title">{artPages[0].title}</h2>
                <p className="studio-book-page-note">{artPages[0].note}</p>
                <div className="studio-book-seal"><Image src="/redpeacock.png" alt="" fill sizes="22vw" /></div>
                <small>{t.signature}</small>
              </div>
            </div>

            <div className="studio-book-spine" aria-hidden="true" />
          </div>
        </div>

        <div className="studio-book-navigation">
          <div className="studio-book-caption" aria-live="polite">
            <span>{isOpen ? artPages[currentPage].title : t.bookTitle}</span>
            <p>{isOpen ? artPages[currentPage].note : t.bookIntro}</p>
          </div>
          <nav className="studio-book-controls" aria-label={t.controlsLabel} inert={!isOpen}>
            <button type="button" disabled={!isOpen || busy || currentPage === 0} onClick={() => turnPage("backward")}>{t.previous}</button>
            <span aria-live="polite">{currentPage + 1} / {artPages.length}</span>
            <button type="button" disabled={!isOpen || busy || currentPage === artPages.length - 1} onClick={() => turnPage("forward")}>{t.next}</button>
          </nav>
        </div>
      <footer className="studio-footer">
        <div className="studio-step">
          <span className="studio-step-current">01</span>
          <i>/ {String(artPages.length).padStart(2, "0")}</i>
          <strong className="studio-step-label">{artPages[0].title}</strong>
        </div>
        <div className="studio-progress" aria-hidden="true">
          <span className="studio-progress-fill" style={{ transform: `scaleX(${1 / artPages.length})` }} />
        </div>
        <p className="studio-footer-instruction">{t.footerInstruction}</p>
      </footer>
      <a href="#films" className="studio-films-link">{t.filmsLink} <span>↓</span></a>
      </main>

      <StudioFilmGallery t={t.films} />

      <div className="studio-loader">
        <div className="studio-loader-field" aria-hidden="true" />
        <div className="studio-loader-meta studio-loader-meta--top">
          <span>{t.loaderTop[0]}</span>
          <span>{t.loaderTop[1]}</span>
        </div>

        <div className="studio-loader-years" aria-label={t.loaderYears}>
          <div className="studio-loader-year-track" aria-hidden="true">
            {archiveYears.map((year) => (
              <span className="studio-loader-year" key={year}>
                {year}
              </span>
            ))}
          </div>
        </div>

        <div className="studio-loader-caption">
          <span>{t.loaderCaption[0]}</span>
          <small>{t.loaderCaption[1]}</small>
        </div>

        <div className="studio-loader-meta studio-loader-meta--bottom">
          <span className="studio-loader-percentage"><b ref={count}>0</b>%</span>
          <i><b className="studio-loader-progress" /></i>
          <span>2018 — 2026</span>
        </div>
      </div>

    </div>
  );
}
