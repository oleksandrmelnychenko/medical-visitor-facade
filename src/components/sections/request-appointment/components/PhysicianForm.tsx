"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import pageStyles from '@/styles/page.module.scss';
import styles from '../request-appointment.module.scss';

interface PhysicianFormProps {
  onBack: () => void;
}

export function PhysicianForm({ onBack }: PhysicianFormProps) {
  const t = useTranslations('appointment.physician');

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
