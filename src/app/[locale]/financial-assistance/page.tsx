import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import styles from "./financial-assistance.module.scss";

type FinancialAssistancePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function FinancialAssistancePage({ params }: FinancialAssistancePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "appointment.freeService" });

  const introParagraphs = [t("description2")];

  return (
    <div className={cn(pageStyles.page, styles.page)}>
      <section className={cn(sectionStyles.section, styles.contentSection)}>
        <div className={sectionStyles.container}>
          <div className={styles.editorialLayout}>
            <header className={styles.heroRow}>
              <div className={styles.heroMeta}>
                <p className={styles.metaLabel}>{t("title")}</p>
              </div>
              <div className={styles.heroContent}>
                <h1 className={styles.pageTitle}>{t("title")}</h1>
                <p className={styles.pageLead}>{t("description1")}</p>
              </div>
            </header>

            <section className={styles.introRow} aria-label={t("title")}>
              <div className={styles.rowIndex}>00</div>
              <div className={styles.rowHeading}>
                <p className={styles.rowTitle}>{t("title")}</p>
              </div>
              <div className={styles.rowBody}>
                <div className={styles.bodyStack}>
                  {introParagraphs.map((paragraph) => (
                    <p key={paragraph} className={styles.bodyText}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            <article className={styles.policyRow}>
              <div className={styles.rowIndex}>01</div>
              <div className={styles.rowHeading}>
                <h2 className={styles.rowTitle}>{t("priority")}</h2>
              </div>
              <div className={styles.rowBody}>
                <div className={styles.bodyStack}>
                  <p className={styles.bodyText}>{t("priorityText")}</p>
                  <div className={styles.noteCard}>
                    <p className={styles.noteText}>{t("note")}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
