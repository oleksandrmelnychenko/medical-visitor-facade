"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./MembershipComparison.module.scss";

const PLANS = ["portal", "reserve"] as const;

const PLAN_HIGHLIGHTS = {
  portal: ["access", "documents", "responses"],
  reserve: ["dedicatedManager", "priorityProcessing", "travelCoordination"],
} as const;

export function MembershipComparison() {
  const t = useTranslations("membership");
  const [openPlans, setOpenPlans] = useState<Array<(typeof PLANS)[number]>>(() => [...PLANS]);

  return (
    <div className={styles.wrapper}>
      <div className={sectionStyles.container}>
        <section className={styles.section} aria-label={t("title")}>
          <div className={styles.content}>
            <div className={styles.grid}>
              <div className={styles.intro}>
                <p className={styles.eyebrow}>({t("eyebrow")})</p>
                <h1 className={styles.title}>{t("title")}</h1>
                <p className={styles.subtitle}>{t("subtitle")}</p>
              </div>

              <div className={styles.accordion}>
                {PLANS.map((plan) => {
                  const isOpen = openPlans.includes(plan);
                  const highlighted = plan === "reserve";
                  const panelId = `membership-${plan}-panel`;
                  const triggerId = `membership-${plan}-trigger`;

                  return (
                    <article
                      key={plan}
                      className={cn(styles.item, isOpen && styles.itemOpen)}
                    >
                      <button
                        id={triggerId}
                        type="button"
                        className={styles.trigger}
                        onClick={() =>
                          setOpenPlans((current) =>
                          current.includes(plan)
                              ? current.filter((item) => item !== plan)
                              : [...current, plan]
                          )
                        }
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                      >
                        <div className={styles.triggerBody}>
                          <span
                            className={cn(
                              styles.planBadge,
                              highlighted && styles.planBadgeHighlighted
                            )}
                          >
                            {t(`${plan}.badge`)}
                          </span>
                          <h2 className={styles.planTitle}>{t(`${plan}.title`)}</h2>
                        </div>
                        <span className={cn(styles.icon, isOpen && styles.iconOpen)} aria-hidden="true">
                          <span className={styles.iconBar} />
                          <span className={cn(styles.iconBar, styles.iconBarVertical)} />
                        </span>
                      </button>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        aria-hidden={!isOpen}
                        className={cn(styles.panel, isOpen && styles.panelOpen)}
                      >
                        <div className={styles.panelInner}>
                          <p className={styles.planDescription}>{t(`${plan}.description`)}</p>

                          {plan === "reserve" ? (
                            <p className={styles.planIncludes}>{t("reserve.includesPortal")}</p>
                          ) : null}

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
                            className={cn(styles.planCta, highlighted && styles.planCtaHighlighted)}
                          >
                            <span>{t(`${plan}.cta`)}</span>
                            <ArrowRight size={16} aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
