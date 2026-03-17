"use client";

import { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useWizard } from '../../WizardContext';
import sectionStyles from '@/components/sections/shared/Section.module.scss';
import pageStyles from '@/styles/page.module.scss';
import styles from './WelcomeStep.module.scss';

export function WelcomeStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { updateData } = useWizard();
  const isNavigatingRef = useRef(false);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ welcomeCompleted: false });
    router.push('/apply?type=new&step=member-check');
  }, [router, updateData]);

  const handleContinue = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ welcomeCompleted: true });
    router.push('/apply?type=new&step=location');
  }, [router, updateData]);

  return (
    <div className={pageStyles.page}>
      <section className={cn(sectionStyles.section, styles.welcome)}>
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
                <p className={styles.overline}>{t('welcome.overline')}</p>
                <h1 className={styles.title}>{t('welcome.title')}</h1>
                <p className={styles.subtitle}>{t('welcome.subtitle')}</p>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                onClick={handleContinue}
                className={styles.ctaLink}
                type="button"
              >
                <span className={styles.ctaLabel}>{t('welcome.continue')}</span>
                <span className={styles.ctaArrow} aria-hidden="true">
                  <svg viewBox="0 0 40 40" fill="none" className={styles.ctaArrowIcon}>
                    <path
                      d="M18.67 4L22.91 8.24L14.31 16.83H36V22.83H14.31L22.91 31.43L18.67 35.67L2.76 19.76L18.67 4Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </button>

              <div className={styles.disclaimer}>
                <p className={styles.emergency}>{t('welcome.emergency')}</p>
                <Link href="/privacy-policy" className={styles.privacyLink}>
                  {t('welcome.privacyPolicy')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <span className={styles.cornerDecor} aria-hidden="true" />
      </section>
    </div>
  );
}
