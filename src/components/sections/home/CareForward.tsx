"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
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
        <div className={layoutStyles.twoColGrid}>
          {/* Text Content */}
          <motion.div
            className={layoutStyles.textContent}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h3 className={layoutStyles.contentTitle}>{t('trust.title')}</h3>
            <p className={layoutStyles.contentText}>
              {t('trust.description')}
            </p>
            <motion.button
              className={layoutStyles.outlineButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('learnMore')}
            </motion.button>
          </motion.div>

          {/* Image */}
          <motion.div
            className={layoutStyles.imageCard}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc2NTc4NTQ3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Doctor patient consultation"
            />
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className={layoutStyles.twoColGridReverse}>
          {/* Image */}
          <motion.div
            className={layoutStyles.imageCard}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1662414185445-b9a05e26dba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2NTc1ODczOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Modern hospital building"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            className={layoutStyles.textContent}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h3 className={layoutStyles.contentTitle}>
              {t('worldClass.title')}
            </h3>
            <p className={layoutStyles.contentText}>
              {t('worldClass.description')}
            </p>
            <motion.button
              className={layoutStyles.outlineButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('learnMore')}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
