import type { CSSProperties } from "react";
import ScrollExperience from "./components/scroll-experience";

const heroTiles = [
  { column: 0, row: 0, x: -420, y: -180, r: -7 },
  { column: 1, row: 0, x: 60, y: -320, r: 5 },
  { column: 2, row: 0, x: 410, y: -210, r: -4 },
  { column: 3, row: 0, x: 560, y: 80, r: 8 },
  { column: 0, row: 1, x: -520, y: 130, r: 5 },
  { column: 1, row: 1, x: -160, y: 310, r: -6 },
  { column: 2, row: 1, x: 180, y: -90, r: 6 },
  { column: 3, row: 1, x: 500, y: 250, r: -5 },
  { column: 0, row: 2, x: -390, y: 330, r: -5 },
  { column: 1, row: 2, x: -20, y: 430, r: 7 },
  { column: 2, row: 2, x: 280, y: 360, r: -4 },
  { column: 3, row: 2, x: 590, y: 420, r: 5 },
];

const projects = [
  {
    name: "Rook",
    type: "Geometric blackwork",
    placement: "Full sleeve",
    className: "work-card--large",
    artClass: "work-art--one",
    number: "01",
  },
  {
    name: "Bloom",
    type: "Fine line botanical",
    placement: "Rib study",
    className: "work-card--portrait",
    artClass: "work-art--two",
    number: "02",
  },
  {
    name: "Ouroboros",
    type: "Illustrative blackwork",
    placement: "Back piece",
    className: "work-card--wide",
    artClass: "work-art--three",
    number: "03",
  },
  {
    name: "Sumi",
    type: "Abstract brushwork",
    placement: "Calf piece",
    className: "work-card--small",
    artClass: "work-art--four",
    number: "04",
  },
];

const services = [
  ["Custom blackwork", "Original, anatomy-led pieces from first sketch to final pass."],
  ["Fine line & botanical", "Quiet detail, considered spacing, and a soft hand."],
  ["Large scale & cover-ups", "Long-form composition designed around movement and healing."],
  ["Direction & aftercare", "Placement advice, private sessions, and healed-work follow-up."],
];

const testimonials = [
  {
    name: "Mira A.",
    piece: "Botanical ribs / 2026",
    quote:
      "The drawing felt like it had always belonged there. Every decision—from scale to the last line—was explained without ever losing the instinct behind it.",
  },
  {
    name: "Ishan K.",
    piece: "Blackwork sleeve / 2025",
    quote:
      "Three long sessions and never once rushed. The sleeve moves as one piece, healed beautifully, and somehow looks stronger every month.",
  },
  {
    name: "Anya R.",
    piece: "Cover-up study / 2026",
    quote:
      "I came in wanting to hide an old tattoo. I left with something I was proud to show. The process was honest, calm, and completely personal.",
  },
  {
    name: "Dev P.",
    piece: "Abstract calf / 2025",
    quote:
      "The mark has energy without shouting. It changes with the angle of my leg, which is exactly the kind of detail I hoped the studio would notice.",
  },
  {
    name: "Leah S.",
    piece: "Fine line shoulder / 2026",
    quote:
      "Beautiful space, exacting hygiene, zero theatre. I felt looked after from the consultation through the healed check-in.",
  },
];

const manifesto =
  "A tattoo is recognized before it is understood. Your skin carries memory, instinct, and identity. We help shape the mark that makes it visible.";

const journal = [
  ["Before the session", "How to arrive rested, fed, and ready.", "journal-art--one"],
  ["Placement matters", "Designing with anatomy instead of against it.", "journal-art--two"],
  ["Black ink ages", "Contrast, scale, and why space is part of the drawing.", "journal-art--three"],
  ["The healing window", "What normal healing looks like, week by week.", "journal-art--four"],
  ["Cover-ups", "When to conceal, rework, or leave the old mark visible.", "journal-art--five"],
];

