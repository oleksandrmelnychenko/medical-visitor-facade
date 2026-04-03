import { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { FullSupport } from "@/components/sections/home/FullSupport";
import { CareForward } from "@/components/sections/home/CareForward";
import { Office } from "@/components/sections/home/Office";
import { ScrollReveal } from "@/components/sections/home/ScrollReveal";
import { Faq } from "@/components/sections/home/Faq";
import { HomeScrollRail } from "@/components/sections/home/HomeScrollRail";
import {
  getLocalizedMetadata,
  getLocalizedMessage,
  normalizeLanguage,
} from "@/lib/seo";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const [title, heroSubtitle, careSubtitle] = await Promise.all([
    getLocalizedMessage(safeLocale, "home.hero.titleDark"),
    getLocalizedMessage(safeLocale, "home.hero.subtitle"),
    getLocalizedMessage(safeLocale, "home.careForward.subtitle"),
  ]);

  return getLocalizedMetadata({
    locale: safeLocale,
    path: "/",
    title,
    description: `${heroSubtitle}. ${careSubtitle}`,
  });
}

export default function Home() {
  return (
    <div data-page="home">
      <HomeScrollRail />
      <Hero />
      <FullSupport />
      <CareForward />
      <Office />
      <ScrollReveal />
      <Faq />
    </div>
  );
}
