"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useWizard } from '../../WizardContext';
import { PatientRoleType } from '../../types';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

export function EuPatientRoleStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { updateData } = useWizard();

  const handleSelect = (role: PatientRoleType) => {
    updateData({ patientRole: role });
    if (role === 'patient') {
      router.push('/register/eu/step/form');
    } else {
      router.push('/register/eu/step/companion');
    }
  };

  const handleBack = () => {
    router.push('/register');
  };

  return (
    <WizardStepLayout
      title={t('patientRole.title')}
      showStepper={true}
      activeStepIndex={0}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        <motion.div
          onClick={() => handleSelect('patient')}
          className={styles.clientCard}
          style={{ '--hover-color': '#E5D5A8' } as React.CSSProperties}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t('patientRole.yes')}
            </h3>
            <p className={styles.clientCardDesc}>
              {t('patientRole.yesDesc')}
            </p>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </motion.div>

        <motion.div
          onClick={() => handleSelect('companion')}
          className={styles.clientCard}
          style={{ '--hover-color': '#A8D5E5' } as React.CSSProperties}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t('patientRole.no')}
            </h3>
            <p className={styles.clientCardDesc}>
              {t('patientRole.noDesc')}
            </p>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </motion.div>
      </div>
    </WizardStepLayout>
  );
}
