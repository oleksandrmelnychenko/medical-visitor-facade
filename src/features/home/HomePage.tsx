import { Metadata } from "next";
import { Hero } from "./sections/hero";
// import { Focus } from "./sections/focus";
import { Approach } from "./sections/approach";
import { Journey } from "./sections/journey";
import { Locations } from "./sections/locations";
import { ScrollReveal } from "./sections/scroll-reveal";
import { Faq } from "./sections/faq";
import { ScrollRail } from "./sections/scroll-rail";
// import { Stats } from "./sections/stats";
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
    getLocalizedMessage(safeLocale, "home.journey.subtitle"),
  ]);

  return getLocalizedMetadata({
    locale: safeLocale,
    path: "/",
    title,
    description: `${heroSubtitle}. ${careSubtitle}`,
  });
}

export default async function HomePage({ params }: HomePageProps) {
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
      <ScrollRail />
      <Hero />
      {/* <Focus /> */}
      {/* <Stats /> */}
      <Approach />
      <Journey />
      <Locations />
      <ScrollReveal />
      <Faq />
    </div>
  );
}
