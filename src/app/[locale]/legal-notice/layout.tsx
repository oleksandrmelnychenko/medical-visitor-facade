import { Metadata } from "next";
import {
  getBreadcrumbItems,
  getLocalizedMetadata,
  getLocalizedMessage,
  normalizeLanguage,
} from "@/shared/lib/seo";
import { BreadcrumbJsonLd } from "@/shared/seo/json-ld";
type LegalNoticeLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LegalNoticeLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const [title, address] = await Promise.all([
    getLocalizedMessage(safeLocale, "impressumPage.title"),
    getLocalizedMessage(safeLocale, "footer.address"),
  ]);

  return getLocalizedMetadata({
    locale: safeLocale,
    path: "/legal-notice",
    title,
    description: `${title}. GMED Medical Concierge, ${address}.`,
  });
}

export default async function LegalNoticeLayout({
  children,
  params,
}: LegalNoticeLayoutProps) {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const [homeLabel, pageTitle] = await Promise.all([
    getLocalizedMessage(safeLocale, "common.home"),
    getLocalizedMessage(safeLocale, "impressumPage.title"),
  ]);

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
