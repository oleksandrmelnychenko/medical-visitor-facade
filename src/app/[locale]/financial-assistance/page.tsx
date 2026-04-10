import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import pageStyles from "@/styles/page.module.scss";
import styles from "./financial-assistance.module.scss";

type FinancialAssistancePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function FinancialAssistancePage({ params }: FinancialAssistancePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "appointment.freeService" });

  return (
    <div className={cn(pageStyles.page, styles.page)}>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.intro}>
              <p className={styles.eyebrow}>({t("title")})</p>
              <h1 className={styles.title}>
                {t("description1Dark")}{" "}
                <span className={styles.titleMuted}>
                  {t("description1Muted")}{" "}
                  <span className={styles.titleAccent}>{t("description1Accent")}</span>
                </span>
              </h1>
            </div>

            <div className={styles.content}>
              <p className={styles.lead}>{t("description2")}</p>

              <div className={styles.priorityBlock}>
                <h2 className={styles.priorityTitle}>{t("priority")}</h2>
                <p className={styles.priorityText}>{t("priorityText")}</p>
              </div>

              <div className={styles.noteCard}>
                <p className={styles.noteText}>{t("note")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
