"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

interface ReturningPatientFormProps {
  onBack: () => void;
}

export function ReturningPatientForm({ onBack }: ReturningPatientFormProps) {
  const t = useTranslations('appointment.returningPatient');

  return (
    <div className="bg-white border-2 border-black p-8 md:p-12 text-center">
      <h3 className="text-gray-900 mb-6" style={{ fontSize: '28px' }}>
        {t('title')}
      </h3>
      <p className="mb-6">{t('formPending')}</p>
      <button onClick={onBack} className="text-gray-600 underline">{t('back')}</button>
    </div>
  );
}
