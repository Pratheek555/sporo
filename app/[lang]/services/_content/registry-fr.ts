import type { ServiceSummary } from "./registry";

// French display names and blurbs for the service index, keyed by slug. Slugs (and so
// URLs) stay identical across locales; a slug missing here falls back to the English copy.
export const serviceCopyFr: Record<string, Pick<ServiceSummary, "name" | "blurb">> = {
  "tattoo-studio": { name: "Studio de tatouage", blurb: "Une visite sûre et centrée sur l’art au studio de White Town." },
  "tattoo-artist": { name: "Tatoueur", blurb: "Rencontrez Mukhilan et sa façon d’aborder chaque pièce." },
  "custom-tattoo-design": { name: "Création de tatouage", blurb: "D’une histoire ou d’un croquis à un dessin unique." },
  "realistic-tattoo": { name: "Tatouage réaliste", blurb: "Profondeur, lumière et texture dignes d’une photographie." },
  "black-and-grey-tattoo": { name: "Tatouage noir et gris", blurb: "Dégradés doux et contrastes qui vieillissent avec élégance." },
  "fine-line-tattoo": { name: "Tatouage fine line", blurb: "Un trait délicat et précis, avec de l’espace pour respirer." },
  "minimalist-tattoo": { name: "Tatouage minimaliste", blurb: "Peu de traits, beaucoup de sens." },
  "cover-up-tattoo": { name: "Tatouage cover-up", blurb: "Transformer un vieux regret en nouvelle œuvre." },
  "lettering-tattoo": { name: "Tatouage lettering", blurb: "Prénoms, dates, écritures et mots qui restent lisibles." },
  "sleeve-tattoo": { name: "Tatouage manchette", blurb: "Des pièces planifiées en plusieurs séances, qui épousent le bras." },
  "portrait-tattoo": { name: "Tatouage portrait", blurb: "Visages de proches et d’animaux, honorés avec soin." },
  "forearm-tattoo": { name: "Tatouage avant-bras", blurb: "La toile la plus visible, conçue pour bouger avec vous." },
  "traditional-tattoo": { name: "Tatouage traditionnel", blurb: "Traits épais et aplats de couleur qui tiennent des décennies." },
  "small-tattoo": { name: "Petit tatouage", blurb: "Premiers tatouages et souvenirs de voyage, faits dans les règles." },
  "ear-piercing": { name: "Piercing d’oreille", blurb: "Du lobe au cartilage, et comment composer une oreille harmonieuse." },
  "nose-piercing": { name: "Piercing du nez", blurb: "Narine et haute narine, placés pour s’accorder à votre visage." },
  "eyebrow-piercing": { name: "Piercing du sourcil", blurb: "Un accent audacieux, incliné pour le confort et la cicatrisation." },
  "lip-piercing": { name: "Piercing de la lèvre", blurb: "Labret, Monroe, Medusa et bien d’autres." },
  "helix-piercing": { name: "Piercing hélix", blurb: "Cartilage supérieur de l’oreille : simple, double ou forward." },
  "navel-piercing": { name: "Piercing du nombril", blurb: "Un classique, d’abord vérifié selon votre anatomie." },
  "lobe-piercing": { name: "Piercing du lobe", blurb: "Premier, deuxième et troisième lobe, tout en douceur." },
  "septum-piercing": { name: "Piercing septum", blurb: "Le point idéal, repéré avec précision et relevable à volonté." },
  "conch-piercing": { name: "Piercing conch", blurb: "Conch interne ou externe, avec puces ou anneaux plus tard." },
  "daith-piercing": { name: "Piercing daith", blurb: "Le pli interne, ajusté à la forme de votre oreille." },
};
