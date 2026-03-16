"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

const SERVICE_OPTIONS = [
  { key: 'driver', value: 'driver' },
  { key: 'concierge', value: 'concierge' },
  { key: 'medicalTransport', value: 'medical-transport' },
  { key: 'airAmbulance', value: 'air-ambulance' },
  { key: 'businessAviation', value: 'business-aviation' },
];

const EXCLUSIVE = ['none', 'not-sure'];

export function ServicesStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const [selected, setSelected] = useState<string[]>(data.services || []);
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const activeOption = SERVICE_OPTIONS.find(opt => opt.value === activeInfo) ?? null;
  const canRenderPortal = typeof document !== 'undefined';

  const toggle = useCallback((value: string) => {
    setSelected(prev => {
      if (EXCLUSIVE.includes(value)) {
        return prev.includes(value) ? [] : [value];
      }
      const withoutExclusive = prev.filter(s => !EXCLUSIVE.includes(s));
      return withoutExclusive.includes(value)
        ? withoutExclusive.filter(s => s !== value)
        : [...withoutExclusive, value];
    });
  }, []);

  const handleContinue = useCallback(() => {
    updateData({ services: selected });
    router.push('/apply?type=new&step=address');
  }, [selected, updateData, router]);

  const handleBack = useCallback(() => {
    router.push(
      data.needsInterpreter === 'yes'
        ? '/apply?type=new&step=primary-language'
        : '/apply?type=new&step=interpreter'
    );
  }, [data.needsInterpreter, router]);

  const handleOpenDetails = useCallback((event: React.MouseEvent<HTMLButtonElement>, value: string) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveInfo(value);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setActiveInfo(null);
  }, []);

  useEffect(() => {
    if (!activeInfo) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveInfo(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeInfo]);

  return (
    <WizardStepLayout
      title={t('services.title')}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardCheckboxList}>
          <div className={styles.serviceGroup}>
            {SERVICE_OPTIONS.map(opt => {
              return (
                <label key={opt.value} className={`${formStyles.checkboxLabel} ${styles.serviceOptionRow}`}>
                  <input
                    type="checkbox"
                    checked={selected.includes(opt.value)}
                    onChange={() => toggle(opt.value)}
                    className={formStyles.checkboxInput}
                  />
                  <span className={`${formStyles.checkboxCustom} ${styles.serviceOptionCheck}`} />
                  <span className={`${formStyles.checkboxContent} ${styles.serviceOptionContent}`}>
                    <span className={`${formStyles.checkboxTitle} ${styles.serviceOptionTitle}`}>{t(`services.${opt.key}`)}</span>
                    <button
                      type="button"
                      onClick={(event) => handleOpenDetails(event, opt.value)}
                      className={styles.serviceLearnMoreButton}
                      aria-haspopup="dialog"
                    >
                      {t(`services.${opt.key}LearnMore`)}
                    </button>
                  </span>
                </label>
              );
            })}
          </div>

          <div className={styles.serviceExclusiveGroup}>
            <label className={`${formStyles.checkboxLabel} ${styles.serviceOptionRow} ${styles.serviceOptionSecondary}`}>
              <input
                type="checkbox"
                checked={selected.includes('none')}
                onChange={() => toggle('none')}
                className={formStyles.checkboxInput}
              />
              <span className={`${formStyles.checkboxCustom} ${styles.serviceOptionCheck}`} />
              <span className={`${formStyles.checkboxText} ${styles.serviceOptionTitle}`}>{t('services.none')}</span>
            </label>
            <label className={`${formStyles.checkboxLabel} ${styles.serviceOptionRow} ${styles.serviceOptionSecondary}`}>
              <input
                type="checkbox"
                checked={selected.includes('not-sure')}
                onChange={() => toggle('not-sure')}
                className={formStyles.checkboxInput}
              />
              <span className={`${formStyles.checkboxCustom} ${styles.serviceOptionCheck}`} />
              <span className={`${formStyles.checkboxText} ${styles.serviceOptionTitle}`}>{t('services.notSure')}</span>
            </label>
          </div>
        </div>
        <button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className={`${formStyles.submitButton} ${styles.wizardPrimaryButton}`}
          type="button"
        >
          {t('continue')}
        </button>
      </div>

      {canRenderPortal && activeOption
        ? createPortal(
          <div className={styles.serviceModalBackdrop} role="presentation" onClick={handleCloseDetails}>
            <div
              className={styles.serviceModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.serviceModalHeader}>
                <h2 id="service-modal-title" className={styles.serviceModalTitle}>
                  {t(`services.${activeOption.key}`)}
                </h2>
                <button
                  type="button"
                  className={styles.serviceModalClose}
                  aria-label={t('services.close')}
                  onClick={handleCloseDetails}
                >
                  ×
                </button>
              </div>
              <p className={styles.serviceModalBody}>
                {t(`services.${activeOption.key}Details`)}
              </p>
              <div className={styles.serviceModalFooter}>
                <button
                  type="button"
                  className={styles.serviceModalCloseButton}
                  onClick={handleCloseDetails}
                >
                  {t('services.close')}
                </button>
              </div>
            </div>
          </div>
          ,
          document.body
        )
        : null}
    </WizardStepLayout>
  );
}
