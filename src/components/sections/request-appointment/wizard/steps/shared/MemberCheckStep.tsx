"use client";

import React, { useCallback, useRef } from 'react';
import { UserRoundCheck, UserRoundPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

const CARD_STYLES = {
  member: { '--hover-color': '#E5D5A8' } as React.CSSProperties,
  notMember: { '--hover-color': '#A8D5E5' } as React.CSSProperties,
};

export function MemberCheckStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleMember = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ memberCheckCompleted: true });
    router.push('/apply?type=new&step=account-check');
  }, [router, updateData]);

  const handleNotMember = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ memberCheckCompleted: true, accountCheckCompleted: true });
    router.push('/apply?type=new&step=welcome');
  }, [router, updateData]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('memberCheck.title')}
      contentClassName={styles.locationConceptSurface}
      innerClassName={styles.locationConceptInner}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.locationConceptGrid}>
        <button
          onClick={handleMember}
          className={styles.locationConceptCard}
          style={CARD_STYLES.member}
          type="button"
        >
          <div className={styles.locationConceptCardHeader}>
            <span className={styles.locationConceptIcon} aria-hidden="true">
                <UserRoundCheck />
            </span>
          </div>
          <h3 className={styles.locationConceptTitle}>{t('memberCheck.isMember')}</h3>
        </button>

        <button
          onClick={handleNotMember}
          className={styles.locationConceptCard}
          style={CARD_STYLES.notMember}
          type="button"
        >
          <div className={styles.locationConceptCardHeader}>
            <span className={styles.locationConceptIcon} aria-hidden="true">
                <UserRoundPlus />
            </span>
          </div>
          <h3 className={styles.locationConceptTitle}>{t('memberCheck.notMember')}</h3>
        </button>
      </div>
    </WizardStepLayout>
  );
}
