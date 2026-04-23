import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/cn";
import { BreadcrumbJsonLd } from "@/shared/seo/json-ld";
import pageStyles from "@/styles/page.module.scss";
import {
  getBreadcrumbItems,
  getLocalizedMessage,
  getLocalizedMetadata,
  normalizeLanguage,
} from "@/shared/lib/seo";
import styles from "./FinancialAssistancePage.module.scss";

type FinancialAssistancePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: FinancialAssistancePageProps): Promise<Metadata> {
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

export default async function FinancialAssistancePage({ params }: FinancialAssistancePageProps) {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const t = await getTranslations({ locale, namespace: "appointment.freeService" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const breadcrumbItems = getBreadcrumbItems(safeLocale, [
    { name: tCommon("home"), path: "" },
    { name: t("title"), path: "/pro-bono" },
  ]);

  return (
    <main className={cn(pageStyles.page, styles.page)} data-page="pro-bono">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <section className={styles.section}>
        <div className={styles.container}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>{t("title")}</p>
            <h1 className={styles.title}>
              {t("description1Dark")}{" "}
              <span className={styles.titleAccent}>{t("description1Accent")}</span>{" "}
              {t("description1Tail")}
            </h1>
          </header>

          <div className={styles.body}>
            <aside className={styles.aside}>
              <p className={styles.lead}>{t("description2")}</p>
            </aside>

            <div className={styles.content}>
              <div className={styles.priorityBlock}>
                <h2 className={styles.priorityTitle}>{t("priority")}</h2>
                <p className={styles.priorityText}>
                  {t("priorityText")}{" "}
                  <span className={styles.priorityAccent}>{t("priorityAccent")}</span>
                </p>
              </div>

              <p className={styles.noteText}>{t("note")}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
