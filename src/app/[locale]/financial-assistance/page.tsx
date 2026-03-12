import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
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
      <section className={cn(sectionStyles.section, styles.heroSection)}>
        <div className={sectionStyles.container}>
          <SectionHeader
            title={t("title")}
            variant="page"
            titleAs="h1"
            theme="beige"
          />
        </div>
      </section>

      <section className={cn(sectionStyles.section, styles.contentSection)}>
        <div className={sectionStyles.container}>
          <div className={styles.content}>
            <div className={styles.introCard}>
              <p className={styles.text}>{t("description1")}</p>
              <p className={styles.text}>{t("description2")}</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("priority")}</h2>
              <p className={styles.text}>{t("priorityText")}</p>
            </div>

            <div className={styles.note}>
              <p>{t("note")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
