"use client";

import React, { useState, useCallback, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import { COUNTRY_CODES, splitInternationalPhoneNumber } from '../../contact-phone';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

const CARD_STYLES = {
  yes: { '--hover-color': '#E5D5A8' } as React.CSSProperties,
  no: { '--hover-color': '#A8D5E5' } as React.CSSProperties,
};

export function WhatsAppConsentStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData } = useWizard();
  const initialWhatsApp = splitInternationalPhoneNumber(data.whatsappNumber);
  const [consent, setConsent] = useState<'yes' | 'no' | null>(
    data.whatsappConsent === null ? null : data.whatsappConsent ? 'yes' : 'no'
  );
  const [number, setNumber] = useState(initialWhatsApp.nationalNumber);
  const [countryCode, setCountryCode] = useState(initialWhatsApp.countryCode);
  const isNavigatingRef = useRef(false);

  const handleYes = useCallback(() => {
    setConsent('yes');
  }, []);

  const handleNo = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ whatsappConsent: false, whatsappNumber: '' });
    router.push('/apply?type=new&step=email-consent');
  }, [updateData, router]);

  const handleNumberContinue = useCallback(() => {
    if (!number || isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    updateData({ whatsappConsent: true, whatsappNumber: `${countryCode}${number}` });
    router.push('/apply?type=new&step=email-consent');
  }, [countryCode, number, updateData, router]);

  const handleBack = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    router.push('/apply?type=new&step=phone');
  }, [router]);

  if (consent === 'yes') {
    return (
      <WizardStepLayout
        title={t('whatsappConsentNew.numberTitle')}
        showStepper
        activeStepIndex={1}
        onBack={() => setConsent(null)}
        backLabel={t('back')}
      >
        <div className={styles.wizardFormContainer}>
          <div className={styles.wizardFormGrid}>
            <div className={formStyles.simpleFormGroup}>
              <div style={{ display: 'flex', gap: 0 }}>
                <select
                  value={countryCode}
                  onChange={e => setCountryCode(e.target.value)}
                  className={formStyles.simpleInput}
                  style={{ width: '140px', borderRight: 'none' }}
                >
                  {COUNTRY_CODES.map(item => (
                    <option key={item.code} value={item.code}>{item.code}</option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={number}
                  onChange={e => setNumber(e.target.value)}
                  className={formStyles.simpleInput}
                  style={{ flex: 1 }}
                  autoFocus
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleNumberContinue}
            disabled={!number}
            className={formStyles.submitButton}
            type="button"
          >
            {t('continue')}
          </button>
        </div>
      </WizardStepLayout>
    );
  }

  return (
    <WizardStepLayout
      title={t('whatsappConsentNew.title')}
      showStepper
      activeStepIndex={1}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.clientCardsGrid}>
        <div onClick={handleYes} className={styles.clientCard} style={CARD_STYLES.yes}>
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>{t('whatsappConsentNew.yes')}</h3>
            <p className={styles.clientCardDesc}>{t('whatsappConsentNew.yesDisclaimer')}</p>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
        <div onClick={handleNo} className={styles.clientCard} style={CARD_STYLES.no}>
          <div className={styles.clientCardContent}>
            <h3 className={styles.clientCardTitle}>{t('whatsappConsentNew.no')}</h3>
          </div>
          <ChevronRight size={24} className={styles.clientCardArrow} />
        </div>
      </div>
    </WizardStepLayout>
  );
}
