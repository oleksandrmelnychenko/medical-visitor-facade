"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Mouse, User, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./Hero.module.scss";

export function Hero() {
  const t = useTranslations('home.hero');
  const tCommon = useTranslations('common');
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "10%"]
  );
  const overlayY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "5%"]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "-4%"]
  );

  return (
    <section ref={sectionRef} className={cn(sectionStyles.section, styles.hero)}>
      {/* Hero video background */}
      <div className={styles.sketchScene} aria-hidden="true">
        <motion.video
          className={cn(styles.heroVideo, styles.heroVideoDesktop)}
          style={{ y: videoY }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/assets/hero_1_loop.mp4" type="video/mp4" />
        </motion.video>
        <motion.video
          className={cn(styles.heroVideo, styles.heroVideoMobile)}
          style={{ y: videoY }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/assets/hero_1_loop_mobile.mp4" type="video/mp4" />
        </motion.video>
        <motion.div className={styles.videoOverlay} style={{ y: overlayY }} />
        <motion.div className={styles.sketchVignette} style={{ y: overlayY }} />
      </div>

      <motion.div className={cn(sectionStyles.container, styles.heroContainer)} style={{ y: contentY }}>
        <div className={styles.heroWrapper}>
          <div className={styles.heroContent}>
            <div className={styles.heroBrand}>
              <Image
                src="/assets/logo.png"
                alt="Medical Concierge Agency"
                width={320}
                height={86}
                className={styles.heroLogo}
                priority
              />
            </div>
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            >
              <span className={styles.heroTitleLine}>
                {t('titlePart1')} <span className={styles.heroTitleAccentWord}>{t('titleAccent')}</span>
              </span>
              <span className={styles.heroTitleLine}>{t('titlePart2')}</span>
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
      </motion.div>
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
