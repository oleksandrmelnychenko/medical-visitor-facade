"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import pageStyles from '@/styles/page.module.scss';
import styles from '../RequestAppointment/RequestAppointment.module.scss';

export function NewPatientForm() {
  const t = useTranslations('appointment.newPatient');
  const [step, setStep] = useState<'intro' | 'isPatient' | 'travel' | 'form'>('intro');
  const [, setIsPatient] = useState<boolean | null>(null);
  const [, setWillingToTravel] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  if (step === 'intro') {
    return (
      <div className={cn(pageStyles.formCard, pageStyles.cardShadow, pageStyles.textCenter, pageStyles.stackMd, styles.stepCard)}>
        <h3 className={pageStyles.sectionTitleSm}>{t('intro.title')}</h3>
        <p className={pageStyles.textBody}>{t('intro.description')}</p>

        <motion.button
          onClick={() => setStep('isPatient')}
          className={cn(pageStyles.buttonSolid, styles.buttonLarge)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
        >
          {t('intro.continue')}
        </motion.button>

        <div className={cn(pageStyles.divider, styles.noticeBlock)}>
          <p className={pageStyles.textSmall}>
            <span className={pageStyles.textStrong}>{t('intro.emergency')}</span>
          </p>
          <p className={pageStyles.textSmall}>
            {t('intro.mentalHealth')}
          </p>
        </div>
      </div>
    );
  }

  if (step === 'isPatient') {
    return (
      <div className={cn(pageStyles.formCard, pageStyles.cardShadow, pageStyles.textCenter, pageStyles.stackMd, styles.stepCard)}>
        <h3 className={pageStyles.sectionTitleSm}>{t('isPatient.title')}</h3>

        <div className={cn(pageStyles.gridTwo, styles.choiceGrid)}>
          {/* Yes */}
          <motion.button
            onClick={() => { setIsPatient(true); setStep('travel'); }}
            className={cn(pageStyles.card, pageStyles.cardPadded, pageStyles.cardHover, styles.choiceCard)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
          >
            <div className={styles.choiceCardBody}>
              <User className={styles.choiceIcon} />
              <div>
                <h4 className={pageStyles.cardTitle}>{t('isPatient.yes')}</h4>
                <p className={pageStyles.textSmall}>{t('isPatient.yesDesc')}</p>
              </div>
            </div>
          </motion.button>

          {/* No */}
          <motion.button
            onClick={() => { setIsPatient(false); setStep('travel'); }}
            className={cn(pageStyles.card, pageStyles.cardPadded, pageStyles.cardHover, styles.choiceCard)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
          >
            <div className={styles.choiceCardBody}>
              <User className={styles.choiceIcon} />
              <div>
                <h4 className={pageStyles.cardTitle}>{t('isPatient.no')}</h4>
                <p className={pageStyles.textSmall}>{t('isPatient.noDesc')}</p>
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    );
  }

  if (step === 'travel') {
    return (
       <div className={cn(pageStyles.formCard, pageStyles.cardShadow, pageStyles.textCenter, pageStyles.stackMd, styles.stepCard)}>
          <h3 className={pageStyles.sectionTitleSm}>
            {t('travel.title')}
          </h3>
          <p className={pageStyles.textBody}>
            {t('travel.description')}
          </p>

          <div className={cn(pageStyles.gridTwo, styles.choiceGrid)}>
            <motion.button
              onClick={() => { setWillingToTravel(true); setStep('form'); }}
              className={cn(pageStyles.buttonOutline, pageStyles.buttonBlock)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              <span className={pageStyles.textStrong}>{t('travel.yes')}</span>
            </motion.button>

            <motion.button
              onClick={() => { setWillingToTravel(false); setStep('form'); }}
              className={cn(pageStyles.buttonOutline, pageStyles.buttonBlock)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              <span className={pageStyles.textStrong}>{t('travel.no')}</span>
            </motion.button>
          </div>
       </div>
    );
  }

  return (
    <div className={cn(pageStyles.formCard, pageStyles.cardShadow, pageStyles.stackMd, styles.stepCard)}>
      <h3 className={pageStyles.sectionTitleSm}>{t('form.title')}</h3>
      <form onSubmit={handleSubmit} className={pageStyles.stackMd}>
         <div className={styles.formSection}>
            <h4 className={styles.formSectionTitle}>{t('form.personal')}</h4>
            <div className={pageStyles.formGrid}>
               <input
                 placeholder={t('form.firstName')}
                 name="firstName"
                 value={formData.firstName}
                 onChange={handleChange}
                 required
                 className={pageStyles.input}
               />
               <input
                 placeholder={t('form.lastName')}
                 name="lastName"
                 value={formData.lastName}
                 onChange={handleChange}
                 required
                 className={pageStyles.input}
               />
               <input
                 placeholder={t('form.email')}
                 name="email"
                 type="email"
                 value={formData.email}
                 onChange={handleChange}
                 required
                 className={pageStyles.input}
               />
               <input
                 placeholder={t('form.phone')}
                 name="phone"
                 type="tel"
                 value={formData.phone}
                 onChange={handleChange}
                 required
                 className={pageStyles.input}
               />
               <input
                 type="date"
                 name="dateOfBirth"
                 value={formData.dateOfBirth}
                 onChange={handleChange}
                 required
                 className={pageStyles.input}
               />
            </div>
         </div>

         <div className={styles.formSection}>
            <h4 className={styles.formSectionTitle}>{t('form.appointmentDetails')}</h4>
            <div className={pageStyles.formGrid}>
              <div className={cn(styles.selectWrapper, styles.formRowFull)}>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={cn(pageStyles.select, styles.selectField)}
                  required
                >
                  <option value="">{t('form.selectService')}</option>
                  <option value="cardiology">{t('form.cardiology')}</option>
                  <option value="oncology">{t('form.oncology')}</option>
                  <option value="surgery">{t('form.surgery')}</option>
                  <option value="other">{t('form.other')}</option>
                </select>
                <ChevronDown className={styles.selectIcon} />
              </div>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
                className={pageStyles.input}
              />
              <div className={styles.selectWrapper}>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className={cn(pageStyles.select, styles.selectField)}
                  required
                >
                  <option value="">{t('form.selectTime')}</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                </select>
                <ChevronDown className={styles.selectIcon} />
              </div>
            </div>
         </div>

         <div className={styles.formSection}>
            <h4 className={styles.formSectionTitle}>{t('form.message')}</h4>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={cn(pageStyles.input, styles.textarea)}
              placeholder={t('form.reasonPlaceholder')}
            ></textarea>
         </div>

         <div className={styles.formActions}>
            <button type="submit" className={pageStyles.buttonSolid}>
              {t('form.submit')}
            </button>
         </div>
      </form>
    </div>
  );
}
