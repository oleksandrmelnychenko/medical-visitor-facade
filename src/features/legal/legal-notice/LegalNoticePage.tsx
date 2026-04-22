import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/cn";
import { BreadcrumbJsonLd } from "@/shared/seo/json-ld";
import sectionStyles from "@/shared/ui/section/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import {
  getBreadcrumbItems,
  getLocalizedMessage,
  getLocalizedMetadata,
  normalizeLanguage,
} from "@/shared/lib/seo";
import styles from "./LegalNoticePage.module.scss";

type LegalNoticePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LegalNoticePageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const title = await getLocalizedMessage(safeLocale, "impressumPage.title");

  return getLocalizedMetadata({
    locale: safeLocale,
    path: "/legal-notice",
    title,
    description: "Legal information for GMED Medical Concierge — company details, address and VAT identification.",
  });
}

export default async function LegalNoticePage({ params }: LegalNoticePageProps) {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const t = await getTranslations({ locale, namespace: "impressumPage" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const breadcrumbItems = getBreadcrumbItems(safeLocale, [
    { name: tCommon("home"), path: "" },
    { name: t("title"), path: "/legal-notice" },
  ]);

  return (
    <div className={cn(pageStyles.page, styles.page)} data-page="legal-notice">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <section className={cn(sectionStyles.section, styles.contentSection)}>
        <div className={styles.container}>
          <header className={styles.heroRow}>
            <span className={styles.eyebrow}>{t("title")}</span>
            <h1 className={styles.pageTitle}>{t("title")}</h1>
          </header>
          <div className={styles.editorialLayout}>
            <div className={styles.noticeRow}>
              <p className={styles.rowLabel}>{t("legalNameTitle")}</p>
              <div className={styles.rowContent}>
                <h2 className={styles.primaryStatement}>{t("companyName")}</h2>
              </div>
            </div>

            <div className={styles.noticeRow}>
              <p className={styles.rowLabel}>{t("addressTitle")}</p>
              <div className={styles.rowContent}>
                <div className={styles.statementGroup}>
                  <p className={styles.secondaryStatement}>Albert-Schweitzer-Straße 56</p>
                  <p className={styles.secondaryStatement}>81735 München</p>
                </div>
              </div>
            </div>

            <div className={styles.noticeRow}>
              <p className={styles.rowLabel}>{t("vatTitle")}</p>
              <div className={styles.rowContent}>
                <div className={styles.statementGroup}>
                  <p className={cn(styles.primaryStatement, styles.pastelVatNumber)}>DE407675242</p>
                </div>
              </div>
            </div>

            <div className={styles.noticeRow}>
              <p className={styles.rowLabel}>{t("contactPrompt")}</p>
              <div className={styles.rowContent}>
                <p className={styles.secondaryStatement}>
                  <a href="mailto:contact@gmed-health.com" className={styles.secondaryLink}>
                    contact@gmed-health.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
