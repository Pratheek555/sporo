import type { Metadata } from "next";
import StudioExperience from "../components/studio-experience";
import LandingFooter from "../components/landing-footer";

export const metadata: Metadata = {
  title: "Inside the Studio — Spiritual Tattoo Studio",
  description:
    "Enter the private, appointment-only world of Spiritual Tattoo Studio in Pondicherry.",
};

export default function StudioPage() {
  return (
    <div className="studio-page">
      <StudioExperience />
      <LandingFooter />
    </div>
  );
}
