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
        </div>
      </div>
      <span className={styles.bottomSeam} aria-hidden />
    </section>
  );
}
