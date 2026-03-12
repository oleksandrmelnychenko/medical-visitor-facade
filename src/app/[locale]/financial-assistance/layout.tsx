import { Metadata } from "next";
import { getAlternateLanguages } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import {
  getBreadcrumbItems,
  getLocalizedMessage,
  normalizeLanguage,
} from "@/lib/seo";
type FinancialAssistanceLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: FinancialAssistanceLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const [title, description] = await Promise.all([
    getLocalizedMessage(safeLocale, "appointment.freeService.title"),
    getLocalizedMessage(safeLocale, "appointment.freeService.description1"),
  ]);

  return {
    title,
    description,
    alternates: getAlternateLanguages("/financial-assistance", safeLocale),
  };
}

export default async function FinancialAssistanceLayout({
  children,
  params,
}: FinancialAssistanceLayoutProps) {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const [homeLabel, pageTitle] = await Promise.all([
    getLocalizedMessage(safeLocale, "common.home"),
    getLocalizedMessage(safeLocale, "appointment.freeService.title"),
  ]);

  return (
    <>
      <BreadcrumbJsonLd
        items={getBreadcrumbItems(safeLocale, [
          { name: homeLabel, path: "" },
          { name: pageTitle, path: "/financial-assistance" },
        ])}
      />
      {children}
    </>
  );
}
