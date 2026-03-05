import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/home/Hero";
import { getAlternateLanguages } from "@/lib/seo";

const FullSupport = dynamic(
  () => import("@/components/sections/home/FullSupport").then((mod) => mod.FullSupport)
);
const CareForward = dynamic(
  () => import("@/components/sections/home/CareForward").then((mod) => mod.CareForward)
);
const Office = dynamic(
  () => import("@/components/sections/home/Office").then((mod) => mod.Office)
);

export const metadata: Metadata = {
  title: "GMED Agency - Medical Concierge Service in Germany",
  description: "Premium medical concierge service. Treatment organization, clinic selection, and end-to-end patient support in Germany. Available in DE, EN, RU.",
  alternates: getAlternateLanguages("/"),
};

export default function Home() {
  return (
    <>
      <Hero />
      <FullSupport />
      <CareForward />
      <Office />
    </>
  );
}
