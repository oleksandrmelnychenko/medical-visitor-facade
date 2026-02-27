import { Metadata } from "next";
import { Hero, Tagline, FullSupport, CareForward, Office } from "@/components/sections/home";
import { ScrollSnap } from "@/components/layout/ScrollSnap";
import { getAlternateLanguages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "GMED Agency - Medical Concierge Service in Germany",
  description: "Premium medical concierge service. Treatment organization, clinic selection, and end-to-end patient support in Germany. Available in DE, EN, RU.",
  alternates: getAlternateLanguages("/"),
};

export default function Home() {
  return (
    <ScrollSnap>
      <Hero />
      <FullSupport />
      <CareForward />
      <Office />
    </ScrollSnap>
  );
}
