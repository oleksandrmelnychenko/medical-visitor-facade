import { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { FullSupport } from "@/components/sections/home/FullSupport";
import { CareForward } from "@/components/sections/home/CareForward";
import { Office } from "@/components/sections/home/Office";
import {
  getAlternateLanguages,
  getLocalizedMessage,
  normalizeLanguage,
} from "@/lib/seo";

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
