"use client";

import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import {
  readEncryptedJson,
  removeEncryptedJson,
  saveEncryptedJson,
} from "@/lib/client-encryption";
import { WizardData, initialWizardData } from "./types";

interface WizardContextType {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
  resetData: () => void;
  getRoleSuffix: () => "Patient" | "Companion";
}

export const WIZARD_DRAFT_STORAGE_KEY = "gmed.apply.wizard.draft.v2";

const WizardContext = createContext<WizardContextType | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WizardData>(initialWizardData);
  const [isDraftHydrated, setIsDraftHydrated] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const loadDraft = async () => {
      const draft = await readEncryptedJson<WizardData>(WIZARD_DRAFT_STORAGE_KEY);

      if (isCancelled) {
        return;
      }

      if (draft) {
        setData((prev) => ({ ...prev, ...draft }));
      }

      setIsDraftHydrated(true);
    };

    void loadDraft();

    return () => {
      isCancelled = true;
    };
  }, []);

  const updateData = useCallback((updates: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetData = useCallback(() => {
    setData(initialWizardData);
    removeEncryptedJson(WIZARD_DRAFT_STORAGE_KEY);
  }, []);

  const getRoleSuffix = useCallback(() => {
    return data.patientRole === "patient" ? "Patient" : "Companion";
  }, [data.patientRole]);

  useEffect(() => {
    if (!isDraftHydrated) {
      return;
    }

    if (JSON.stringify(data) === JSON.stringify(initialWizardData)) {
      removeEncryptedJson(WIZARD_DRAFT_STORAGE_KEY);
      return;
    }

    void saveEncryptedJson(WIZARD_DRAFT_STORAGE_KEY, data).catch(() => {
      // Ignore client-side storage failures so the questionnaire remains usable.
    });
  }, [data, isDraftHydrated]);

  return (
    <WizardContext.Provider value={{ data, updateData, resetData, getRoleSuffix }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
