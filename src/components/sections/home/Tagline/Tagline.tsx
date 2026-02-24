"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./Tagline.module.scss";

export function Tagline() {
  const t = useTranslations('home.hero');

  return (
    <section className={cn(sectionStyles.section, styles.tagline)}>
      <div className={cn(sectionStyles.container, styles.container)}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t('titlePart1')} <span className={styles.accent}>{t('titleAccent')}</span> {t('titlePart2')}
        </motion.h2>
      </div>
    </section>
  );
}
