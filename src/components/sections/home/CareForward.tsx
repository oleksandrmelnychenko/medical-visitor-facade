"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import layoutStyles from "@/components/sections/shared/layout.module.scss";
import sectionStyles from "@/components/sections/shared/section.module.scss";

export function CareForward() {
  const t = useTranslations('home.careForward');

  return (
    <section className={sectionStyles.section}>
      <div className={sectionStyles.container}>
        <SectionHeader
          overline={t('overline')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Row 1 */}
        <div className={layoutStyles.singleColCentered}>
          <motion.div
            className={layoutStyles.textContent}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h3 className={layoutStyles.contentTitle}>{t('trust.title')}</h3>
            <p className={layoutStyles.contentText}>
              {t('trust.description')}
            </p>
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className={layoutStyles.singleColCentered}>
          <motion.div
            className={layoutStyles.textContent}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h3 className={layoutStyles.contentTitle}>
              {t('worldClass.title')}
            </h3>
            <p className={layoutStyles.contentText}>
              {t('worldClass.description')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
