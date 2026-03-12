"use client";

import React, { useCallback, useRef } from 'react';
import { ChevronRight, UserRoundCheck, UserRoundPlus } from 'lucide-react';
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
    router.push('/login');
  }, [router]);

  const handleNotMember = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ memberCheckCompleted: true });
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
      contentClassName={styles.selectionSurfacePlain}
      innerClassName={styles.memberCheckInner}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        <div
          onClick={handleMember}
          className={`${styles.clientCard} ${styles.memberCheckCard}`}
          style={CARD_STYLES.member}
        >
          <div className={styles.clientCardContent}>
            <div className={styles.memberCheckLead}>
              <span className={styles.memberCheckIcon} aria-hidden="true">
                <UserRoundCheck />
              </span>
              <h3 className={`${styles.clientCardTitle} ${styles.memberCheckCardTitle}`}>
                {t('memberCheck.isMember')}
              </h3>
            </div>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>

        <div
          onClick={handleNotMember}
          className={`${styles.clientCard} ${styles.memberCheckCard}`}
          style={CARD_STYLES.notMember}
        >
          <div className={styles.clientCardContent}>
            <div className={styles.memberCheckLead}>
              <span className={styles.memberCheckIcon} aria-hidden="true">
                <UserRoundPlus />
              </span>
              <h3 className={`${styles.clientCardTitle} ${styles.memberCheckCardTitle}`}>
                {t('memberCheck.notMember')}
              </h3>
            </div>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
      </div>
    </WizardStepLayout>
  );
}
