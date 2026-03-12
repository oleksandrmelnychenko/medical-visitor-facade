"use client";

import React, { useCallback, useRef } from 'react';
import { Globe2, Landmark, Map } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../WizardContext';
import { LocationDetailedType } from '../types';
import { WizardStepLayout } from '../components/WizardStepLayout';
import styles from '../../RequestAppointment/RequestAppointment.module.scss';

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
    icon: Map,
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
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleSelect = useCallback((locationDetailed: LocationDetailedType) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    updateData({
      location: locationDetailed === 'outside_eu' ? 'outside_eu' : 'eu',
      locationDetailed,
    });
    if (locationDetailed === 'germany') {
      router.push('/apply?type=new&step=health-intro');
    } else {
      router.push('/apply?type=new&step=become-member');
    }
  }, [updateData, router]);

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
                <div className={styles.locationConceptIcon}>
                  <Icon />
                </div>
              </div>

              <h3 className={styles.locationConceptTitle}>{t(`location3.${option.titleKey}`)}</h3>
            </button>
          );
        })}
      </div>
    </WizardStepLayout>
  );
}
