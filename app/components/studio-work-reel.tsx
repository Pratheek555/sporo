"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import type { Dictionary } from "../lib/i18n/dictionaries/en";
import { useLocalePath } from "../lib/i18n/locale-context";
import { format } from "../lib/i18n/text";

type ReelStrings = Dictionary["studio"]["reel"];

// Swap `src`, `poster` and `duration` here, and the matching titles in the
// dictionaries (`studio.reel.items`).
const clips = [
  { src: "/media/work-reel/clip-01.mp4", poster: "/media/work-reel/clip-01.jpg", duration: "00:18" },
  { src: "/media/work-reel/clip-02.mp4", poster: "/media/work-reel/clip-02.jpg", duration: "00:21" },
  { src: "/media/work-reel/clip-03.mp4", poster: "/media/work-reel/clip-03.jpg", duration: "00:24" },
  { src: "/work.mp4", poster: "/media/work-reel/work.jpg", duration: "00:17" },
  { src: "/media/cover_page_video.mp4", poster: "/media/work-reel/cover.jpg", duration: "00:17" },
];

type Clip = (typeof clips)[number] & { number: string; title: string; note: string };

const pad = (value: number) => String(value).padStart(2, "0");

/** Muted previews autoplay only where the site already allows decorative motion. */
const MOTION_QUERY = "(min-width: 901px) and (prefers-reduced-motion: no-preference)";

