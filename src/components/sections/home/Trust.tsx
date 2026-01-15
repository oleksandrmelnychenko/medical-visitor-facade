"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import layoutStyles from "@/components/sections/shared/layout.module.scss";
import sectionStyles from "@/components/sections/shared/section.module.scss";

export function Trust() {
  const t = useTranslations('home.trust');

  return (
    <section className={sectionStyles.section}>
      <div className={sectionStyles.container}>
        <SectionHeader
          overline={t('overline')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className={layoutStyles.twoColGrid}>
          {/* Text Content */}
          <motion.div
            className={layoutStyles.textContent}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className={layoutStyles.contentText}>
              {t('description')}
            </p>
            <p className={layoutStyles.contentTextBold}>
              {t('guarantee')}
            </p>
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
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YWN5JTIwc2VjdXJpdHklMjBtZWRpY2FsfGVufDF8fHx8MTc2NTc5MTU0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Privacy and security in healthcare"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
