"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import styles from '../RequestAppointment/RequestAppointment.module.scss';
import { PatientType } from '../RequestAppointment';

interface PatientTypeSelectionProps {
  onSelect: (type: PatientType) => void;
}

export function PatientTypeSelection({ onSelect }: PatientTypeSelectionProps) {
  const t = useTranslations('appointment');
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleNavigate = (path: string) => {
    setIsExiting(true);
    setTimeout(() => {
      router.push(path);
    }, 300);
  };

  return (
    <div className={styles.applyStack}>
      <motion.div
        key="selection"
        className={styles.clientCardsGrid}
        initial={{ opacity: 0, y: 20 }}
        animate={isExiting ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* New Client Card - redirects to register */}
        <div
          onClick={() => handleNavigate('/register')}
          className={styles.clientCard}
          style={{ '--hover-color': '#E5D5A8' } as React.CSSProperties}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t('clientTypes.new.title')}
            </h3>
            <p className={styles.clientCardDesc}>
              {t('clientTypes.new.description')}
            </p>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>

        {/* Returning Client Card - redirects to login */}
        <div
          onClick={() => handleNavigate('/login')}
          className={styles.clientCard}
          style={{ '--hover-color': '#A8D5E5' } as React.CSSProperties}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t('clientTypes.returning.title')}
            </h3>
            <p className={styles.clientCardDesc}>
              {t('clientTypes.returning.description')}
            </p>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>

      </motion.div>
    </div>
  );
}
