import {
  PlaneTakeoff,
  Route,
  CalendarClock,
  Headset,
  FileCheck2,
  FolderArchive,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./FullSupport.module.scss";

const SERVICES = [
  { icon: Route, key: "support" },
  { icon: CalendarClock, key: "promptness" },
  { icon: FileCheck2, key: "confidentiality" },
  { icon: PlaneTakeoff, key: "noFees", premium: true },
  { icon: Headset, key: "concierge", premium: true },
];

const JOURNEY_STEPS = [
  { number: "01", key: "consultation" },
  { number: "02", key: "travel" },
  { number: "03", key: "arrival" },
  { number: "04", key: "treatment" },
  { number: "05", key: "recovery" },
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

          <div className={styles.orbitWrapper}>
            <div className={styles.bentoGrid}>
              {SERVICES.map((service) => (
                <div
                  key={service.key}
                  className={cn(
                    styles.serviceItem,
                    service.premium && styles.serviceItemPremium
                  )}
                >
                  <div className={styles.serviceIcon}>
                    <service.icon />
                  </div>
                  <div className={styles.serviceTitleRow}>
                    <h3 className={styles.serviceTitle}>{t(`services.${service.key}.title`)}</h3>
                    {service.premium && (
                      <span className={styles.premiumBadge}>{t(`services.${service.key}.badge`)}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      styles.premiumDivider,
                      service.premium && styles.premiumDividerPremium
                    )}
                    aria-hidden
                  />
                  <p className={styles.serviceDesc}>{t(`services.${service.key}.desc`)}</p>
                </div>
              ))}

              <div className={styles.digitalProfileCard}>
                <div className={cn(styles.serviceIcon, styles.digitalProfileIcon)}>
                  <FolderArchive />
                </div>
                <div className={styles.digitalProfileBody}>
                  <h3 className={styles.digitalProfileTitle}>{t("digitalProfile.title")}</h3>
                  <span className={styles.digitalProfileDivider} aria-hidden />
                  <p className={styles.digitalProfileDesc}>{t("digitalProfile.description")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.closingSpacer} aria-hidden="true" />

          <div className={styles.rightColumn}>
            <div className={styles.roadmapCard}>
              <h3 className={styles.roadmapTitle}>{t("journey.title")}</h3>
              <div className={styles.roadmap}>
                {JOURNEY_STEPS.map((step, index) => (
                  <div
                    key={step.key}
                    className={styles.roadmapStep}
                  >
                    <div className={styles.roadmapLine}>
                      <div className={styles.roadmapDot} />
                      {index < JOURNEY_STEPS.length - 1 && <div className={styles.roadmapConnector} />}
                    </div>
                    <div className={styles.roadmapContent}>
                      <span className={styles.roadmapNumber}>{step.number}</span>
                      <h4 className={styles.roadmapStepTitle}>{t(`journey.steps.${step.key}.title`)}</h4>
                      <p className={styles.roadmapStepDesc}>{t(`journey.steps.${step.key}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.promise}>
                <p className={styles.promiseText}>{t("promise.text")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className={styles.bottomSeam} aria-hidden />
    </section>
  );
}
