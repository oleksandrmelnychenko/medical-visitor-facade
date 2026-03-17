"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./CareForward.module.scss";

const STEPS = [
  {
    key: "consultation",
  },
  {
    key: "coordination",
  },
  {
    key: "documentation",
  },
  {
    key: "languageDigital",
  },
  {
    key: "travelTransfer",
  },
  {
    key: "personalSupport",
  },
  {
    key: "aftercare",
  },
];

const EDITORIAL_ITEMS = [
  "item1",
  "item2",
  "item3",
] as const;

export function CareForward() {
  const t = useTranslations("home.careForward");
  const tCommon = useTranslations("common");

  return (
    <section className={styles.section}>
      <div className={`${sectionStyles.container} ${styles.container}`}>
        <div
          className={styles.shell}
          data-snap-anchor
          data-snap-shift="24"
        >
          <div className={styles.headingRow}>
            <div className={styles.intro}>
              <p className={styles.eyebrow}>({t("title")})</p>
            </div>
            <div className={styles.leadColumn}>
              <h2 className={styles.statement}>{t("subtitle")}</h2>
              <Link href="/apply" prefetch={false} className={styles.ctaLink}>
                <span className={styles.ctaLabel}>{tCommon("requestAppointment")}</span>
                <span className={styles.ctaArrow} aria-hidden="true">
                  <svg viewBox="0 0 40 40" fill="none" className={styles.ctaArrowIcon}>
                    <path
                      d="M18.67 4L22.91 8.24L14.31 16.83H36V22.83H14.31L22.91 31.43L18.67 35.67L2.76 19.76L18.67 4Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          <div className={styles.servicesWrap}>
            <div className={styles.servicesGrid}>
              {STEPS.map((step, index) => {
                return (
                  <article
                    key={step.key}
                    className={styles.serviceCard}
                  >
                    <div className={styles.cardHeader}>
                      <span className={styles.cardIndex}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className={styles.cardLabel}>
                        {t(`services.${step.key}.label`)}
                      </p>
                    </div>
                    <h3 className={styles.cardTitle}>
                      {t(`services.${step.key}.title`)}
                    </h3>
                    <div className={styles.cardContent}>
                      <div className={styles.editorialList}>
                        {EDITORIAL_ITEMS.map((itemKey) => (
                          <div key={itemKey} className={styles.editorialItem}>
                            <p className={styles.editorialItemTitle}>
                              {t(`services.${step.key}.${itemKey}Title`)}
                            </p>
                            <p className={styles.editorialItemText}>
                              {t(`services.${step.key}.${itemKey}Text`)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
