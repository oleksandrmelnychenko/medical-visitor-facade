"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import styles from "./ScrollReveal.module.scss";

type Props = {
  children: ReactNode;
};

export function ScrollRevealMotion({ children }: Props) {
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

  const { scrollYProgress: showProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const opacity = useTransform(showProgress, [0, 0.5], [0, 1]);

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
          {children}
        </motion.div>
      </div>
    </div>
  );
}
