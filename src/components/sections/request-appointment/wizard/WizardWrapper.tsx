"use client";

import { WizardProvider } from './WizardContext';

export function WizardWrapper({ children }: { children: React.ReactNode }) {
  return <WizardProvider>{children}</WizardProvider>;
}
