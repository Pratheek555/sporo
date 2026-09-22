"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

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

const studioGalleryImages = [
  {
    src: "/media/studio-gallery/studio-gallery-1.png",
    alt: "A warm red tattoo studio filled with art, sculptures and shelves",
  },
  {
    src: "/media/studio-gallery/studio-gallery-2.png",
    alt: "A tattoo session taking place inside the red Spiritual Art studio",
  },
  {
    src: "/media/studio-gallery/studio-gallery-3.png",
    alt: "Collectible figures and objects arranged on a studio shelf",
  },
  {
    src: "/media/studio-gallery/studio-gallery-4.png",
    alt: "A small dog wearing a colorful outfit inside the studio",
  },
] satisfies [ArtImage, ArtImage, ArtImage, ArtImage];

const artPages: ArtPage[] = [
  {
    number: "01",
    title: "THE FIRST LINE",
    note: "A mark begins as a conversation between memory, anatomy and intent.",
    kind: "gallery",
    images: studioGalleryImages,
    className: "studio-book-art--gallery",
  },
  {
    number: "02",
    title: "BODY / FORM",
    note: "Each composition is drawn to move with the body that carries it.",
    kind: "single",
    image: { src: "/media/nocturne-work-grid.webp", alt: "A collection of blackwork and fine-line tattoo studies" },
    className: "studio-book-art--grid",
  },
  {
    number: "03",
    title: "INK / MATTER",
    note: "Texture, weight and negative space turn an image into a living object.",
    kind: "single",
    image: { src: "/media/nocturne-ink-object.webp", alt: "A sculptural black ink form" },
    className: "studio-book-art--object",
  },
  {
    number: "04",
    title: "CARRIED ALWAYS",
    note: "The final work leaves the studio and becomes part of your own mythology.",
    kind: "single",
    image: { src: "/redpeacock.png", alt: "An ornate red peacock illustration" },
    className: "studio-book-art--peacock",
  },
];

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

export default function StudioExperience() {
  const root = useRef<HTMLDivElement>(null);
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
      coverReady.current = true;
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
    <div ref={root} className="studio-shell studio-book-experience">
      <div className="studio-noise" aria-hidden="true" />

      <main id="archive" className="studio-book-stage" data-open={isOpen}>
        <Link className="studio-back-link" href="/">← Back to studio home</Link>
        <p className="studio-art-statement">EVERYTHING IS ART</p>
        <div className="studio-book-shell">
          <div className="studio-book">
            <section className="studio-book-page studio-book-left" aria-label="Artwork notes" inert={!isOpen}>
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

            <section className="studio-book-page studio-book-right" aria-label="Tattoo artwork" inert={!isOpen}>
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
                  <Image src="/cover-kali.png" alt="" fill sizes="40vw" preload />
                </div>
                <div className="studio-cover-title" aria-hidden="true">
                  <Image src="/cover-spiritual-title.png" alt="" fill sizes="40vw" preload />
                </div>
                <span className="studio-cover-prompt">OPEN THE ARCHIVE ↗</span>
              </div>
              <div className="studio-book-cover-inside studio-book-left" aria-hidden="true">
                <div className="studio-book-left-rule" />
                <span className="studio-book-page-number">PLATE / 01</span>
                <h2 className="studio-book-page-title">THE FIRST LINE</h2>
                <p className="studio-book-page-note">A mark begins as a conversation between memory, anatomy and intent.</p>
                <div className="studio-book-seal"><Image src="/redpeacock.png" alt="" fill sizes="22vw" /></div>
                <small>SPIRITUAL TATTOO STUDIO / ORIGINAL WORK</small>
              </div>
            </div>

            <div className="studio-book-spine" aria-hidden="true" />
          </div>
        </div>

        <div className="studio-book-caption" aria-live="polite">
          <span>{isOpen ? artPages[currentPage].title : "THE BOOK OF LIVING MARKS"}</span>
          <p>{isOpen ? artPages[currentPage].note : "Four studies in line, body, matter and permanence."}</p>
        </div>
        <nav className="studio-book-controls" aria-label="Archive pages" inert={!isOpen}>
          <button type="button" disabled={!isOpen || busy || currentPage === 0} onClick={() => turnPage("backward")}>← Previous</button>
          <span aria-live="polite">{currentPage + 1} / {artPages.length}</span>
          <button type="button" disabled={!isOpen || busy || currentPage === artPages.length - 1} onClick={() => turnPage("forward")}>Next →</button>
        </nav>
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
        <p className="studio-footer-instruction">OPEN THE COVER TO EXPLORE</p>
      </footer>

    </div>
  );
}
