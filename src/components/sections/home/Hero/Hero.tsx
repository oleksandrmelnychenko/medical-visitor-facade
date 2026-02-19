"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Mouse, User, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./Hero.module.scss";

export function Hero() {
  const t = useTranslations('home.hero');
  const tCommon = useTranslations('common');

  return (
    <section className={cn(sectionStyles.section, styles.hero)}>
      {/* Hero video background */}
      <div className={styles.sketchScene} aria-hidden="true">
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/assets/hero_1_loop.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay} />
        <div className={styles.sketchVignette} />
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
              {t('titlePart1')} <span className={styles.heroTitleAccent}>{t('titleAccent')}</span> {t('titlePart2')}
            </motion.h1>

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
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <UserPlus className={styles.buttonArrow} />
                  {t('requestAppointment')}
                </motion.button>
              </Link>
              <Link href="/login">
                <motion.button
                  type="button"
                  className={styles.secondaryButton}
                  whileHover={{ scale: 0.96 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <User className={styles.buttonIcon} />
                  {tCommon('login')}
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
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Mouse className={styles.scrollMouse} />
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  );
}
