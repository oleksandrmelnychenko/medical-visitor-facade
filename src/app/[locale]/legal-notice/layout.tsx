import { Metadata } from "next";
import {
  getAlternateLanguages,
  getBreadcrumbItems,
  getLocalizedMessage,
  normalizeLanguage,
} from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
type LegalNoticeLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LegalNoticeLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const title = await getLocalizedMessage(safeLocale, "impressumPage.title");
  const address = await getLocalizedMessage(safeLocale, "footer.address");

  return {
    title,
    description: `${title}. GMED Agency, ${address}.`,
    alternates: getAlternateLanguages("/legal-notice", safeLocale),
  };
}

export default async function LegalNoticeLayout({
  children,
  params,
}: LegalNoticeLayoutProps) {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const homeLabel = await getLocalizedMessage(safeLocale, "common.home");
  const pageTitle = await getLocalizedMessage(safeLocale, "impressumPage.title");

  return (
    <>
      <BreadcrumbJsonLd
        items={getBreadcrumbItems(safeLocale, [
          { name: homeLabel, path: "" },
          { name: pageTitle, path: "/legal-notice" },
        ])}
      />
      {children}
    </>
  );
}
