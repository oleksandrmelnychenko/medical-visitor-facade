"use client";

import React, { useCallback, useRef } from 'react';
import { Globe2, Landmark } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../WizardContext';
import { LocationDetailedType } from '../types';
import { WizardStepLayout } from '../components/WizardStepLayout';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

function EuropeanUnionFlagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#1F4AA8" />
      <circle cx="12" cy="7" r="0.8" fill="#F7C948" />
      <circle cx="14.5" cy="7.67" r="0.8" fill="#F7C948" />
      <circle cx="16.33" cy="9.5" r="0.8" fill="#F7C948" />
      <circle cx="17" cy="12" r="0.8" fill="#F7C948" />
      <circle cx="16.33" cy="14.5" r="0.8" fill="#F7C948" />
      <circle cx="14.5" cy="16.33" r="0.8" fill="#F7C948" />
      <circle cx="12" cy="17" r="0.8" fill="#F7C948" />
      <circle cx="9.5" cy="16.33" r="0.8" fill="#F7C948" />
      <circle cx="7.67" cy="14.5" r="0.8" fill="#F7C948" />
      <circle cx="7" cy="12" r="0.8" fill="#F7C948" />
      <circle cx="7.67" cy="9.5" r="0.8" fill="#F7C948" />
      <circle cx="9.5" cy="7.67" r="0.8" fill="#F7C948" />
    </svg>
  );
}

const LOCATION_OPTIONS = [
  {
    value: 'germany' as const,
    color: '#E5D5A8',
    icon: Landmark,
    titleKey: 'germany',
  },
  {
    value: 'eu_not_germany' as const,
    color: '#D5E8D5',
    icon: EuropeanUnionFlagIcon,
    titleKey: 'euNotGermany',
  },
  {
    value: 'outside_eu' as const,
    color: '#A8D5E5',
    icon: Globe2,
    titleKey: 'outsideEu',
  },
];

export function LocationStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((locationDetailed: LocationDetailedType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    const selectedProgram = data.selectedProgram;
    const selectedMembership =
      locationDetailed !== 'germany' && selectedProgram
        ? selectedProgram === 'reserve'
          ? 'yes'
          : 'no'
        : null;

    updateData({
      location: locationDetailed === 'outside_eu' ? 'outside_eu' : 'eu',
      locationDetailed,
      ...(selectedMembership ? { wantsMembership: selectedMembership } : {}),
    });
    if (locationDetailed === 'germany') {
      router.push('/apply?type=new&step=health-intro');
    } else if (selectedMembership) {
      router.push('/apply?type=new&step=outside-travel');
    } else {
      router.push('/apply?type=new&step=become-member');
    }
  }, [data.selectedProgram, updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/apply?type=new&step=welcome');
  }, [router]);

  return (
    <WizardStepLayout
      title={t('location3.title')}
      subtitle={t('location3.subtitle')}
      contentClassName={styles.locationConceptSurface}
      innerClassName={styles.locationConceptInner}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.locationConceptGrid}>
        {LOCATION_OPTIONS.map((option) => {
          const Icon = option.icon;

          return (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={styles.locationConceptCard}
              style={{ '--hover-color': option.color } as React.CSSProperties}
              type="button"
            >
              <div className={styles.locationConceptCardHeader}>
                <div
                  className={
                    option.value === 'eu_not_germany'
                      ? `${styles.locationConceptIcon} ${styles.locationConceptIconEu}`
                      : styles.locationConceptIcon
                  }
                >
                  <Icon />
                </div>
              </div>

              <span className={styles.locationConceptTitle}>{t(`location3.${option.titleKey}`)}</span>
            </button>
          );
        })}
      </div>
    </WizardStepLayout>
  );
}
