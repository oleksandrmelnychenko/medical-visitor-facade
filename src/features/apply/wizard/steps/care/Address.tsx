"use client";

import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { validateMinLength, validateZipCode } from '../../validation';
import { StepLayout } from '../../ui/StepLayout';
import formStyles from '@/shared/ui/form/Form.module.scss';
import styles from '@/features/apply/ApplyPage.module.scss';

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

export function Address() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const [country, setCountry] = useState(data.country || '');
  const [street, setStreet] = useState(data.streetAddress || '');
  const [city, setCity] = useState(data.city || '');
  const [state, setState] = useState(data.state || '');
  const [postal, setPostal] = useState(data.zipCode || '');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [touched, setTouched] = useState({ street: false, city: false, postal: false });
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const countryTriggerRef = useRef<HTMLButtonElement>(null);
  const countryOptionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const countryLabelId = "address-country-label";
  const countryValueId = "address-country-value";
  const countryListId = "address-country-listbox";
  const streetErrorId = "address-street-error";
  const cityErrorId = "address-city-error";
  const postalErrorId = "address-postal-error";

  const selectedCountry = useMemo(
    () => COUNTRIES.find(item => item.value === country) ?? null,
    [country]
  );
  const selectedCountryIndex = useMemo(
    () => Math.max(0, COUNTRIES.findIndex(item => item.value === country)),
    [country]
  );

  const streetValid = validateMinLength(street, 3);
  const cityValid = validateMinLength(city, 2);
  const postalValid = validateZipCode(postal);
  const canContinue = !!country && streetValid && cityValid && postalValid;

  const focusCountryOption = useCallback((index: number) => {
    countryOptionRefs.current[index]?.focus();
  }, []);

  const closeCountryMenu = useCallback((restoreFocus = false) => {
    setIsCountryOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        countryTriggerRef.current?.focus();
      });
    }
  }, []);

  const handleContinue = useCallback(() => {
    setTouched({ street: true, city: true, postal: true });
    if (!canContinue) return;
    updateData({ country, streetAddress: street.trim(), city: city.trim(), state: state.trim(), zipCode: postal.trim() });
    router.push('/apply?type=new&step=primary-concern');
  }, [canContinue, country, street, city, state, postal, updateData, router]);

  const handleBack = useCallback(() => {
    router.push('/apply?type=new&step=services');
  }, [router]);

  const handleSelectCountry = useCallback((value: string) => {
    setCountry(value);
    closeCountryMenu(true);
  }, [closeCountryMenu]);

  const handleCountryTriggerKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }

    event.preventDefault();
    setIsCountryOpen(true);
  }, []);

  const handleCountryOptionKeyDown = useCallback((index: number, event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeCountryMenu(true);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusCountryOption((index + 1) % COUNTRIES.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusCountryOption((index - 1 + COUNTRIES.length) % COUNTRIES.length);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      focusCountryOption(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      focusCountryOption(COUNTRIES.length - 1);
    }
  }, [closeCountryMenu, focusCountryOption]);

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

  useEffect(() => {
    if (!isCountryOpen) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      countryOptionRefs.current[selectedCountryIndex]?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [isCountryOpen, selectedCountryIndex]);

  return (
    <StepLayout
      title={t('address.question')}
      onBack={handleBack}
      backLabel={t('back')}
      showTrustBanner
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardFormGrid}>
          <div className={formStyles.simpleFormGroup}>
            <span id={countryLabelId} className={formStyles.label}>
              {t('address.country')}
            </span>
            <div ref={countryDropdownRef} className={styles.countryDropdown}>
              <button
                ref={countryTriggerRef}
                type="button"
                className={`${formStyles.simpleInput} ${styles.countryDropdownTrigger}`}
                onClick={() => setIsCountryOpen(prev => !prev)}
                onKeyDown={handleCountryTriggerKeyDown}
                aria-haspopup="listbox"
                aria-expanded={isCountryOpen}
                aria-controls={countryListId}
                aria-labelledby={`${countryLabelId} ${countryValueId}`}
              >
                <span id={countryValueId} className={styles.countryDropdownValue}>
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
                    {COUNTRIES.map((item, index) => {
                      const isSelected = country === item.value;

                      return (
                        <button
                          ref={node => {
                            countryOptionRefs.current[index] = node;
                          }}
                          key={item.value}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={`${styles.countryDropdownOption} ${isSelected ? styles.countryDropdownOptionSelected : ''}`}
                          onClick={() => handleSelectCountry(item.value)}
                          onKeyDown={event => handleCountryOptionKeyDown(index, event)}
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
            <label htmlFor="address-street" className={formStyles.label}>{t('address.street')}</label>
            <input
              id="address-street"
              type="text"
              value={street}
              onChange={e => setStreet(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, street: true }))}
              aria-required="true"
              aria-invalid={touched.street && !streetValid}
              aria-describedby={touched.street && !streetValid ? streetErrorId : undefined}
              className={`${formStyles.simpleInput} ${touched.street && !streetValid ? formStyles.inputError : ''}`}
            />
            {touched.street && !streetValid && (
              <span id={streetErrorId} className={formStyles.fieldError}>{t('validation.streetMin')}</span>
            )}
          </div>
          <div className={formStyles.simpleFormGroup}>
            <label htmlFor="address-city" className={formStyles.label}>{t('address.city')}</label>
            <input
              id="address-city"
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, city: true }))}
              aria-required="true"
              aria-invalid={touched.city && !cityValid}
              aria-describedby={touched.city && !cityValid ? cityErrorId : undefined}
              className={`${formStyles.simpleInput} ${touched.city && !cityValid ? formStyles.inputError : ''}`}
            />
            {touched.city && !cityValid && (
              <span id={cityErrorId} className={formStyles.fieldError}>{t('validation.cityMin')}</span>
            )}
          </div>
          <div className={formStyles.simpleFormGroup}>
            <label htmlFor="address-state" className={formStyles.label}>{t('address.state')}</label>
            <input
              id="address-state"
              type="text"
              value={state}
              onChange={e => setState(e.target.value)}
              className={formStyles.simpleInput}
            />
          </div>
          <div className={formStyles.simpleFormGroup}>
            <label htmlFor="address-postal" className={formStyles.label}>{t('address.postalCode')}</label>
            <input
              id="address-postal"
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={postal}
              onChange={e => setPostal(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, postal: true }))}
              aria-required="true"
              aria-invalid={touched.postal && !postalValid}
              aria-describedby={touched.postal && !postalValid ? postalErrorId : undefined}
              className={`${formStyles.simpleInput} ${touched.postal && !postalValid ? formStyles.inputError : ''}`}
            />
            {touched.postal && !postalValid && (
              <span id={postalErrorId} className={formStyles.fieldError}>{t('validation.zipInvalid')}</span>
            )}
          </div>
        </div>
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={`${formStyles.submitButton} ${styles.welcomeContinueButton}`}
          type="button"
        >
          <span className={styles.welcomeContinueIcon} aria-hidden="true">
            <ArrowRight />
          </span>
          <span className={styles.welcomeContinueLabel}>{t('continue')}</span>
          <span className={styles.welcomeContinueDot} aria-hidden="true" />
        </button>
      </div>
    </StepLayout>
  );
}
