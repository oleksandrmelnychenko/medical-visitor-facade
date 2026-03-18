"use client";

import React, { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import formStyles from "@/components/auth/Auth.module.scss";
import { COUNTRY_CODES, splitInternationalPhoneNumber } from "../../contact-phone";
import { useWizard } from "../../WizardContext";
import { validateEmail } from "../../validation";
import { WizardStepLayout } from "../../components/WizardStepLayout";
import styles from "../../../RequestAppointment/RequestAppointment.module.scss";

export function PhoneStep() {
  const t = useTranslations("appointment.newPatient");
  const router = useRouter();
  const { data, updateData } = useWizard();
  const initialPhone = splitInternationalPhoneNumber(data.phones[0]?.number);
  const [phone, setPhone] = useState(initialPhone.nationalNumber);
  const [email, setEmail] = useState(data.email || "");
  const [countryCode, setCountryCode] = useState(initialPhone.countryCode);
  const [touched, setTouched] = useState({ phone: false, email: false });

  const emailValid = validateEmail(email);
  const canContinue = !!phone.trim() && emailValid;

  const handleContinue = useCallback(() => {
    setTouched({ phone: true, email: true });
    if (!canContinue) return;
    const normalizedPhone = phone.startsWith('+') ? phone : `${countryCode}${phone}`;
    updateData({
      email: email.trim(),
      phones: [{ number: normalizedPhone, type: "mobile" }],
    });
    router.push("/apply?type=new&step=whatsapp-consent");
  }, [canContinue, phone, email, countryCode, updateData, router]);

  const handleBack = useCallback(() => {
    router.push("/apply?type=new&step=patient-dob");
  }, [router]);

  return (
    <WizardStepLayout
      title={t("phoneStep.title")}
      onBack={handleBack}
      backLabel={t("back")}
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardFormGrid}>
          <div className={formStyles.simpleFormGroup}>
            <label htmlFor="phone-number" className={formStyles.label}>{t("phoneStep.phoneNumber")}</label>
            <div className={styles.contactPhoneSurface}>
              <div className={styles.contactPhoneCode}>
                <select
                  value={countryCode}
                  onChange={e => setCountryCode(e.target.value)}
                  className={styles.contactPhoneSelect}
                  aria-label={t("phoneStep.phoneNumber")}
                >
                  {COUNTRY_CODES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {`${item.flag} ${item.code}`}
                    </option>
                  ))}
                </select>
              </div>
              <input
                id="phone-number"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                aria-required="true"
                className={styles.contactPhoneInput}
                autoFocus
              />
            </div>
          </div>
          <div className={formStyles.simpleFormGroup}>
            <label htmlFor="email-address" className={formStyles.label}>{t("phoneStep.emailLabel")}</label>
            <input
              id="email-address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
              aria-required="true"
              aria-invalid={touched.email && !emailValid}
              className={`${formStyles.simpleInput} ${touched.email && !emailValid ? formStyles.inputError : ''}`}
              autoComplete="email"
            />
            {touched.email && !emailValid && (
              <span className={formStyles.fieldError}>{t('validation.emailInvalid')}</span>
            )}
          </div>
        </div>
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={`${formStyles.submitButton} ${styles.wizardPrimaryButton}`}
          type="button"
        >
          {t("continue")}
        </button>
      </div>
    </WizardStepLayout>
  );
}
