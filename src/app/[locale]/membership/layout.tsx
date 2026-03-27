import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import {
  getBreadcrumbItems,
  getLocalizedMetadata,
  getLocalizedMessage,
  normalizeLanguage,
} from "@/lib/seo";

type MembershipLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MembershipLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const [title, description] = await Promise.all([
    getLocalizedMessage(safeLocale, "membership.meta.title"),
    getLocalizedMessage(safeLocale, "membership.meta.description"),
  ]);

  return getLocalizedMetadata({
    locale: safeLocale,
    path: "/membership",
    title,
    description,
  });
}

export default async function MembershipLayout({
  children,
  params,
}: MembershipLayoutProps) {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const [homeLabel, pageTitle] = await Promise.all([
    getLocalizedMessage(safeLocale, "common.home"),
    getLocalizedMessage(safeLocale, "membership.meta.title"),
  ]);

  return (
    <>
      <BreadcrumbJsonLd
        items={getBreadcrumbItems(safeLocale, [
          { name: homeLabel, path: "" },
          { name: pageTitle, path: "/membership" },
        ])}
      />
      {children}
    </>
  );
}
