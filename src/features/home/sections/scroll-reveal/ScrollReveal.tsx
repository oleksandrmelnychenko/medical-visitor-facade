"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./ScrollReveal.module.scss";

export function ScrollReveal() {
  const t = useTranslations("common");
  const tHome = useTranslations("home.scrollReveal");
  const ref = useRef<HTMLDivElement>(null);
  const [isStaticMobile, setIsStaticMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)");

    const syncMode = () => {
      setIsStaticMobile(mediaQuery.matches);
    };

    syncMode();
    mediaQuery.addEventListener("change", syncMode);

    return () => {
      mediaQuery.removeEventListener("change", syncMode);
    };
  }, []);

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
    <div className={styles.wrap}>
      <div ref={ref} className={styles.anchor} data-home-section="outro" data-dark-bg="true">
        <motion.div
          className={styles.pinned}
          style={isStaticMobile ? undefined : { y, opacity }}
        >
          <div className={styles.surface}>
            <h2 className={styles.headline}>
              {tHome("headline")}
            </h2>
            <Link href="/apply" prefetch={false} className={styles.cta}>
              <span>{t("requestAppointment")}</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
