"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./MembershipComparison.module.scss";

const PORTAL_FEATURES = ["access"] as const;

const RESERVE_FEATURES = [
  "personalizedSupport",
  "priorityProcessing",
  "dedicatedManager",
  "proactiveFollowUp",
  "portalAccess",
  "travelCoordination",
  "annualReview",
  "executiveScheduling",
  "crossBorderCoordination",
] as const;

export function MembershipComparison() {
  const t = useTranslations("membership");
  return (
    <div className={styles.wrapper}>
      <div className={sectionStyles.container}>
        {/* Statement */}
        <div className={styles.statement}>
          <div className={styles.statementCopy}>
            <h1 className={styles.statementHeadline}>{t("subtitle")}</h1>
          </div>
          <div className={styles.statementSide}>
            <p className={styles.statementLabel}>
              <span className={styles.statementLabelBracket} aria-hidden="true">(</span>
              <span>{t("title")}</span>
              <span className={styles.statementLabelBracket} aria-hidden="true">)</span>
            </p>
          </div>
        </div>

        {/* Two plan cards */}
        <div className={styles.plans}>
          {/* Portal */}
          <div className={styles.planCard}>
            <div className={styles.planHeader}>
              <span className={styles.planBadge}>{t("portal.badge")}</span>
              <h2 className={styles.planTitle}>{t("portal.title")}</h2>
              <p className={styles.planDescription}>{t("portal.description")}</p>
            </div>
            <div className={styles.planDivider} />
            <ul className={styles.featureList}>
              {PORTAL_FEATURES.map((key) => (
                <li key={key} className={styles.featureItem}>
                  <Check size={16} className={styles.featureIcon} />
                  <span>{t(`portal.features.${key}`)}</span>
                </li>
              ))}
            </ul>
            <Link href="/apply" prefetch={false} className={styles.planCta}>
              {t("portal.cta")}
            </Link>
          </div>

          {/* Reserve */}
          <div className={`${styles.planCard} ${styles.planCardHighlighted}`}>
            <div className={styles.planHeader}>
              <span className={`${styles.planBadge} ${styles.planBadgeHighlighted}`}>
                {t("reserve.badge")}
              </span>
              <h2 className={styles.planTitle}>{t("reserve.title")}</h2>
              <p className={styles.planDescription}>{t("reserve.description")}</p>
            </div>
            <div className={styles.planDivider} />
            <ul className={styles.featureList}>
              {RESERVE_FEATURES.map((key) => (
                <li key={key} className={styles.featureItem}>
                  <Check size={16} className={styles.featureIcon} />
                  <span>{t(`reserve.features.${key}`)}</span>
                </li>
              ))}
            </ul>
            <Link href="/apply" prefetch={false} className={`${styles.planCta} ${styles.planCtaHighlighted}`}>
              {t("reserve.cta")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
