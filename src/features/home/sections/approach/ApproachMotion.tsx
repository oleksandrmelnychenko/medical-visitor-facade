"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/shared/lib/cn";
import sectionStyles from "@/shared/ui/section/Section.module.scss";
import styles from "./Approach.module.scss";

type Props = {
  heading: ReactNode;
  principles: string[];
};

export function ApproachMotion({ heading, principles }: Props) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.32, 1], [56, 0, -26]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.38, 1, 1]);
  const listY = useTransform(scrollYProgress, [0, 0.36, 1], [72, 0, -18]);
  const listOpacity = useTransform(scrollYProgress, [0, 0.22, 1], [0.1, 1, 1]);

  return (
    <section
      ref={ref}
      id="approach"
      className={cn(sectionStyles.section, styles.fullSupport)}
      data-home-section="approach"
    >
      <div className={sectionStyles.container}>
        <div className={styles.layout} data-snap-anchor>
          <motion.div
            className={styles.headingRow}
            style={shouldReduceMotion ? undefined : { y: headingY, opacity: headingOpacity }}
          >
            <div className={styles.header}>{heading}</div>
          </motion.div>

          <div className={styles.body}>
            <motion.div
              className={styles.contentWrap}
              style={shouldReduceMotion ? undefined : { y: listY, opacity: listOpacity }}
            >
              <ol className={styles.principlesList}>
                {principles.map((text, index) => (
                  <motion.li
                    key={index}
                    className={styles.principleItem}
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 36 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                  >
                    <span className={styles.principleIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className={styles.principleBody}>
                      <p className={styles.principleText}>{text}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </div>
      <span className={styles.bottomSeam} aria-hidden />
    </section>
  );
}
