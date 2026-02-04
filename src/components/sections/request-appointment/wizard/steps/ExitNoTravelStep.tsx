"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useWizard } from '../WizardContext';
import { WizardStepLayout } from '../components/WizardStepLayout';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

interface ExitNoTravelStepProps {
  wizardPath: 'eu' | 'outside-eu';
}

export function ExitNoTravelStep({ wizardPath }: ExitNoTravelStepProps) {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data } = useWizard();

  const exitKey = data.patientRole === 'patient' ? 'exitNoTravelPatient' : 'exitNoTravelCompanion';

  const handleBack = () => {
    router.push(`/register/${wizardPath}/step/travel`);
  };

  const handleExit = () => {
    router.push('/');
  };

  return (
    <WizardStepLayout
      title={t(`${exitKey}.title`)}
      subtitle={t(`${exitKey}.description`)}
      showStepper={wizardPath === 'outside-eu'}
      activeStepIndex={0}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        <motion.div
          onClick={handleExit}
          className={styles.clientCard}
          style={{ '--hover-color': '#E5D5A8' } as React.CSSProperties}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>
              {t(`${exitKey}.button`)}
            </h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </motion.div>
      </div>
    </WizardStepLayout>
  );
}
