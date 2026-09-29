"use client";

import { useEffect, useRef, useState } from "react";
import { useVisibleVideo } from "./use-visible-video";

const films = [
  { number: "01", title: "The ritual", note: "A moment before the mark.", duration: "00:05", src: "/media/studio-films/film-01.mp4", poster: "/media/studio-films/film-01.jpg" },
  { number: "02", title: "In the making", note: "Steady hands. Singular intent.", duration: "00:06", src: "/media/studio-films/film-02.mp4", poster: "/media/studio-films/film-02.jpg" },
  { number: "03", title: "Living marks", note: "Art, carried beyond these walls.", duration: "00:05", src: "/media/studio-films/film-03.mp4", poster: "/media/studio-films/film-03.jpg" },
];

type Film = (typeof films)[number];

function FilmCard({ film, onSelect, previewsEnabled }: { film: Film; onSelect: (film: Film) => void; previewsEnabled: boolean }) {
  const root = useRef<HTMLButtonElement>(null);
  const [preview, setPreview] = useState(false);
  useVisibleVideo(root, preview && previewsEnabled);

  return (
    <article className={`studio-film studio-film--${film.number}`}>
      <button
        ref={root}
        className="studio-film__frame"
        type="button"
        aria-label={`Watch ${film.title}`}
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
        <span className="studio-film__watch" aria-hidden="true">Watch film <span>↗</span></span>
      </button>
      <div className="studio-film__caption"><span>{film.number}</span><div><h3>{film.title}</h3><p>{film.note}</p></div></div>
    </article>
  );
}

function FilmPlayer({ film }: { film: Film }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <p className="studio-film-dialog__error">This film couldn&apos;t load. <a href={film.src}>Open the video directly ↗</a></p>
  ) : (
    <video src={film.src} poster={film.poster} controls autoPlay playsInline preload="metadata" aria-label={film.title} onError={() => setFailed(true)} />
  );
}

export default function StudioFilmGallery() {
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
        <div className="studio-film-gallery__eyebrow"><span><i /> Inside Spiritual</span><span>Film journal / 01—03</span></div>
        <header className="studio-film-gallery__heading">
          <h2 id="studio-films-title">BEHIND<br />THE <em>INK.</em></h2>
          <div className="studio-film-gallery__intro"><span className="studio-film-gallery__asterisk" aria-hidden="true">✳</span><p>The hands. The space.<br />The moments in between.<br /><span>A little of our world, in motion.</span></p></div>
        </header>
        <div className="studio-film-gallery__films">
          {films.map((film) => <FilmCard key={film.number} film={film} onSelect={setActiveFilm} previewsEnabled={!paused && !activeFilm} />)}
        </div>
        <div className="studio-film-gallery__bottom"><span>Made with intent. In Pondicherry.</span><button className="studio-film-gallery__motion" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}><span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span> {paused ? "Resume motion" : "Pause motion"}</button><a href="mailto:studio@spiritualart3.com">Your story could be next <span>↗</span></a></div>
      </div>
      <dialog ref={dialog} className="studio-film-dialog" aria-labelledby="studio-film-dialog-title" onClose={() => setActiveFilm(null)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        {activeFilm && <div className="studio-film-dialog__content"><header><div><span>Film / {activeFilm.number}</span><h2 id="studio-film-dialog-title">{activeFilm.title}</h2></div><button type="button" autoFocus aria-label="Close film" onClick={() => dialog.current?.close()}>Close <span aria-hidden="true">×</span></button></header><FilmPlayer key={activeFilm.number} film={activeFilm} /><p>{activeFilm.note}</p></div>}
      </dialog>
    </section>
  );
}
