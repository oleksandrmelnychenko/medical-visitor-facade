"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import styles from "./SectionHeader.module.scss";

type SectionHeaderProps = {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  titleAs?: "h1" | "h2" | "h3";
  variant?: "section" | "page";
};

export function SectionHeader({
  overline,
  title,
  subtitle,
  align = "center",
  titleAs,
  variant = "section",
}: SectionHeaderProps) {
  const TitleTag = titleAs ?? (variant === "page" ? "h1" : "h2");
  const titleClass = variant === "page" ? styles.titleHero : styles.title;
  const subtitleClass = variant === "page" ? styles.subtitleHero : styles.subtitle;

  return (
    <div
      className={cn(
        styles.header,
        variant === "page" && styles.headerHero,
        align === "left" && styles.alignLeft
      )}
    >
      {overline ? (
        <motion.p
          className={styles.overline}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {overline}
        </motion.p>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <TitleTag className={titleClass}>{title}</TitleTag>
      </motion.div>

      {subtitle ? (
        <motion.p
          className={subtitleClass}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
