"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import styles from '../request-appointment.module.scss';
import { PatientType } from '../RequestAppointment';

interface PatientTypeSelectionProps {
  onSelect: (type: PatientType) => void;
}

export function PatientTypeSelection({ onSelect }: PatientTypeSelectionProps) {
  const t = useTranslations('appointment');
  const router = useRouter();

  return (
    <div className={styles.applyStack}>
      <motion.div
        key="selection"
        className={styles.clientCardsGrid}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {/* New Client Card - redirects to register */}
        <motion.div
          onClick={() => router.push('/register')}
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

        {/* Returning Client Card - redirects to login */}
        <motion.div
          onClick={() => router.push('/login')}
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
    </div>
  );
}
