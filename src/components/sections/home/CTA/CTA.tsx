"use client";

import { memo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import sectionStyles from "@/components/sections/shared/Section.module.scss";
import styles from "./CTA.module.scss";

export const CTA = memo(function CTA() {
  const t = useTranslations("home.cta");

  return (
    <section className={styles.section}>
      <div className={sectionStyles.container}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.overline}>{t("overline")}</p>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>

          <Link href="/apply" className={styles.button}>
            {t("bookConsultation")}
            <ArrowRight className={styles.buttonIcon} />
          </Link>

          <p className={styles.availability}>{t("availability")}</p>
        </motion.div>
      </div>
    </section>
  );
});