export default function StudioWorkReel({ t }: { t: ReelStrings }) {
  const href = useLocalePath();
  const reel: Clip[] = clips.map((clip, index) => ({ ...clip, number: pad(index + 1), ...t.items[index] }));

  const section = useRef<HTMLElement>(null);
  const strip = useRef<HTMLOListElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [active, setActive] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const [held, setHeld] = useState(false);
  const [openClip, setOpenClip] = useState<Clip | null>(null);

  // Play only while the reel is on screen, on larger screens, with motion allowed.
  useEffect(() => {
    const element = section.current;
    if (!element) return;

    const media = window.matchMedia(MOTION_QUERY);
    let visible = false;
    const update = () => setCanPlay(visible && media.matches && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { threshold: 0.35 });

    observer.observe(element);
    media.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  // Exactly one preview runs: the active clip, restarted whenever it becomes active.
  useEffect(() => {
    videos.current.forEach((video, index) => {
      if (!video) return;
      if (index === active && canPlay && !openClip) {
        if (!video.getAttribute("src") && video.dataset.src) video.src = video.dataset.src;
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [active, canPlay, openClip]);

  useEffect(() => {
    const element = dialog.current;
    if (!openClip || !element) return;
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [openClip]);

  useEffect(() => () => {
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
  }, []);

  const cardAt = (index: number) => strip.current?.children[index] as HTMLElement | undefined;

  const scrollToClip = useCallback((index: number) => {
    const list = strip.current;
    const card = list?.children[index] as HTMLElement | undefined;
    const first = list?.children[0] as HTMLElement | undefined;
    if (!list || !card || !first) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: smooth ? "smooth" : "auto" });
  }, []);

  const select = (index: number, scroll = true) => {
    const next = (index + reel.length) % reel.length;
    const video = videos.current[next];
    if (video && next !== active) video.currentTime = 0;
    setActive(next);
    if (scroll) scrollToClip(next);
  };

  // After a manual swipe or scroll settles, keep the active clip if it's still fully
  // in view; otherwise hand over to the first clip that is.
  const onStripScroll = () => {
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const list = strip.current;
      if (!list) return;
      const bounds = list.getBoundingClientRect();
      const inView = (index: number) => {
        const box = cardAt(index)?.getBoundingClientRect();
        return Boolean(box && box.left >= bounds.left - 2 && box.right <= bounds.right + 2);
      };
      if (inView(active)) return;
      const first = reel.findIndex((_, index) => inView(index));
      if (first !== -1) setActive(first);
    }, 160);
  };

  const onEnded = (index: number) => {
    if (index !== active) return;
    if (held) {
      const video = videos.current[index];
      if (video) {
        video.currentTime = 0;
        void video.play().catch(() => undefined);
      }
      return;
    }
    select(index + 1);
  };

  const onTimeUpdate = (index: number) => {
    const video = videos.current[index];
    const card = cardAt(index);
    if (!video || !card || !video.duration) return;
    card.style.setProperty("--reel-progress", String(video.currentTime / video.duration));
  };

  return (
    <section ref={section} id="work" className="studio-reel" aria-labelledby="studio-reel-title">
      <div className="studio-reel__content">
        <div className="studio-reel__eyebrow">
          <span><i /> {t.eyebrow}</span>
          <span>{format(t.index, { total: pad(reel.length) })}</span>
        </div>

        <header className="studio-reel__heading">
          <h2 id="studio-reel-title">
            <span>{t.heading[0]}</span>{" "}
            <span>{t.heading[1]}<em>{t.heading[2]}</em></span>
          </h2>
          <div className="studio-reel__intro">
            <p>{t.intro}</p>
            <p>{t.note}</p>
          </div>
        </header>

        <div className="studio-reel__controls">
          <span className="studio-reel__counter" aria-live="polite">
            <b>{reel[active].number}</b> / {pad(reel.length)}
            <span>{reel[active].title}</span>
          </span>
          <div>
            <button type="button" aria-label={t.previous} onClick={() => select(active - 1)}>←</button>
            <button type="button" aria-label={t.next} onClick={() => select(active + 1)}>→</button>
          </div>
        </div>
      </div>

      <ol
        ref={strip}
        className="studio-reel__strip"
        aria-label={t.label}
        onScroll={onStripScroll}
        onPointerEnter={(event) => { if (event.pointerType === "mouse") setHeld(true); }}
        onPointerLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(false);
        }}
      >
        {reel.map((clip, index) => (
          <li
            key={clip.number}
            className="studio-reel__item"
            data-active={index === active || undefined}
            style={{ "--reel-progress": 0 } as CSSProperties}
          >
            <button
              type="button"
              className="studio-reel__card"
              aria-label={format(t.watch, { title: clip.title })}
              aria-haspopup="dialog"
              onClick={() => setOpenClip(clip)}
              onPointerEnter={(event) => { if (event.pointerType === "mouse" && index !== active) select(index, false); }}
              onFocus={() => { if (index !== active) select(index, false); }}
            >
              <video
                ref={(element) => { videos.current[index] = element; }}
                data-src={clip.src}
                poster={clip.poster}
                muted
                playsInline
                preload="none"
                aria-hidden="true"
                onEnded={() => onEnded(index)}
                onTimeUpdate={() => onTimeUpdate(index)}
              />
              <span className="studio-reel__progress" aria-hidden="true"><i /></span>
              <span className="studio-reel__meta" aria-hidden="true">
                <span>{clip.number}</span>
                <span>{clip.duration}</span>
              </span>
              <span className="studio-reel__play" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="m9 5 11 7-11 7V5Z" /></svg>
              </span>
            </button>
            <div className="studio-reel__caption">
              <h3>{clip.title}</h3>
              <p>{clip.note}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="studio-reel__content studio-reel__bottom">
        <span>{t.note}</span>
        <Link href={href("/contact")}>{t.cta} <span aria-hidden="true">↗</span></Link>
      </div>

      <dialog
        ref={dialog}
        className="studio-film-dialog"
        aria-labelledby="studio-reel-dialog-title"
        onClose={() => setOpenClip(null)}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      >
        {openClip && (
          <div className="studio-film-dialog__content">
            <header>
              <div>
                <span>{format(t.clipNumber, { number: openClip.number })}</span>
                <h2 id="studio-reel-dialog-title">{openClip.title}</h2>
              </div>
              <button type="button" autoFocus aria-label={t.closeClip} onClick={() => dialog.current?.close()}>
                {t.close} <span aria-hidden="true">×</span>
              </button>
            </header>
            <ClipPlayer key={openClip.number} clip={openClip} t={t} />
            <p>{openClip.note}</p>
          </div>
        )}
      </dialog>
    </section>
  );
}

function ClipPlayer({ clip, t }: { clip: Clip; t: ReelStrings }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <p className="studio-film-dialog__error">{t.failed} <a href={clip.src}>{t.openDirectly}</a></p>
  ) : (
    <video src={clip.src} poster={clip.poster} controls autoPlay playsInline preload="metadata" aria-label={clip.title} onError={() => setFailed(true)} />
  );
}
