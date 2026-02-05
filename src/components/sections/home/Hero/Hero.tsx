"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Mouse } from "lucide-react";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./Hero.module.scss";

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className={cn(sectionStyles.section, styles.hero)}>
      {/* Video background - CSS handles which video is visible */}
      <div className={styles.videoContainer}>
        {/* Desktop video */}
        <video
          className={cn(styles.heroVideo, styles.desktopVideo)}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/hero_web.mp4" type="video/mp4" />
        </video>
        {/* Mobile video */}
        <video
          className={cn(styles.heroVideo, styles.mobileVideo)}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/hero_mobile.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay} />
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
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Mouse className={styles.scrollMouse} />
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  );
}
