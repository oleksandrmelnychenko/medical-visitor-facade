import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MembershipComparison } from "@/components/sections/membership/MembershipComparison";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import {
  getBreadcrumbItems,
  getLocalizedMessage,
  getLocalizedMetadata,
  normalizeLanguage,
} from "@/lib/seo";
import styles from "./membership.module.scss";

type MembershipPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MembershipPageProps): Promise<Metadata> {
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

export default async function MembershipPage({ params }: MembershipPageProps) {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const tMembership = await getTranslations({ locale, namespace: "membership" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const breadcrumbItems = getBreadcrumbItems(safeLocale, [
    { name: tCommon("home"), path: "" },
    { name: tCommon("programs"), path: "/membership" },
  ]);

  void tMembership;

  return (
    <main className={styles.page} data-page="membership">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <MembershipComparison />
    </main>
  );
}
