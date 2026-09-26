type StudioFilm = {
  id: string;
  title: string;
  description: string;
  src: string;
  poster: string;
  width: number;
  height: number;
};

// Add each new film once, with its own poster and display dimensions.
// work.mp4 has a rotation flag, so its displayed dimensions are portrait.
const studioFilms: StudioFilm[] = [
  {
    id: "studio-session",
    title: "Inside the studio",
    description: "A tattoo session at Spiritual Tattoo Studio.",
    src: "/work.mp4",
    poster: "/media/studio-work-poster.jpg",
    width: 576,
    height: 1024,
  },
];

export default function StudioVideoGallery() {
  return (
    <section id="video-gallery" className="studio-video-gallery" aria-labelledby="studio-video-heading">
      <header className="studio-video-intro">
        <p className="studio-video-eyebrow">The video gallery / {String(studioFilms.length).padStart(2, "0")}</p>
        <h2 id="studio-video-heading">Work<br />in motion</h2>
        <p className="studio-video-description">Step inside a studio session. Press play to watch.</p>
      </header>
      <div className="studio-video-grid">
        {studioFilms.map((film, index) => (
          <figure className="studio-video-card" key={film.id}>
            <video
              controls
              playsInline
              preload="none"
              poster={film.poster}
              width={film.width}
              height={film.height}
              style={{ aspectRatio: `${film.width} / ${film.height}` }}
              aria-label={film.title}
              aria-describedby={`${film.id}-description`}
              tabIndex={0}
            >
              <source src={film.src} type="video/mp4" />
              Your browser cannot play this video. <a href={film.src}>Open {film.title}</a>.
            </video>
            <figcaption>
              <div className="studio-video-caption-row">
                <h3><span>{String(index + 1).padStart(2, "0")} / </span>{film.title}</h3>
                <a href={film.src} aria-label={`Open ${film.title} video directly`}>Open video ↗</a>
              </div>
              <p id={`${film.id}-description`}>{film.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
