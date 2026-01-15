"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import pageStyles from '@/styles/page.module.scss';
import styles from '../request-appointment.module.scss';
import { PatientType } from '../RequestAppointment';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { cn } from '@/lib/utils';

interface PatientTypeSelectionProps {
  onSelect: (type: PatientType) => void;
}

export function PatientTypeSelection({ onSelect }: PatientTypeSelectionProps) {
  const t = useTranslations('appointment');

  return (
    <div className={pageStyles.stackLg}>
      <motion.div
        key="selection"
        className={pageStyles.gridThree}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {/* New Patients Card */}
        <motion.button
          onClick={() => onSelect("new")}
          className={cn(pageStyles.card, pageStyles.cardPadded, pageStyles.cardHover, styles.selectionCard)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
        >
          <ArrowUpRight className={styles.selectionIcon} />
          <h3 className={pageStyles.cardTitle}>
            {t('patientTypes.new.title')}
          </h3>
          <p className={pageStyles.cardText}>
            {t('patientTypes.new.description')}
          </p>
        </motion.button>

        {/* Returning Patients Card */}
        <motion.button
          onClick={() => onSelect("returning")}
          className={cn(pageStyles.card, pageStyles.cardPadded, pageStyles.cardHover, styles.selectionCard)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
        >
          <ArrowUpRight className={styles.selectionIcon} />
          <h3 className={pageStyles.cardTitle}>
            {t('patientTypes.returning.title')}
          </h3>
          <p className={pageStyles.cardText}>
            {t('patientTypes.returning.description')}
          </p>
        </motion.button>

        {/* Referring Physicians Card */}
        <motion.button
          onClick={() => onSelect("physician")}
          className={cn(pageStyles.card, pageStyles.cardPadded, pageStyles.cardHover, styles.selectionCard)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
        >
          <ArrowUpRight className={styles.selectionIcon} />
          <h3 className={pageStyles.cardTitle}>
            {t('patientTypes.physician.title')}
          </h3>
          <p className={pageStyles.cardText}>
            {t('patientTypes.physician.description')}
          </p>
        </motion.button>
      </motion.div>

      {/* Free Service Application Section */}
      <motion.div
        key="free-service"
        className={cn(pageStyles.gridTwo, styles.freeService)}
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
          <div className={styles.freeServiceBody}>
            <h3 className={pageStyles.sectionTitleSm}>{t('freeService.title')}</h3>

            <p className={pageStyles.textBody}>
              {t('freeService.description1')}
            </p>

            <p className={pageStyles.textBody}>
              {t('freeService.description2')}
            </p>

            <div className={styles.priorityCallout}>
              <p className={pageStyles.textStrong}>{t('freeService.priority')}</p>
              <p className={pageStyles.textSmall}>{t('freeService.priorityText')}</p>
            </div>

            <p className={cn(pageStyles.textSmall, styles.noteText)}>
              {t('freeService.note')}
            </p>

            <motion.button
              className={cn(pageStyles.buttonOutline, styles.applyButton)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
            >
              {t('freeService.applyButton')}
            </motion.button>
          </div>
        </motion.div>

        {/* Image - Right */}
        <motion.div
          className={styles.freeServiceMedia}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <ImageWithFallback
            src="/assets/dfb83cb5936b44ca2202c18d197b3196619183a4.png"
            alt="Healthcare financial assistance"
            className={styles.fullImageMedia}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
