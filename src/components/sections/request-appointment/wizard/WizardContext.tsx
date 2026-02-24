"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useRouter } from '@/i18n/navigation';
import { WizardData, initialWizardData } from './types';

interface WizardContextType {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
  resetData: () => void;
  getRoleSuffix: () => 'Patient' | 'Companion';
}

const WizardContext = createContext<WizardContextType | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WizardData>(initialWizardData);

  const updateData = useCallback((updates: Partial<WizardData>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  const resetData = useCallback(() => {
    setData(initialWizardData);
  }, []);

  const getRoleSuffix = useCallback(() => {
    return data.patientRole === 'patient' ? 'Patient' : 'Companion';
  }, [data.patientRole]);

  return (
    <WizardContext.Provider value={{ data, updateData, resetData, getRoleSuffix }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}
