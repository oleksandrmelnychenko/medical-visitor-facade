"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import styles from "./CareForward.module.scss";

const STEPS = [
  "consultation",
  "coordination",
  "documentation",
  "languageDigital",
  "travelTransfer",
  "personalSupport",
  "aftercare",
] as const;

const DETAIL_DESCRIPTORS = [
  {
    pointKey: "point1",
    itemKey: "item1",
  },
  {
    pointKey: "point2",
    itemKey: "item2",
  },
  {
    pointKey: "point3",
    itemKey: "item3",
  },
] as const;

export function CareForward() {
  const t = useTranslations("home.careForward");
  const shouldReduceMotion = useReducedMotion();
  const [openKey, setOpenKey] = useState<(typeof STEPS)[number] | null>(STEPS[0]);

  const toggle = (key: (typeof STEPS)[number]) => {
    setOpenKey((current) => (current === key ? null : key));
  };

  return (
    <section id="care" className={styles.section} data-home-section="care">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>{t("title")}</p>
            <h2 className={styles.title}>
              {t("headlineDark")}{" "}
              <span className={styles.titleMuted}>{t("headlineMuted")}</span>
            </h2>
          </div>

          <div className={styles.body}>
            <motion.div
              className={styles.media}
              aria-hidden="true"
              initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.92, y: 28 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.mediaInner}>
                <Image
                  src="/assets/care-forward-stones.webp"
                  alt="Balanced stacked stones symbolising considered medical coordination"
                  fill
                  sizes="(max-width: 767px) 80vw, 32vw"
                  className={styles.mediaImage}
                />
              </div>
            </motion.div>

            <div className={styles.accordion}>
            {STEPS.map((key, index) => {
              const isOpen = openKey === key;
              const panelId = `care-${key}-panel`;
              const triggerId = `care-${key}-trigger`;

              return (
                <article
                  key={key}
                  className={cn(styles.item, isOpen && styles.itemOpen)}
                >
                  <button
                    id={triggerId}
                    type="button"
                    className={styles.trigger}
                    onClick={() => toggle(key)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className={styles.index}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.question}>
                      {t(`services.${key}.title`)}
                    </span>
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
                    <div className={styles.answerWrap}>
                      <ul className={styles.answerList}>
                        {DETAIL_DESCRIPTORS.map((descriptor) => {
                          const itemTitleKey = `services.${key}.${descriptor.itemKey}Title`;
                          const itemTextKey = `services.${key}.${descriptor.itemKey}Text`;
                          const hasDetailedText =
                            t.has(itemTitleKey) && t.has(itemTextKey);

                          const pointTitle = hasDetailedText
                            ? t(itemTitleKey)
                            : t(`services.${key}.${descriptor.pointKey}`);
                          const pointText = hasDetailedText
                            ? t(itemTextKey)
                            : null;

                          return (
                            <li key={descriptor.pointKey} className={styles.answerPoint}>
                              <span className={styles.answerPointTitle}>{pointTitle}</span>
                              {pointText && (
                                <span className={styles.answerPointText}> — {pointText}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
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
