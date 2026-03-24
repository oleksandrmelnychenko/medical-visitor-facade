import {
  UserRound,
  Stethoscope,
  ShieldCheck,
  FolderArchive,
  LockKeyhole,
  CalendarClock,
  Headset,
  Globe2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./FullSupport.module.scss";

const PRINCIPLES = [
  { icon: UserRound, key: "individualSupport" },
  { icon: Stethoscope, key: "expertise" },
  { icon: ShieldCheck, key: "confidentiality" },
  { icon: FolderArchive, key: "digitalPortal" },
  { icon: LockKeyhole, key: "security" },
  { icon: Headset, key: "concierge" },
  { icon: CalendarClock, key: "coordination" },
  { icon: Globe2, key: "international" },
];

const RESERVE_FEATURE_KEYS = [
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

export function FullSupport() {
  const t = useTranslations("home.fullSupport");
  const overline = t("overline");
  const subtitle = t("subtitle");

  return (
    <section className={cn(sectionStyles.section, styles.fullSupport)}>
      <div className={sectionStyles.container}>
        <div className={styles.layout} data-snap-anchor>
          <div className={styles.header}>
            {overline ? <p className={styles.overline}>{overline}</p> : null}
            <h2 className={styles.title}>{t("title")}</h2>
            {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
          </div>

          <div className={styles.conceptGrid}>
            {PRINCIPLES.map((principle, index) => (
              <article key={principle.key} className={styles.conceptCard}>
                <div className={styles.conceptCardTop}>
                  <div className={styles.conceptIcon}>
                    <principle.icon />
                  </div>
                  <span className={styles.conceptIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className={styles.conceptTitle}>{t(`principles.${principle.key}`)}</h3>
              </article>
            ))}
          </div>

          <div className={styles.programComparison} aria-label={t("programComparison.ariaLabel")}>
            <article className={styles.programCard}>
              <h3 className={styles.programTitle}>{t("programComparison.portal.title")}</h3>
              <ul className={styles.programList}>
                <li className={styles.programItem}>{t("programComparison.portal.features.access")}</li>
              </ul>
            </article>

            <article className={cn(styles.programCard, styles.programCardHighlighted)}>
              <h3 className={styles.programTitle}>{t("programComparison.reserve.title")}</h3>
              <ul className={styles.programList}>
                {RESERVE_FEATURE_KEYS.map((featureKey) => (
                  <li key={featureKey} className={styles.programItem}>
                    {t(`programComparison.reserve.features.${featureKey}`)}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
      <span className={styles.bottomSeam} aria-hidden />
    </section>
  );
}
