"use client";

import { useCallback, useRef } from 'react';
import { UserCheck, UserPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { BINARY_CHOICE_CARD_STYLES } from '../../choiceCardStyles';
import { StepLayout } from '../../ui/StepLayout';
import styles from '@/features/apply/ApplyPage.module.scss';

const CARD_STYLES = {
  member: BINARY_CHOICE_CARD_STYLES.yes,
  notMember: BINARY_CHOICE_CARD_STYLES.no,
};

export function MemberCheck() {
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
    updateData({ greetingCompleted: false, memberCheckCompleted: false });
    router.push('/apply?type=new&step=greeting');
  }, [router, updateData]);

  return (
    <StepLayout
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
                <UserCheck />
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
                <UserPlus />
            </span>
          </div>
          <h3 className={styles.locationConceptTitle}>{t('memberCheck.notMember')}</h3>
        </button>
      </div>
    </StepLayout>
  );
}
