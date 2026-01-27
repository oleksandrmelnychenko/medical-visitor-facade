"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Mouse } from "lucide-react";
import { cn } from "@/lib/utils";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./Hero.module.scss";

// Floating blob component
function FloatingBlob({
  color,
  size,
  top,
  left,
  morphDelay = 0,
  morphDuration = 15
}: {
  color: string;
  size: number;
  top: string;
  left: string;
  morphDelay?: number;
  morphDuration?: number;
}) {
  return (
    <div
      className={styles.blob}
      style={{
        background: color,
        width: size,
        height: size,
        top,
        left,
        animationDelay: `${morphDelay}s`,
        animationDuration: `${morphDuration}s`,
      }}
    />
  );
}

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className={cn(sectionStyles.section, styles.hero)}>
      {/* Floating blobs background */}
      <div className={styles.blobsContainer}>
        <FloatingBlob color="#D5A8E5" size={350} top="20%" left="-5%" morphDelay={0} morphDuration={20} />
        <FloatingBlob color="#A8D5E5" size={300} top="30%" left="85%" morphDelay={5} morphDuration={25} />
        <FloatingBlob color="#B5E5B0" size={250} top="70%" left="0%" morphDelay={10} morphDuration={22} />
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

            <motion.div
              className={styles.scrollIndicator}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Mouse className={styles.scrollMouse} />
              <div className={styles.scrollLine} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
