"use client";

import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

const COUNTRIES = [
  { value: 'Germany', flag: '🇩🇪' },
  { value: 'United States', flag: '🇺🇸' },
  { value: 'United Kingdom', flag: '🇬🇧' },
  { value: 'France', flag: '🇫🇷' },
  { value: 'Italy', flag: '🇮🇹' },
  { value: 'Spain', flag: '🇪🇸' },
  { value: 'Netherlands', flag: '🇳🇱' },
  { value: 'Belgium', flag: '🇧🇪' },
  { value: 'Austria', flag: '🇦🇹' },
  { value: 'Switzerland', flag: '🇨🇭' },
  { value: 'Poland', flag: '🇵🇱' },
  { value: 'Belarus', flag: '🇧🇾' },
  { value: 'Moldova', flag: '🇲🇩' },
  { value: 'Ukraine', flag: '🇺🇦' },
  { value: 'Russia', flag: '🇷🇺' },
  { value: 'Georgia', flag: '🇬🇪' },
  { value: 'Armenia', flag: '🇦🇲' },
  { value: 'Azerbaijan', flag: '🇦🇿' },
  { value: 'Kazakhstan', flag: '🇰🇿' },
  { value: 'Uzbekistan', flag: '🇺🇿' },
  { value: 'Kyrgyzstan', flag: '🇰🇬' },
  { value: 'Tajikistan', flag: '🇹🇯' },
  { value: 'Turkmenistan', flag: '🇹🇲' },
  { value: 'China', flag: '🇨🇳' },
  { value: 'Japan', flag: '🇯🇵' },
  { value: 'South Korea', flag: '🇰🇷' },
  { value: 'India', flag: '🇮🇳' },
  { value: 'Brazil', flag: '🇧🇷' },
  { value: 'Mexico', flag: '🇲🇽' },
  { value: 'Australia', flag: '🇦🇺' },
  { value: 'Canada', flag: '🇨🇦' },
  { value: 'Saudi Arabia', flag: '🇸🇦' },
  { value: 'UAE', flag: '🇦🇪' },
  { value: 'Turkey', flag: '🇹🇷' },
  { value: 'Egypt', flag: '🇪🇬' },
  { value: 'South Africa', flag: '🇿🇦' },
  { value: 'Other', flag: '🌍' },
] as const;

export function AddressStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const [country, setCountry] = useState(data.country || '');
  const [street, setStreet] = useState(data.streetAddress || '');
  const [city, setCity] = useState(data.city || '');
  const [state, setState] = useState(data.state || '');
  const [postal, setPostal] = useState(data.zipCode || '');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const countryListId = "address-country-listbox";

  const selectedCountry = useMemo(
    () => COUNTRIES.find(item => item.value === country) ?? null,
    [country]
  );

  const handleContinue = useCallback(() => {
    if (!country || !street || !city || !postal) return;
    updateData({ country, streetAddress: street, city, state, zipCode: postal });
    router.push('/apply?type=new&step=concern-intro');
  }, [country, street, city, state, postal, updateData, router]);

  const handleBack = useCallback(() => {
    router.push('/apply?type=new&step=services');
  }, [router]);

  const handleSelectCountry = useCallback((value: string) => {
    setCountry(value);
    setIsCountryOpen(false);
  }, []);

  useEffect(() => {
    if (!isCountryOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!countryDropdownRef.current?.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCountryOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCountryOpen]);

  return (
    <WizardStepLayout
      title={t('address.question')}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardFormGrid}>
          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('address.country')}</label>
            <div ref={countryDropdownRef} className={styles.countryDropdown}>
              <button
                type="button"
                className={`${formStyles.simpleInput} ${styles.countryDropdownTrigger}`}
                onClick={() => setIsCountryOpen(prev => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isCountryOpen}
                aria-controls={countryListId}
              >
                <span className={styles.countryDropdownValue}>
                  {selectedCountry ? (
                    <>
                      <span className={styles.countryDropdownFlag} aria-hidden="true">{selectedCountry.flag}</span>
                      <span>{selectedCountry.value}</span>
                    </>
                  ) : (
                    <span className={styles.countryDropdownPlaceholder}>{t('address.selectCountry')}</span>
                  )}
                </span>
                <ChevronDown className={styles.countryDropdownChevron} aria-hidden="true" />
              </button>

              {isCountryOpen ? (
                <div className={styles.countryDropdownPanel}>
                  <div
                    id={countryListId}
                    className={styles.countryDropdownList}
                    role="listbox"
                    aria-label={t('address.country')}
                  >
                    {COUNTRIES.map(item => {
                      const isSelected = country === item.value;

                      return (
                        <button
                          key={item.value}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={`${styles.countryDropdownOption} ${isSelected ? styles.countryDropdownOptionSelected : ''}`}
                          onClick={() => handleSelectCountry(item.value)}
                        >
                          <span className={styles.countryDropdownOptionMain}>
                            <span className={styles.countryDropdownFlag} aria-hidden="true">{item.flag}</span>
                            <span>{item.value}</span>
                          </span>
                          {isSelected ? <Check className={styles.countryDropdownCheck} aria-hidden="true" /> : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('address.street')}</label>
            <input
              type="text"
              value={street}
              onChange={e => setStreet(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>
          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('address.city')}</label>
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>
          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('address.state')}</label>
            <input
              type="text"
              value={state}
              onChange={e => setState(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>
          <div className={formStyles.simpleFormGroup}>
            <label className={formStyles.label}>{t('address.postalCode')}</label>
            <input
              type="text"
              value={postal}
              onChange={e => setPostal(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>
        </div>
        <button
          onClick={handleContinue}
          disabled={!country || !street || !city || !postal}
          className={`${formStyles.submitButton} ${styles.wizardPrimaryButton}`}
          type="button"
        >
          {t('continue')}
        </button>
      </div>
    </WizardStepLayout>
  );
}
