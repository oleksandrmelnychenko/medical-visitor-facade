"use client";

import React, { useCallback, useRef } from 'react';
import { LogIn, UserRoundPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

const CARD_STYLES = {
  hasAccount: { '--hover-color': '#E5D5A8' } as React.CSSProperties,
  noAccount: { '--hover-color': '#A8D5E5' } as React.CSSProperties,
};

export function AccountCheckStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleHasAccount = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/login');
  }, [router]);

  const handleNoAccount = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ accountCheckCompleted: true });
    router.push('/apply?type=new&step=welcome');
  }, [router, updateData]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/apply?type=new&step=member-check');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('accountCheck.title')}
      contentClassName={styles.locationConceptSurface}
      innerClassName={styles.locationConceptInner}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.locationConceptGrid}>
        <button
          onClick={handleHasAccount}
          className={styles.locationConceptCard}
          style={CARD_STYLES.hasAccount}
          type="button"
        >
          <div className={styles.locationConceptCardHeader}>
            <span className={styles.locationConceptIcon} aria-hidden="true">
                <LogIn />
            </span>
          </div>
          <h3 className={styles.locationConceptTitle}>{t('accountCheck.hasAccount')}</h3>
        </button>

        <button
          onClick={handleNoAccount}
          className={styles.locationConceptCard}
          style={CARD_STYLES.noAccount}
          type="button"
        >
          <div className={styles.locationConceptCardHeader}>
            <span className={styles.locationConceptIcon} aria-hidden="true">
                <UserRoundPlus />
            </span>
          </div>
          <h3 className={styles.locationConceptTitle}>{t('accountCheck.noAccount')}</h3>
        </button>
      </div>
    </WizardStepLayout>
  );
}
