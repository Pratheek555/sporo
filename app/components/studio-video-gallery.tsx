"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type StudioFilm = {
  id: string;
  title: string;
  description: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  year: string;
};

// Add each new film once, with its own poster and display dimensions.
// work.mp4 has a rotation flag, so its displayed dimensions are portrait.
const studioFilms: StudioFilm[] = [
  {
    id: "studio-session",
    title: "Inside the studio",
    description: "A quiet study of craft, ritual and the human exchange behind every permanent mark.",
    src: "/work.mp4",
    poster: "/media/studio-work-poster.jpg",
    width: 576,
    height: 1024,
    year: "2026",
  },
];

export default function StudioVideoGallery() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();

      motion.add(
        {
          canAnimate: "(prefers-reduced-motion: no-preference)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.reduceMotion) {
            gsap.set(".studio-film-reveal", { clearProps: "all" });
            return;
          }

          const intro = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: root.current,
              start: "top 76%",
              once: true,
            },
          });

          intro
            .from(".studio-video-kicker > *", {
              autoAlpha: 0,
              y: 14,
              duration: 0.5,
              stagger: 0.06,
            })
            .from(
              ".studio-video-title-line > span",
              {
                yPercent: 108,
                duration: 0.9,
                stagger: 0.1,
                ease: "power4.out",
              },
              0.08,
            )
            .from(
              ".studio-video-frame",
              { autoAlpha: 0, y: 54, scale: 0.96, duration: 1.05 },
              0.32,
            )
            .from(
              ".studio-video-frame video",
              { scale: 1.06, duration: 1.2, ease: "power2.out" },
              0.32,
            )
            .from(
              ".studio-film-meta, .studio-film-note, .studio-video-caption > *",
              { autoAlpha: 0, y: 18, duration: 0.58, stagger: 0.08 },
              0.58,
            );
        },
      );

      return () => motion.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="video-gallery" className="studio-video-gallery" aria-labelledby="studio-video-heading">
      <div className="studio-video-kicker studio-film-reveal" aria-label={`${studioFilms.length} film in the studio archive`}>
        <span>Film archive</span>
        <span aria-hidden="true">Spiritual / Pondicherry</span>
        <span>{String(studioFilms.length).padStart(2, "0")} study</span>
      </div>

      <header className="studio-video-intro">
        <h2 id="studio-video-heading">
          <span className="studio-video-title-line"><span>Work</span></span>
          <span className="studio-video-title-line studio-video-title-line--italic"><span>in motion</span></span>
        </h2>
      </header>

      <div className="studio-video-collection">
        {studioFilms.map((film, index) => (
          <article className="studio-video-feature studio-film-reveal" key={film.id}>
            <aside className="studio-film-meta" aria-label="Film details">
              <span>Study {String(index + 1).padStart(2, "0")}</span>
              <dl>
                <div><dt>Year</dt><dd>{film.year}</dd></div>
                <div><dt>Format</dt><dd>Portrait film</dd></div>
                <div><dt>Runtime</dt><dd>Short film</dd></div>
              </dl>
            </aside>

            <figure className="studio-video-card">
              <div className="studio-video-frame">
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={film.poster}
                  width={film.width}
                  height={film.height}
                  aria-label={film.title}
                  aria-describedby={`${film.id}-description`}
                >
                  <source src={film.src} type="video/mp4" />
                  Your browser cannot play this video. <a href={film.src}>Open {film.title}</a>.
                </video>
                <span className="studio-video-frame-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")} / {String(studioFilms.length).padStart(2, "0")}
                </span>
              </div>
              <figcaption className="studio-video-caption">
                <h3>{film.title}</h3>
                <p id={`${film.id}-description`}>{film.description}</p>
                <a href={film.src} aria-label={`Open ${film.title} video directly`}>View film ↗</a>
              </figcaption>
            </figure>

            <p className="studio-film-note">
              <span>Process / 01</span>
              The work is not only the finished mark. It is the concentration before it, the trust during it,
              and the memory carried away.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
