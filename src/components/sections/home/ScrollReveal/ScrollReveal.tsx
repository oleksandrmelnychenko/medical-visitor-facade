"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./ScrollReveal.module.scss";

export function ScrollReveal() {
  const t = useTranslations("common");
  const tHome = useTranslations("home.scrollReveal");
  const ref = useRef<HTMLDivElement>(null);

  // Visibility: fade in as anchor approaches viewport
  const { scrollYProgress: showProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const opacity = useTransform(showProgress, [0, 0.5], [0, 1]);

  // Scroll-away: slide up once fully revealed
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <div ref={ref} className={styles.anchor}>
      <motion.div className={styles.pinned} style={{ y, opacity }}>
        <div className={styles.surface}>
          <h2 className={styles.headline}>
            {tHome("headline")}
          </h2>
          <Link href="/apply" prefetch={false} className={styles.cta}>
            <span>{t("requestAppointment")}</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
