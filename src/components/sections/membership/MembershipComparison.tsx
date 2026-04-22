"use client";

import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./MembershipComparison.module.scss";

const PLANS = ["portal", "reserve"] as const;

const PLAN_HIGHLIGHTS = {
  portal: ["access", "executiveScheduling", "annualReview"],
  reserve: [
    "personalSupport",
    "priorityProcessing",
    "dedicatedManager",
    "proactiveFollowUp",
    "travelCoordination",
    "crossBorderCoordination",
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
            {PLANS.map((plan) => {
              const highlighted = plan === "reserve";

              return (
                <article
                  key={plan}
                  className={cn(styles.card, highlighted && styles.cardHighlighted)}
                >
                  <div className={styles.cardHead}>
                    <span
                      className={cn(
                        styles.planBadge,
                        highlighted && styles.planBadgeHighlighted
                      )}
                    >
                      {t(`${plan}.badge`)}
                    </span>
                    <h2 className={styles.planTitle}>{t(`${plan}.title`)}</h2>
                    <p className={styles.planDescription}>{t(`${plan}.description`)}</p>
                    {highlighted ? (
                      <p className={styles.planIncludes}>{t("reserve.includesPortal")}</p>
                    ) : null}
                  </div>

                  <ul className={styles.featureList}>
                    {PLAN_HIGHLIGHTS[plan].map((key) => (
                      <li key={key} className={styles.featureItem}>
                        <Check size={16} className={styles.featureIcon} aria-hidden="true" />
                        <span>{t(`${plan}.features.${key}`)}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/apply?type=new&plan=${plan}`}
                    prefetch={false}
                    className={styles.planCta}
                  >
                    <span className={styles.planCtaIcon} aria-hidden="true">
                      <ArrowRight />
                    </span>
                    <span className={styles.planCtaLabel}>{t(`${plan}.cta`)}</span>
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
