"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "../lib/i18n/dictionaries/en";
import { format } from "../lib/i18n/text";
import { useVisibleVideo } from "./use-visible-video";

type FilmStrings = Dictionary["studio"]["films"];

// Media and running times are fixed; titles and notes come from the dictionary, in the same order.
const filmMedia = [
  { number: "01", duration: "00:22", src: "/media/studio-films/the-ritual.mp4", poster: "/media/studio-films/the-ritual.jpg" },
  { number: "02", duration: "00:06", src: "/media/studio-films/film-02.mp4", poster: "/media/studio-films/film-02.jpg" },
  { number: "03", duration: "00:20", src: "/media/studio-films/living-marks.mp4", poster: "/media/studio-films/living-marks.jpg" },
];

type Film = (typeof filmMedia)[number] & { title: string; note: string };

function FilmCard({ film, t, onSelect, previewsEnabled }: { film: Film; t: FilmStrings; onSelect: (film: Film) => void; previewsEnabled: boolean }) {
  const root = useRef<HTMLButtonElement>(null);
  const [preview, setPreview] = useState(false);
  useVisibleVideo(root, preview && previewsEnabled);

  return (
    <article className={`studio-film studio-film--${film.number}`}>
      <button
        ref={root}
        className="studio-film__frame"
        type="button"
        aria-label={format(t.watch, { title: film.title })}
        aria-haspopup="dialog"
        onClick={() => onSelect(film)}
        onMouseEnter={() => setPreview(true)}
        onMouseLeave={() => setPreview(false)}
        onFocus={() => setPreview(true)}
        onBlur={() => setPreview(false)}
      >
        <video src={film.src} poster={film.poster} muted loop playsInline preload="none" aria-hidden="true" />
        <span className="studio-film__topline" aria-hidden="true"><span>ST / {film.number}</span><span>{film.duration}</span></span>
        <span className="studio-film__play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="m9 5 11 7-11 7V5Z" /></svg></span>
        <span className="studio-film__watch" aria-hidden="true">{t.watchFilm} <span>↗</span></span>
      </button>
      <div className="studio-film__caption"><span>{film.number}</span><div><h3>{film.title}</h3><p>{film.note}</p></div></div>
    </article>
  );
}

function FilmPlayer({ film, t }: { film: Film; t: FilmStrings }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <p className="studio-film-dialog__error">{t.failed} <a href={film.src}>{t.openDirectly}</a></p>
  ) : (
    <video src={film.src} poster={film.poster} controls autoPlay playsInline preload="metadata" aria-label={film.title} onError={() => setFailed(true)} />
  );
}

export default function StudioFilmGallery({ t }: { t: FilmStrings }) {
  const films: Film[] = filmMedia.map((media, index) => ({ ...media, ...t.items[index] }));
  const background = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [paused, setPaused] = useState(false);
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);
  useVisibleVideo(background, !paused && !activeFilm);

  useEffect(() => {
    const element = dialog.current;
    if (!activeFilm || !element) return;
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [activeFilm]);

  return (
    <section id="films" className="studio-film-gallery" aria-labelledby="studio-films-title">
      <div ref={background} className="studio-film-gallery__ambient" aria-hidden="true">
        <video src="/media/studio-films/ambient.mp4" poster="/media/studio-films/film-02.jpg" muted loop playsInline preload="none" />
      </div>
      <div className="studio-film-gallery__content">
        <div className="studio-film-gallery__eyebrow"><span><i /> {t.eyebrow}</span><span>{t.journal}</span></div>
        <header className="studio-film-gallery__heading">
          <h2 id="studio-films-title"><span>{t.heading[0]}</span>{" "}<span>{t.heading[1]}<em>{t.heading[2]}</em></span></h2>
          <div className="studio-film-gallery__intro"><p>{t.intro[0]}<br />{t.intro[1]}<br /><span>{t.intro[2]}</span></p></div>
        </header>
        <div className="studio-film-gallery__films">
          {films.map((film) => <FilmCard key={film.number} film={film} t={t} onSelect={setActiveFilm} previewsEnabled={!paused && !activeFilm} />)}
        </div>
        <div className="studio-film-gallery__bottom"><span>{t.made}</span><button className="studio-film-gallery__motion" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}><span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span> {paused ? t.resume : t.pause}</button><a href="mailto:studio@spiritualart3.com">{t.next} <span>↗</span></a></div>
      </div>
      <dialog ref={dialog} className="studio-film-dialog" aria-labelledby="studio-film-dialog-title" onClose={() => setActiveFilm(null)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        {activeFilm && <div className="studio-film-dialog__content"><header><div><span>{format(t.filmNumber, { number: activeFilm.number })}</span><h2 id="studio-film-dialog-title">{activeFilm.title}</h2></div><button type="button" autoFocus aria-label={t.closeFilm} onClick={() => dialog.current?.close()}>{t.close} <span aria-hidden="true">×</span></button></header><FilmPlayer key={activeFilm.number} film={activeFilm} t={t} /><p>{activeFilm.note}</p></div>}
      </dialog>
    </section>
  );
}
