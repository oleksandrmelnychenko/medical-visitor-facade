"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import styles from '../request-appointment.module.scss';
import { PatientType } from '../RequestAppointment';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface PatientTypeSelectionProps {
  onSelect: (type: PatientType) => void;
}

export function PatientTypeSelection({ onSelect }: PatientTypeSelectionProps) {
  const t = useTranslations('appointment');

  return (
    <>
      <motion.div
        key="selection"
        className={styles.cardGrid}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {/* New Patients Card */}
        <motion.button
          onClick={() => onSelect("new")}
          className={styles.card}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowUpRight className={styles.cardIcon} />
          <h3 className={styles.cardTitle}>
            {t('patientTypes.new.title')}
          </h3>
          <p className={styles.cardDescription}>
            {t('patientTypes.new.description')}
          </p>
        </motion.button>

        {/* Returning Patients Card */}
        <motion.button
          onClick={() => onSelect("returning")}
          className={styles.card}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowUpRight className={styles.cardIcon} />
          <h3 className={styles.cardTitle}>
            {t('patientTypes.returning.title')}
          </h3>
          <p className={styles.cardDescription}>
            {t('patientTypes.returning.description')}
          </p>
        </motion.button>

        {/* Referring Physicians Card */}
        <motion.button
          onClick={() => onSelect("physician")}
          className={styles.card}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowUpRight className={styles.cardIcon} />
          <h3 className={styles.cardTitle}>
            {t('patientTypes.physician.title')}
          </h3>
          <p className={styles.cardDescription}>
            {t('patientTypes.physician.description')}
          </p>
        </motion.button>
      </motion.div>

      {/* Free Service Application Section */}
      <motion.div
        key="free-service"
        className={styles.freeService}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Text Content - Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className={styles.freeServiceTitle}>
            {t('freeService.title')}
          </h3>

          <p className={styles.freeServiceText}>
            {t('freeService.description1')}
          </p>

          <p className={styles.freeServiceText}>
            {t('freeService.description2')}
          </p>

          <div className={styles.priorityCallout}>
            <p style={{ fontWeight: 500, marginBottom: '4px' }}>
              {t('freeService.priority')}
            </p>
            <p>
              {t('freeService.priorityText')}
            </p>
          </div>

          <p className={styles.freeServiceText} style={{ fontSize: '15px' }}>
            {t('freeService.note')}
          </p>

          <motion.button
            className={styles.applyButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('freeService.applyButton')}
          </motion.button>
        </motion.div>

        {/* Image - Right */}
        <motion.div
          className={styles.fullImage}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <ImageWithFallback
            src="/assets/dfb83cb5936b44ca2202c18d197b3196619183a4.png"
            alt="Healthcare financial assistance"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </>
  );
}
