"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import styles from '../request-appointment.module.scss';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface NewPatientFormProps {
  onBack: () => void;
}

export function NewPatientForm({ onBack }: NewPatientFormProps) {
  void onBack;
  const t = useTranslations('appointment.newPatient');
  const [step, setStep] = useState<'intro' | 'isPatient' | 'travel' | 'form'>('intro');
  const [isPatient, setIsPatient] = useState<boolean | null>(null);
  const [willingToTravel, setWillingToTravel] = useState<boolean | null>(null);
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
    medicalHistory: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      medicalHistory: file,
    });
  };

  void isPatient;
  void willingToTravel;
  void handleFileChange;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  if (step === 'intro') {
    return (
      <div className="bg-white border-2 border-black p-8 md:p-12 text-center">
        <h3 className="text-gray-900 mb-6" style={{ fontSize: '28px' }}>
          {t('intro.title')}
        </h3>
        <p className="text-gray-700 mb-10 max-w-2xl mx-auto">
          {t('intro.description')}
        </p>

        <motion.button
          onClick={() => setStep('isPatient')}
          className="border-2 border-black text-black px-12 py-4 hover:bg-black hover:text-white transition-colors mb-12"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('intro.continue')}
        </motion.button>

        <div className="border-t-2 border-gray-200 pt-8 text-left">
          <p className="text-sm text-gray-700 mb-4">
            <strong className="text-gray-900">{t('intro.emergency')}</strong>
          </p>
          <p className="text-sm text-gray-700 mb-4">
            {t('intro.mentalHealth')}
          </p>
        </div>
      </div>
    );
  }

  if (step === 'isPatient') {
    return (
      <div className="bg-white border-2 border-black p-8 md:p-12 text-center">
        <h3 className="text-gray-900 mb-8" style={{ fontSize: '28px' }}>
          {t('isPatient.title')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Yes */}
          <motion.button
            onClick={() => { setIsPatient(true); setStep('travel'); }}
            className={styles.card}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
             <div className="flex flex-col items-center gap-4">
                <User className="w-12 h-12 text-black mb-2" />
                <div>
                  <h4 className="font-bold text-lg mb-2">{t('isPatient.yes')}</h4>
                   <p className="text-sm">{t('isPatient.yesDesc')}</p>
                </div>
             </div>
          </motion.button>

          {/* No */}
          <motion.button
            onClick={() => { setIsPatient(false); setStep('travel'); }}
            className={styles.card}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
             <div className="flex flex-col items-center gap-4">
                <User className="w-12 h-12 text-black mb-2" />
                <div>
                  <h4 className="font-bold text-lg mb-2">{t('isPatient.no')}</h4>
                   <p className="text-sm">{t('isPatient.noDesc')}</p>
                </div>
             </div>
          </motion.button>
        </div>
      </div>
    );
  }

  if (step === 'travel') {
    return (
       <div className="bg-white border-2 border-black p-8 md:p-12 text-center">
          <h3 className="text-gray-900 mb-6" style={{ fontSize: '28px' }}>
            {t('travel.title')}
          </h3>
          <p className="text-gray-700 mb-8">
            {t('travel.description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <motion.button
              onClick={() => { setWillingToTravel(true); setStep('form'); }}
               className="border-2 border-black px-12 py-4 hover:bg-black hover:text-white transition-colors"
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
            >
              <h4 className="font-bold">{t('travel.yes')}</h4>
            </motion.button>

            <motion.button
              onClick={() => { setWillingToTravel(false); setStep('form'); }}
               className="border-2 border-black px-12 py-4 hover:bg-black hover:text-white transition-colors"
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
            >
              <h4 className="font-bold">{t('travel.no')}</h4>
            </motion.button>
          </div>
       </div>
    );
  }

  return (
    <div className="bg-white border-2 border-black p-8 md:p-12">
      <h3 className="text-gray-900 mb-8" style={{ fontSize: '28px' }}>{t('form.title')}</h3>
      <form onSubmit={handleSubmit}>
         <div className="mb-10">
            <h4 className="text-gray-900 mb-6 font-medium">{t('form.personal')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Input placeholder={t('form.firstName')} name="firstName" value={formData.firstName} onChange={handleChange} required />
               <Input placeholder={t('form.lastName')} name="lastName" value={formData.lastName} onChange={handleChange} required />
               <Input placeholder={t('form.email')} name="email" type="email" value={formData.email} onChange={handleChange} required />
               <Input placeholder={t('form.phone')} name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
               <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
            </div>
         </div>

         <div className="mb-10">
            <h4 className="text-gray-900 mb-6 font-medium">{t('form.appointmentDetails')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 relative">
                   <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                      required
                    >
                      <option value="">{t('form.selectService')}</option>
                      <option value="cardiology">{t('form.cardiology')}</option>
                      <option value="oncology">{t('form.oncology')}</option>
                      <option value="surgery">{t('form.surgery')}</option>
                      <option value="other">{t('form.other')}</option>
                   </select>
                   <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
                </div>
                <Input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required />
                 <div className="relative">
                   <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                      required
                    >
                      <option value="">{t('form.selectTime')}</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                   </select>
                   <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
                </div>
            </div>
         </div>

         <div className="mb-10">
            <h4 className="text-gray-900 mb-6 font-medium">{t('form.message')}</h4>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={t('form.reasonPlaceholder')}
            ></textarea>
         </div>

         <div className="flex justify-center">
            <Button type="submit" size="lg">{t('form.submit')}</Button>
         </div>
      </form>
    </div>
  );
}
