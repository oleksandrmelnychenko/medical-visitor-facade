import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/shared/seo/json-ld";
import {
  getBreadcrumbItems,
  getLocalizedMetadata,
  getLocalizedMessage,
  normalizeLanguage,
} from "@/shared/lib/seo";
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
    getLocalizedMessage(safeLocale, "appointment.freeService.meta.title"),
    getLocalizedMessage(safeLocale, "appointment.freeService.meta.description"),
  ]);

  return getLocalizedMetadata({
    locale: safeLocale,
    path: "/pro-bono",
    title,
    description,
  });
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
          { name: pageTitle, path: "/pro-bono" },
        ])}
      />
      {children}
    </>
  );
}
