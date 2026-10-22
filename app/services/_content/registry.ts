// Lightweight service index shared by the navigation, the services hub and the
// footer. Full article copy lives in ./articles and is only loaded server-side.

export type ServiceCategory = "tattoo" | "piercing";

export type ServiceSummary = {
  slug: string;
  name: string;
  category: ServiceCategory;
  blurb: string;
};

export const services: readonly ServiceSummary[] = [
  { slug: "tattoo-studio", name: "Tattoo Studio", category: "tattoo", blurb: "What a safe, art-first studio visit in White Town looks like." },
  { slug: "tattoo-artist", name: "Tattoo Artists", category: "tattoo", blurb: "Meet Mukhilan and how he approaches every piece." },
  { slug: "custom-tattoo-design", name: "Tattoo Design", category: "tattoo", blurb: "From a story or a sketch to a one-of-one design." },
  { slug: "realistic-tattoo", name: "Realistic Tattoo", category: "tattoo", blurb: "Depth, light and texture that read like a photograph." },
  { slug: "black-and-grey-tattoo", name: "Black & Grey Tattoo", category: "tattoo", blurb: "Smooth shading and contrast that age gracefully." },
  { slug: "fine-line-tattoo", name: "Fine Line Tattoo", category: "tattoo", blurb: "Delicate, precise linework with room to breathe." },
  { slug: "minimalist-tattoo", name: "Minimalist Tattoo", category: "tattoo", blurb: "Few lines, lots of meaning." },
  { slug: "cover-up-tattoo", name: "Cover Up Tattoo", category: "tattoo", blurb: "Turning an old regret into new art." },
  { slug: "lettering-tattoo", name: "Lettering Tattoo", category: "tattoo", blurb: "Names, dates, scripts and words that stay legible." },
  { slug: "sleeve-tattoo", name: "Sleeve Tattoos", category: "tattoo", blurb: "Planned, multi-session pieces that flow with the arm." },
  { slug: "portrait-tattoo", name: "Portrait Tattoo", category: "tattoo", blurb: "Faces of people and pets, honoured with care." },
  { slug: "forearm-tattoo", name: "Forearm Tattoo", category: "tattoo", blurb: "The most visible canvas, designed to move with you." },
  { slug: "traditional-tattoo", name: "Traditional Tattoo", category: "tattoo", blurb: "Bold lines and solid colour that hold for decades." },
  { slug: "small-tattoo", name: "Small Tattoo", category: "tattoo", blurb: "First tattoos and travel keepsakes, done properly." },
  { slug: "ear-piercing", name: "Ear Piercing", category: "piercing", blurb: "Lobes to cartilage, plus how to plan a curated ear." },
  { slug: "nose-piercing", name: "Nose Piercing", category: "piercing", blurb: "Nostril and high-nostril, placed to suit your face." },
  { slug: "eyebrow-piercing", name: "Eyebrow Piercing", category: "piercing", blurb: "A bold accent, angled for comfort and healing." },
  { slug: "lip-piercing", name: "Lip Piercing", category: "piercing", blurb: "Labret, Monroe, Medusa and more." },
  { slug: "helix-piercing", name: "Helix Piercing", category: "piercing", blurb: "Upper-ear cartilage, single, double or forward." },
  { slug: "navel-piercing", name: "Navel Piercing", category: "piercing", blurb: "A classic, checked against your anatomy first." },
  { slug: "lobe-piercing", name: "Lobe Piercing", category: "piercing", blurb: "First, second and third lobes, done gently." },
  { slug: "septum-piercing", name: "Septum Piercing", category: "piercing", blurb: "The sweet spot, found precisely and flippable." },
  { slug: "conch-piercing", name: "Conch Piercing", category: "piercing", blurb: "Inner or outer conch, studs or hoops later." },
  { slug: "daith-piercing", name: "Daith Piercing", category: "piercing", blurb: "The inner fold, fitted to your ear's shape." },
];

export const tattooServices = services.filter((service) => service.category === "tattoo");
export const piercingServices = services.filter((service) => service.category === "piercing");

export function getServiceSummary(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const serviceHref = (slug: string) => `/services/${slug}`;
