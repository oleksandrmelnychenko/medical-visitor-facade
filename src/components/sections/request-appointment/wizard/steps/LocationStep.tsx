"use client";

import React, { useCallback, useRef } from 'react';
import { Globe2, Landmark } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useWizard } from '../WizardContext';
import { LocationDetailedType } from '../types';
import sectionStyles from '@/components/sections/shared/Section.module.scss';
import pageStyles from '@/styles/page.module.scss';
import styles from './LocationStep.module.scss';

function EuropeanUnionFlagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" />
      <circle cx="12" cy="7" r="0.8" fill="#fff" />
      <circle cx="14.5" cy="7.67" r="0.8" fill="#fff" />
      <circle cx="16.33" cy="9.5" r="0.8" fill="#fff" />
      <circle cx="17" cy="12" r="0.8" fill="#fff" />
      <circle cx="16.33" cy="14.5" r="0.8" fill="#fff" />
      <circle cx="14.5" cy="16.33" r="0.8" fill="#fff" />
      <circle cx="12" cy="17" r="0.8" fill="#fff" />
      <circle cx="9.5" cy="16.33" r="0.8" fill="#fff" />
      <circle cx="7.67" cy="14.5" r="0.8" fill="#fff" />
      <circle cx="7" cy="12" r="0.8" fill="#fff" />
      <circle cx="7.67" cy="9.5" r="0.8" fill="#fff" />
      <circle cx="9.5" cy="7.67" r="0.8" fill="#fff" />
    </svg>
  );
}

const LOCATION_OPTIONS = [
  {
    value: 'germany' as const,
    color: '#b8965a',
    icon: Landmark,
    titleKey: 'germany',
  },
  {
    value: 'eu_not_germany' as const,
    color: '#1F4AA8',
    icon: EuropeanUnionFlagIcon,
    titleKey: 'euNotGermany',
  },
  {
    value: 'outside_eu' as const,
    color: '#5a8a9a',
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
    <div className={pageStyles.page}>
      <section className={cn(sectionStyles.section, styles.location)}>
        <div className={sectionStyles.container}>
          <div className={styles.layout}>
            <button
              onClick={handleBack}
              className={styles.backCircle}
              type="button"
              aria-label={t('back')}
            >
              <svg viewBox="0 0 24 24" fill="none" className={styles.backCircleIcon}>
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className={styles.headingRow}>
              <div className={styles.header}>
                <p className={styles.overline}>{t('location3.overline')}</p>
                <h1 className={styles.title}>{t('location3.title')}</h1>
              </div>
            </div>

            <div className={styles.cardGrid}>
              {LOCATION_OPTIONS.map((option) => {
                const Icon = option.icon;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={styles.card}
                    style={{ '--hover-color': option.color } as React.CSSProperties}
                    type="button"
                  >
                    <div className={styles.cardHead}>
                      <span className={styles.cardIcon} aria-hidden="true">
                        <Icon />
                      </span>
                    </div>
                    <div className={styles.cardCopy}>
                      <h3 className={styles.cardTitle}>{t(`location3.${option.titleKey}`)}</h3>
                      <span className={styles.cardUnderline} aria-hidden="true" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <span className={styles.cornerDecor} aria-hidden="true" />
      </section>
    </div>
  );
}
