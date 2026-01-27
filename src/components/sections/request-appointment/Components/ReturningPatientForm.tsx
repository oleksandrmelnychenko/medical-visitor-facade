"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import pageStyles from '@/styles/page.module.scss';
import styles from '../RequestAppointment/RequestAppointment.module.scss';

interface ReturningPatientFormProps {
  onBack: () => void;
}

export function ReturningPatientForm({ onBack }: ReturningPatientFormProps) {
  const t = useTranslations('appointment.returningPatient');

  return (
    <div className={cn(pageStyles.formCard, pageStyles.cardShadow, pageStyles.textCenter, pageStyles.stackMd, styles.stepCard)}>
      <h3 className={pageStyles.sectionTitleSm}>{t('title')}</h3>
      <p className={pageStyles.textBody}>{t('formPending')}</p>
      <button onClick={onBack} className={pageStyles.linkMuted} type="button">
        {t('back')}
      </button>
    </div>
  );
}
