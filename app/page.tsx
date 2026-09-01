import LandingAbout from "./components/landing-about";
import LandingFooter from "./components/landing-footer";
import LandingHero from "./components/landing-hero";
import LandingTestimonials from "./components/landing-testimonials";

export default function Home() {
  return (
    <main className="landing-page">
      <LandingHero />
      <LandingAbout />
      <LandingTestimonials />
      <LandingFooter />
    </main>
  );
}
