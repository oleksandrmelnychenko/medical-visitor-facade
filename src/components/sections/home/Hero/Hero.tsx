"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./Hero.module.scss";

// Decorative star/flower shape
function StarDecoration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor">
      <path d="M50 0 L54 46 L100 50 L54 54 L50 100 L46 54 L0 50 L46 46 Z" />
      <path d="M50 15 L52 48 L85 50 L52 52 L50 85 L48 52 L15 50 L48 48 Z" opacity="0.5" />
    </svg>
  );
}

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className={cn(sectionStyles.section, styles.hero)}>
      {/* Decorative elements */}
      <div className={styles.heroDecorations}>
        <StarDecoration className={cn(styles.decoration, styles.decorationLeft1)} />
        <StarDecoration className={cn(styles.decoration, styles.decorationLeft2)} />
        <StarDecoration className={cn(styles.decoration, styles.decorationLeft3)} />
        <StarDecoration className={cn(styles.decoration, styles.decorationRight1)} />
        <StarDecoration className={cn(styles.decoration, styles.decorationRight2)} />
        <StarDecoration className={cn(styles.decoration, styles.decorationBottom1)} />
        <StarDecoration className={cn(styles.decoration, styles.decorationBottom2)} />
      </div>
      <div className={cn(sectionStyles.container, styles.heroContainer)}>
        <div className={styles.heroWrapper}>
          <div className={styles.heroContent}>
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              {t('title')}
            </motion.h1>

            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              className={styles.heroActions}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            >
              <Link href="/apply">
                <motion.button
                  type="button"
                  className={styles.primaryButton}
                  whileHover={{ scale: 0.96 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {t('requestAppointment')}
                  <ArrowRight className={styles.buttonArrow} />
                </motion.button>
              </Link>
            </motion.div>

                      </div>
        </div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  );
}
