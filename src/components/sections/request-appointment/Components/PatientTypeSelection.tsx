"use client";

import React from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import styles from "../RequestAppointment/RequestAppointment.module.scss";
import { PatientType } from "../RequestAppointment";

// Static style objects to prevent recreation on each render
const CARD_STYLES = {
  new: { '--hover-color': '#E5D5A8' } as React.CSSProperties,
  returning: { '--hover-color': '#A8D5E5' } as React.CSSProperties,
};

interface PatientTypeSelectionProps {
  onSelect: (type: PatientType) => void;
}

export function PatientTypeSelection({ onSelect }: PatientTypeSelectionProps) {
  const t = useTranslations("appointment");

  return (
    <div className={styles.applyStack}>
      <motion.div
        key="selection"
        className={styles.clientCardsGrid}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div
          onClick={() => onSelect("new")}
          className={styles.clientCard}
          style={CARD_STYLES.new}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t("clientTypes.new.title")}
            </h3>
            <p className={styles.clientCardDesc}>
              {t("clientTypes.new.description")}
            </p>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>

        <div
          onClick={() => onSelect("returning")}
          className={styles.clientCard}
          style={CARD_STYLES.returning}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t("clientTypes.returning.title")}
            </h3>
            <p className={styles.clientCardDesc}>
              {t("clientTypes.returning.description")}
            </p>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
      </motion.div>
    </div>
  );
}
