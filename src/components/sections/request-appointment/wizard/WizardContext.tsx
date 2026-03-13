"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  readEncryptedJson,
  removeEncryptedJson,
  saveEncryptedJson,
} from "@/lib/client-encryption";
import { WizardData, initialWizardData } from "./types";
import { sanitizeWizardData } from "./flow";

interface WizardContextType {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
  resetData: () => void;
  getRoleSuffix: () => string;
  isDraftHydrated: boolean;
}

export const WIZARD_DRAFT_STORAGE_KEY = "gmed.apply.wizard.draft.v2";
const INITIAL_WIZARD_SERIALIZED = JSON.stringify(initialWizardData);

const WizardContext = createContext<WizardContextType | null>(null);

function hasWizardDataChanged(previous: WizardData, next: WizardData) {
  for (const key of Object.keys(next) as Array<keyof WizardData>) {
    if (previous[key] !== next[key]) {
      return true;
    }
  }

  return false;
}

export function WizardProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WizardData>(initialWizardData);
  const [isDraftHydrated, setIsDraftHydrated] = useState(false);
  const lastPersistedSerializedRef = useRef(INITIAL_WIZARD_SERIALIZED);

  useEffect(() => {
    let isCancelled = false;

    const loadDraft = async () => {
      const draft = await readEncryptedJson<WizardData>(WIZARD_DRAFT_STORAGE_KEY);

      if (isCancelled) {
        return;
      }

      if (draft) {
        const nextData = sanitizeWizardData({ ...initialWizardData, ...draft });
        lastPersistedSerializedRef.current = JSON.stringify(nextData);
        setData(nextData);
      } else {
        lastPersistedSerializedRef.current = INITIAL_WIZARD_SERIALIZED;
      }

      setIsDraftHydrated(true);
    };

    void loadDraft();

    return () => {
      isCancelled = true;
    };
  }, []);

  const updateData = useCallback((updates: Partial<WizardData>) => {
    setData((prev) => {
      const next = sanitizeWizardData({ ...prev, ...updates });
      return hasWizardDataChanged(prev, next) ? next : prev;
    });
  }, []);

  const resetData = useCallback(() => {
    lastPersistedSerializedRef.current = INITIAL_WIZARD_SERIALIZED;
    setData(initialWizardData);
    removeEncryptedJson(WIZARD_DRAFT_STORAGE_KEY);
  }, []);

  const getRoleSuffix = useCallback(() => {
    return "Patient";
  }, []);

  useEffect(() => {
    if (!isDraftHydrated) {
      return;
    }

    const timer = setTimeout(() => {
      const serialized = JSON.stringify(data);

      if (serialized === INITIAL_WIZARD_SERIALIZED) {
        if (lastPersistedSerializedRef.current !== INITIAL_WIZARD_SERIALIZED) {
          lastPersistedSerializedRef.current = INITIAL_WIZARD_SERIALIZED;
          removeEncryptedJson(WIZARD_DRAFT_STORAGE_KEY);
        }
        return;
      }

      if (serialized === lastPersistedSerializedRef.current) {
        return;
      }

      void saveEncryptedJson(WIZARD_DRAFT_STORAGE_KEY, data)
        .then(() => {
          lastPersistedSerializedRef.current = serialized;
        })
        .catch(() => {
          // Ignore client-side storage failures so the questionnaire remains usable.
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [data, isDraftHydrated]);

  return (
    <WizardContext.Provider
      value={{ data, updateData, resetData, getRoleSuffix, isDraftHydrated }}
    >
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
