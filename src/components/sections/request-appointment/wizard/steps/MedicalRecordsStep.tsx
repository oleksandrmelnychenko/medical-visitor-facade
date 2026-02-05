"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useWizard } from '../WizardContext';
import { MedicalRecordsType } from '../types';
import { WizardStepLayout } from '../components/WizardStepLayout';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

interface MedicalRecordsStepProps {
  wizardPath: 'eu' | 'outside-eu';
}

export function MedicalRecordsStep({ wizardPath }: MedicalRecordsStepProps) {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();

  const recordsKey = data.patientRole === 'patient' ? 'recordsPatient' : 'recordsCompanion';

  const handleSelect = (value: MedicalRecordsType) => {
    updateData({ hasMedicalRecords: value });
    if (value === 'yes') {
      router.push(`/register/${wizardPath}/step/documents`);
    } else if (value === 'no') {
      router.push(`/register/${wizardPath}/step/exit-records`);
    } else if (value === 'none') {
      router.push(`/register/${wizardPath}/step/documents`);
    }
  };

  const handleBack = () => {
    router.push(`/register/${wizardPath}/step/travel`);
  };

  return (
    <WizardStepLayout
      title={t(`${recordsKey}.title`)}
      showStepper={wizardPath === 'outside-eu'}
      activeStepIndex={0}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        <motion.div
          onClick={() => handleSelect('yes')}
          className={styles.clientCard}
          style={{ '--hover-color': '#E5D5A8' } as React.CSSProperties}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t(`${recordsKey}.yes`)}
            </h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </motion.div>

        <motion.div
          onClick={() => handleSelect('no')}
          className={styles.clientCard}
          style={{ '--hover-color': '#A8D5E5' } as React.CSSProperties}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t(`${recordsKey}.no`)}
            </h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </motion.div>

        <motion.div
          onClick={() => handleSelect('none')}
          className={styles.clientCard}
          style={{ '--hover-color': '#D5D5D5' } as React.CSSProperties}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t(`${recordsKey}.none`)}
            </h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </motion.div>
      </div>
    </WizardStepLayout>
  );
}
