"use client";

import React, { useState, useCallback } from 'react';
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
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);

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

  const handleToggleDetails = useCallback((event: React.MouseEvent<HTMLButtonElement>, value: string) => {
    event.preventDefault();
    event.stopPropagation();
    setExpandedInfo(prev => (prev === value ? null : value));
  }, []);

  return (
    <WizardStepLayout
      title={t('services.title')}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardCheckboxList}>
          {SERVICE_OPTIONS.map(opt => {
            const isExpanded = expandedInfo === opt.value;

            return (
              <label key={opt.value} className={formStyles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selected.includes(opt.value)}
                  onChange={() => toggle(opt.value)}
                  className={formStyles.checkboxInput}
                />
                <span className={formStyles.checkboxCustom} />
                <span className={formStyles.checkboxContent}>
                  <span className={formStyles.checkboxTitle}>{t(`services.${opt.key}`)}</span>
                  <button
                    type="button"
                    onClick={(event) => handleToggleDetails(event, opt.value)}
                    className={styles.serviceLearnMoreButton}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? t('services.showLess') : t(`services.${opt.key}LearnMore`)}
                  </button>
                  {isExpanded ? (
                    <span className={styles.serviceLearnMoreText}>{t(`services.${opt.key}Details`)}</span>
                  ) : null}
                </span>
              </label>
            );
          })}
          <label className={formStyles.checkboxLabel}>
            <input
              type="checkbox"
              checked={selected.includes('none')}
              onChange={() => toggle('none')}
              className={formStyles.checkboxInput}
            />
            <span className={formStyles.checkboxCustom} />
            <span className={formStyles.checkboxText}>{t('services.none')}</span>
          </label>
          <label className={formStyles.checkboxLabel}>
            <input
              type="checkbox"
              checked={selected.includes('not-sure')}
              onChange={() => toggle('not-sure')}
              className={formStyles.checkboxInput}
            />
            <span className={formStyles.checkboxCustom} />
            <span className={formStyles.checkboxText}>{t('services.notSure')}</span>
          </label>
        </div>
        <button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className={formStyles.submitButton}
          type="button"
        >
          {t('continue')}
        </button>
      </div>
    </WizardStepLayout>
  );
}
