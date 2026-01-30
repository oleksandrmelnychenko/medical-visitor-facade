import { Metadata } from "next";
import { Hero, FullSupport, CareForward, Office, CTA } from "@/components/sections/home";
import { getAlternateLanguages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "GMED Agency - Medical Concierge Service in Germany",
  description: "Premium medical concierge service. Treatment organization, clinic selection, and end-to-end patient support in Germany. Available in DE, EN, RU.",
  alternates: getAlternateLanguages("/"),
};

export default function Home() {
  return (
    <main>
      <Hero />
      <FullSupport />
      <CareForward />
      <Office />
      <CTA />
    </main>
  );
}
