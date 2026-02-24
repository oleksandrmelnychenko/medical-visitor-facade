"use client";

import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import styles from '../RequestAppointment/RequestAppointment.module.scss';
import { PatientType } from '../RequestAppointment';

// Static style objects to prevent recreation on each render
const CARD_STYLES = {
  new: { '--hover-color': '#E5D5A8' } as React.CSSProperties,
  returning: { '--hover-color': '#A8D5E5' } as React.CSSProperties,
};

interface PatientTypeSelectionProps {
  onSelect: (type: PatientType) => void;
}

export function PatientTypeSelection({ onSelect }: PatientTypeSelectionProps) {
  const t = useTranslations('appointment');
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const isNavigatingRef = useRef(false);

  const handleNavigate = useCallback((path: string) => {
    // Prevent double-clicks
    if (isNavigatingRef.current || isExiting) return;
    isNavigatingRef.current = true;

    setIsExiting(true);
    setTimeout(() => {
      router.push(path);
    }, 300);
  }, [router, isExiting]);

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
          style={CARD_STYLES.new}
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
          style={CARD_STYLES.returning}
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
