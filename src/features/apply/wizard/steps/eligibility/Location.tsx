"use client";

import React, { useCallback, useRef } from 'react';
import { Bank, Globe, GlobeHemisphereWest } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { LocationDetailedType } from '../../types';
import { StepLayout } from '../../ui/StepLayout';
import styles from '@/features/apply/ApplyPage.module.scss';

const LOCATION_OPTIONS = [
  {
    value: 'germany' as const,
    color: '#E5D5A8',
    icon: Bank,
    titleKey: 'germany',
  },
  {
    value: 'eu_not_germany' as const,
    color: '#D5E8D5',
    icon: Globe,
    titleKey: 'euNotGermany',
  },
  {
    value: 'outside_eu' as const,
    color: '#A8D5E5',
    icon: GlobeHemisphereWest,
    titleKey: 'outsideEu',
  },
];

export function Location() {
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
    <StepLayout
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

              <span className={styles.locationConceptTitle}>
                {(() => {
                  const text = t(`location3.${option.titleKey}`);
                  if (option.value !== 'eu_not_germany') return text;
                  const parenIdx = text.indexOf('(');
                  if (parenIdx <= 0) return text;
                  return (
                    <>
                      <span style={{ color: '#ff5a14' }}>{text.slice(0, parenIdx).trim()}</span>
                      {' '}
                      {text.slice(parenIdx)}
                    </>
                  );
                })()}
              </span>
            </button>
          );
        })}
      </div>
    </StepLayout>
  );
}
