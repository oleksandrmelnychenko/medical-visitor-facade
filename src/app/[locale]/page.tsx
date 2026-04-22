import { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { ForWhom } from "@/components/sections/home/ForWhom";
import { FullSupport } from "@/components/sections/home/FullSupport";
import { CareForward } from "@/components/sections/home/CareForward";
import { Office } from "@/components/sections/home/Office";
import { ScrollReveal } from "@/components/sections/home/ScrollReveal";
import { Faq } from "@/components/sections/home/Faq";
// import { ContactForm } from "@/components/sections/home/ContactForm";
import { HomeScrollRail } from "@/components/sections/home/HomeScrollRail";
import { ScaleStats } from "@/components/sections/ScaleStats";
import { FaqJsonLd } from "@/shared/seo/json-ld";
import {
  getLocalizedMetadata,
  getLocalizedMessage,
  normalizeLanguage,
} from "@/shared/lib/seo";

const FAQ_ITEM_KEYS = ["services", "clinicSelection", "travel", "documents", "onSite", "start"] as const;

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

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);

  const faqItems = await Promise.all(
    FAQ_ITEM_KEYS.map(async (key) => ({
      question: await getLocalizedMessage(safeLocale, `home.faq.items.${key}.question`),
      answer: await getLocalizedMessage(safeLocale, `home.faq.items.${key}.answer`),
    })),
  );

  return (
    <div data-page="home">
      <FaqJsonLd items={faqItems} />
      <HomeScrollRail />
      <Hero />
      <ForWhom />
      <ScaleStats />
      <FullSupport />
      <CareForward />
      <Office />
      <ScrollReveal />
      <Faq />
    </div>
  );
}
