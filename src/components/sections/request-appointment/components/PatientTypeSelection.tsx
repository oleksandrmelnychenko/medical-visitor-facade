"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import pageStyles from '@/styles/page.module.scss';
import styles from '../request-appointment.module.scss';
import { PatientType } from '../RequestAppointment';

interface PatientTypeSelectionProps {
  onSelect: (type: PatientType) => void;
}

export function PatientTypeSelection({ onSelect }: PatientTypeSelectionProps) {
  const t = useTranslations('appointment');

  return (
    <div className={pageStyles.stackLg}>
      <motion.div
        key="selection"
        className={styles.clientCardsGrid}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {/* New Client Card */}
        <motion.div
          onClick={() => onSelect("new")}
          className={styles.clientCard}
          style={{ '--hover-color': '#E5D5A8' } as React.CSSProperties}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h3 className={styles.clientCardTitle}>
            {t('clientTypes.new.title')}
          </h3>
          <p className={styles.clientCardDesc}>
            {t('clientTypes.new.description')}
          </p>
        </motion.div>

        {/* Returning Client Card */}
        <motion.div
          onClick={() => onSelect("returning")}
          className={styles.clientCard}
          style={{ '--hover-color': '#A8D5E5' } as React.CSSProperties}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className={styles.clientCardTitle}>
            {t('clientTypes.returning.title')}
          </h3>
          <p className={styles.clientCardDesc}>
            {t('clientTypes.returning.description')}
          </p>
        </motion.div>

      </motion.div>

      {/* Free Service Card */}
      <motion.div
        key="free-service"
        className={styles.freeServiceCard}
        style={{ '--hover-color': '#B5E5B0' } as React.CSSProperties}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className={styles.freeServiceTitle}>{t('freeService.title')}</h3>
        <p className={styles.freeServiceDesc}>{t('freeService.description2')}</p>
        <motion.button
          className={styles.freeServiceButton}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
        >
          {t('freeService.applyButton')}
        </motion.button>
      </motion.div>
    </div>
  );
}
