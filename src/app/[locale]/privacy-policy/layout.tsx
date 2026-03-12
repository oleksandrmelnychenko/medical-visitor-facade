import { Metadata } from "next";
import {
  getAlternateLanguages,
  getBreadcrumbItems,
  getLocalizedMessage,
  normalizeLanguage,
} from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
type PrivacyPolicyLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PrivacyPolicyLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const [title, description] = await Promise.all([
    getLocalizedMessage(safeLocale, "privacyPolicy.title"),
    getLocalizedMessage(safeLocale, "privacyPolicy.intro2"),
  ]);

  return {
    title,
    description,
    alternates: getAlternateLanguages("/privacy-policy", safeLocale),
  };
}

export default async function PrivacyPolicyLayout({
  children,
  params,
}: PrivacyPolicyLayoutProps) {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const [homeLabel, pageTitle] = await Promise.all([
    getLocalizedMessage(safeLocale, "common.home"),
    getLocalizedMessage(safeLocale, "privacyPolicy.title"),
  ]);

  return (
    <>
      <BreadcrumbJsonLd
        items={getBreadcrumbItems(safeLocale, [
          { name: homeLabel, path: "" },
          { name: pageTitle, path: "/privacy-policy" },
        ])}
      />
      {children}
    </>
  );
}
