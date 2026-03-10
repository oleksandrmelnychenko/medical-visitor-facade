import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/home/Hero";
import {
  getAlternateLanguages,
  getLocalizedMessage,
  normalizeLanguage,
} from "@/lib/seo";

const FullSupport = dynamic(
  () => import("@/components/sections/home/FullSupport").then((mod) => mod.FullSupport)
);
const CareForward = dynamic(
  () => import("@/components/sections/home/CareForward").then((mod) => mod.CareForward)
);
const Office = dynamic(
  () => import("@/components/sections/home/Office").then((mod) => mod.Office)
);

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const title = await getLocalizedMessage(safeLocale, "home.hero.title");
  const heroSubtitle = await getLocalizedMessage(safeLocale, "home.hero.subtitle");
  const careSubtitle = await getLocalizedMessage(safeLocale, "home.careForward.subtitle");

  return {
    title,
    description: `${heroSubtitle}. ${careSubtitle}`,
    alternates: getAlternateLanguages("/", safeLocale),
  };
}

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
