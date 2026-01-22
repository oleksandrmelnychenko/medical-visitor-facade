"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import styles from "./trust.module.scss";

export function Trust() {
  const t = useTranslations('home.trust');

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.p
          className={styles.overline}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {t('overline')}
        </motion.p>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t('title')}
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className={styles.description}>
            {t('description')}
          </p>
          <p className={styles.guarantee}>
            {t('guarantee')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
