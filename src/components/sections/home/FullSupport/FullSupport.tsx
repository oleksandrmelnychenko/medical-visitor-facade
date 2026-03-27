import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./FullSupport.module.scss";

const PRINCIPLE_KEYS = [
  "individualSupport",
  "expertise",
  "confidentiality",
  "digitalPortal",
  "security",
  "concierge",
  "coordination",
  "international",
] as const;

export function FullSupport() {
  const t = useTranslations("home.fullSupport");
  const tMembership = useTranslations("membership");
  const overline = t("overline");
  const subtitle = t("subtitle");

  return (
    <section className={cn(sectionStyles.section, styles.fullSupport)}>
      <div className={sectionStyles.container}>
        <div className={styles.layout} data-snap-anchor>
          <div className={styles.headingRow}>
            <div className={styles.header}>
              {overline ? <p className={styles.overline}>{overline}</p> : null}
              <h2 className={styles.title}>{t("title")}</h2>
              {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
            </div>

            <div className={styles.heroArrow} aria-hidden="true">
              <svg viewBox="0 0 40 40" fill="none" className={styles.heroArrowIcon}>
                <path
                  d="M18.67 4L22.91 8.24L14.31 16.83H36V22.83H14.31L22.91 31.43L18.67 35.67L2.76 19.76L18.67 4Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>

          <div className={styles.contentWrap}>
            <ol className={styles.principlesList}>
              {PRINCIPLE_KEYS.map((key, index) => (
                <li key={key} className={styles.principleItem}>
                  <span className={styles.principleIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.principleBody}>
                    <p className={styles.principleText}>{t(`principles.${key}`)}</p>
                    {key === "digitalPortal" || key === "concierge" ? (
                      <span className={styles.principleBadgeRow}>
                        <Link
                          href="/membership"
                          prefetch={false}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.principleBadgeLink}
                        >
                          <span className={styles.principleBadge}>
                            {tMembership("reserve.badge")}
                          </span>
                        </Link>
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <span className={styles.bottomSeam} aria-hidden />
    </section>
  );
}
