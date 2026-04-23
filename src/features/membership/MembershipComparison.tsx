"use client";

import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";
import sectionStyles from "@/shared/ui/section/Section.module.scss";
import styles from "./MembershipComparison.module.scss";

const PLANS = [
  { key: "standard", highlighted: false, includesKey: null },
  { key: "care", highlighted: true, includesKey: "care.includesStandard" },
  { key: "reserve", highlighted: false, includesKey: "reserve.includesCare" },
] as const;

const PLAN_HIGHLIGHTS = {
  standard: [
    "consultations",
    "coordination",
    "documents",
    "languageSupport",
    "logistics",
    "onDemandSupport",
    "scheduling",
  ],
  care: ["onlinePortal", "portalAccess", "proactiveMonitoring", "progressDashboard"],
  reserve: [
    "dedicatedManager",
    "priorityHandling",
    "conciergeSupport",
    "crossBorder",
    "complexCases",
    "annualReview",
  ],
} as const;

export function MembershipComparison() {
  const t = useTranslations("membership");

  return (
    <div className={styles.wrapper}>
      <div className={sectionStyles.container}>
        <section className={styles.section} aria-label={t("title")}>
          <header className={styles.intro}>
            <p className={styles.eyebrow}>{t("eyebrow")}</p>
            <h1 className={styles.title}>{t("title")}</h1>
            <p className={styles.subtitle}>{t("subtitle")}</p>
          </header>

          <div className={styles.grid}>
            {PLANS.map(({ key, highlighted, includesKey }) => {
              const isReserve = key === "reserve";

              return (
                <article
                  key={key}
                  className={cn(
                    styles.card,
                    highlighted && styles.cardHighlighted,
                    isReserve && styles.cardReserve
                  )}
                >
                  <div className={styles.cardHead}>
                    <span
                      className={cn(
                        styles.planBadge,
                        highlighted && styles.planBadgeHighlighted,
                        isReserve && styles.planBadgeReserve
                      )}
                    >
                      {t(`${key}.badge`)}
                    </span>
                    <h2 className={styles.planTitle}>{t(`${key}.title`)}</h2>
                    <p className={styles.planDescription}>{t(`${key}.description`)}</p>
                    {includesKey ? (
                      <p className={styles.planIncludes}>{t(includesKey)}</p>
                    ) : null}
                  </div>

                  <ul className={styles.featureList}>
                    {PLAN_HIGHLIGHTS[key].map((featureKey) => (
                      <li key={featureKey} className={styles.featureItem}>
                        <Check size={16} className={styles.featureIcon} aria-hidden="true" />
                        <span>{t(`${key}.features.${featureKey}`)}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/apply?type=new&plan=${key}`}
                    prefetch={false}
                    className={styles.planCta}
                  >
                    <span className={styles.planCtaIcon} aria-hidden="true">
                      <ArrowRight />
                    </span>
                    <span className={styles.planCtaLabel}>{t(`${key}.cta`)}</span>
                    <span className={styles.planCtaDot} aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
