"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "@/i18n/navigation";
import styles from "./PageTransition.module.scss";

type PageTransitionProps = {
  children: React.ReactNode;
};

const CONTENT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={styles.staticContent}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className={styles.routeFrame}
      >
        <motion.div
          className={styles.screenWipe}
          initial={{ y: "100%" }}
          animate={{ y: "-100%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.72, ease: CONTENT_EASE }}
        />
        <motion.div
          className={styles.routeContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.98 }}
          transition={{
            opacity: { duration: 0.28, delay: 0.16, ease: CONTENT_EASE },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
