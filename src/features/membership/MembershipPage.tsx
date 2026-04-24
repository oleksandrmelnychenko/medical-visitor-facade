import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { MembershipComparison } from "./MembershipComparison";
import { pickMessages, SHELL_NAMESPACES } from "@/i18n/pickMessages";
import { BreadcrumbJsonLd } from "@/shared/seo/json-ld";
import {
  getBreadcrumbItems,
  getLocalizedMessage,
  getLocalizedMetadata,
  normalizeLanguage,
} from "@/shared/lib/seo";
import styles from "./MembershipPage.module.scss";

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
  const [tCommon, messages] = await Promise.all([
    getTranslations({ locale, namespace: "common" }),
    pickMessages(safeLocale, [...SHELL_NAMESPACES, "membership"]),
  ]);

  const breadcrumbItems = getBreadcrumbItems(safeLocale, [
    { name: tCommon("home"), path: "" },
    { name: tCommon("programs"), path: "/membership" },
  ]);

  return (
    <main className={styles.page} data-page="membership">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <NextIntlClientProvider locale={safeLocale} messages={messages}>
        <MembershipComparison />
      </NextIntlClientProvider>
    </main>
  );
}