export default function Home() {
  return (
    <ScrollExperience>
      <main id="top">
        <section className="hero-scroll" aria-labelledby="hero-title">
          <div className="hero-stage">
            <div className="hero-wordmark" aria-hidden="true">
              NØCTURNE
            </div>

            <h1 id="hero-title" className="hero-primary-copy">
              {"You wear the story before you tell it."
                .split(" ")
                .map((word, index) => (
                  <span className="hero-heading-mask" key={`${word}-${index}`}>
                    <span className="hero-heading-word">{word}&nbsp;</span>
                  </span>
                ))}
            </h1>

            <p className="hero-secondary-copy">
              Nocturne creates one-of-one tattoos for people who want their skin
              to mean something—now, and years from now.
            </p>

            <div className="hero-scroll-cue" aria-hidden="true">
              <span>[</span>
              <span>SCROLL TO ENTER</span>
              <span>]</span>
            </div>

            <div className="hero-mosaic" aria-hidden="true">
              {heroTiles.map((tile, index) => {
                const xPosition = `${(tile.column / 3) * 100}%`;
                const yPosition = `${(tile.row / 2) * 100}%`;
                const style: CSSProperties = {
                  left: `${tile.column * 25}%`,
                  top: `${tile.row * (100 / 3)}%`,
                  width: "25.15%",
                  height: "33.5%",
                  backgroundPosition: `${xPosition} ${yPosition}`,
                };

                return (
                  <span
                    key={index}
                    className="hero-tile"
                    data-scatter-x={tile.x}
                    data-scatter-y={tile.y}
                    data-scatter-r={tile.r}
                    style={style}
                  />
                );
              })}
              <div className="hero-full-image" />
              <div className="hero-image-shade" />
              <div className="hero-image-caption">
                <span>NOCTURNE / PRIVATE TATTOO STUDIO</span>
                <span>ORIGINAL WORK / BY APPOINTMENT</span>
              </div>
            </div>

            <div className="hero-glyph" aria-hidden="true">
              <span>N</span>
              <i />
            </div>
            <div className="hero-exit-label" aria-hidden="true">
              SELECTED WORK / 2026
            </div>
          </div>
        </section>

        <section id="work" className="work-section" aria-labelledby="work-title">
          <div className="section-topline">
            <p>Selected work / 01—04</p>
            <a href="#booking">View availability</a>
          </div>
          <h2 id="work-title" className="section-title">
            Skin as canvas.<br />
            Memory as material.
          </h2>

          <div className="work-grid">
            {projects.map((project) => (
              <a
                className={`work-card ${project.className}`}
                href="#booking"
                key={project.name}
                aria-label={`${project.name}, ${project.type}, ${project.placement}`}
              >
                <div className={`work-art ${project.artClass}`}>
                  <span className="work-view">DISCUSS A PIECE</span>
                </div>
                <div className="work-meta">
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.type}</p>
                  </div>
                  <div>
                    <p>{project.placement}</p>
                    <span>{project.number}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="studio" className="studio-section" aria-labelledby="studio-title">
          <div className="studio-statement" id="studio-title">
            <div className="statement-mask">
              <p className="studio-statement-line">Instinct meets discipline.</p>
            </div>
            <div className="statement-mask">
              <p className="studio-statement-line">Skin becomes story.</p>
            </div>
          </div>

          <div className="studio-intro">
            <p>
              We book fewer clients so every drawing stays original, every
              placement is considered, and every session has our full focus.
            </p>
            <a className="text-link" href="#booking">
              START A CONVERSATION
            </a>
          </div>

          <div className="trust-rail" aria-label="Studio values">
            <div className="trust-rail-track">
              {[0, 1].map((repeat) => (
                <div className="trust-rail-set" key={repeat} aria-hidden={repeat === 1}>
                  <span>ORIGINAL DESIGN</span>
                  <span>PRIVATE SESSIONS</span>
                  <span>STERILE PRACTICE</span>
                  <span>ANATOMY FIRST</span>
                  <span>HEALED FOLLOW-UP</span>
                </div>
              ))}
            </div>
          </div>

          <div className="services" aria-label="Tattoo services">
            {services.map(([title, description], index) => (
              <article className="service-row" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <i aria-hidden="true">↗</i>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="ritual-scroll" aria-labelledby="process-title">
          <div className="ritual-stage">
            <div className="ritual-copy">
              <p>THE NOCTURNE PROCESS / 01—04</p>
              <h2 id="process-title">
                From first sketch to final pass, your piece is designed to live
                with you.
              </h2>
            </div>

            <div className="ritual-object ritual-object-mono" aria-hidden="true" />
            <div className="ritual-object ritual-object-color" aria-hidden="true" />

            <div className="ritual-notes" aria-label="Process principles">
              <div className="ritual-note ritual-note--one">
                <span>01</span>
                <p>Built around your body</p>
              </div>
              <div className="ritual-note ritual-note--two">
                <span>02</span>
                <p>Drawn only for you</p>
              </div>
              <div className="ritual-note ritual-note--three">
                <span>03</span>
                <p>Made to age with strength</p>
              </div>
            </div>

            <div className="ritual-outro" aria-hidden="true">
              <div className="ritual-outro-mask">
                <p className="ritual-outro-line">A ritual of trust.</p>
              </div>
              <div className="ritual-outro-mask">
                <p className="ritual-outro-line">A mark made permanent.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials-scroll" aria-labelledby="stories-title">
          <div className="testimonial-stage">
            <div className="testimonial-heading">
              <p>CLIENT STORIES / 01—05</p>
              <h2 id="stories-title">
                Beyond a session.<br />
                Carried forward.
              </h2>
              <div className="waveform" aria-hidden="true">
                {Array.from({ length: 54 }, (_, index) => (
                  <i key={index} style={{ height: `${8 + ((index * 13) % 28)}px` }} />
                ))}
              </div>
            </div>

            <div className="testimonial-track">
              {testimonials.map((testimonial, index) => (
                <article className="testimonial-card" key={testimonial.name}>
                  <div className="testimonial-card-top">
                    <span>N/{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{testimonial.name}</h3>
                      <p>{testimonial.piece}</p>
                    </div>
                  </div>
                  <blockquote>{testimonial.quote}</blockquote>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="journal"
          className="manifesto-section"
          aria-labelledby="manifesto-title"
        >
          <p className="manifesto-kicker">THE MARK / A NOTE FROM THE STUDIO</p>
          <h2 id="manifesto-title" className="manifesto-copy">
            {manifesto.split(" ").map((word, index) => (
              <span className="manifesto-word" key={`${word}-${index}`}>
                {word}{" "}
              </span>
            ))}
          </h2>

          <div className="journal-strip" aria-label="Tattoo journal">
            {journal.map(([title, description, artClass], index) => (
              <a className="journal-panel" href="#booking" key={title}>
                <div className={`journal-art ${artClass}`} />
                <div className="journal-content">
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <i>ASK ABOUT THIS ↗</i>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer id="booking" className="site-footer">
        <div className="footer-cta">
          <p>BOOKING WINDOW / AUTUMN 2026</p>
          <h2>
            Ready when the idea<br />
            won&apos;t leave you.
          </h2>
          <a
            className="booking-button"
            href="mailto:hello@nocturne.tattoo?subject=Tattoo%20consultation"
          >
            <span>START YOUR CONSULTATION</span>
            <i>↗</i>
          </a>
        </div>

        <div className="footer-grid">
          <div>
            <h3>Menu /</h3>
            <a href="#work">Work</a>
            <a href="#studio">Studio</a>
            <a href="#process">Process</a>
            <a href="#booking">Book</a>
          </div>
          <div>
            <h3>Studio /</h3>
            <p>Private studio</p>
            <p>India / by appointment</p>
          </div>
          <div>
            <h3>Contact /</h3>
            <a href="mailto:hello@nocturne.tattoo">hello@nocturne.tattoo</a>
            <p>Consultations answered Tue—Fri</p>
          </div>
          <div>
            <h3>Explore /</h3>
            <a href="#work">Selected work</a>
            <a href="#journal">Journal notes</a>
          </div>
        </div>

        <div className="footer-legal">
          <p>© 2026 NOCTURNE. CONCEPT STUDIO SITE.</p>
          <a href="#top">BACK TO TOP ↑</a>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          NØCTURNE
        </div>
      </footer>
    </ScrollExperience>
  );
}
