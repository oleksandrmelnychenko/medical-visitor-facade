"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  readEncryptedJson,
  removeEncryptedJson,
  saveEncryptedJson,
} from "@/lib/client-encryption";
import { WizardData, initialWizardData } from "./types";
import {
  createWizardProgressSnapshot,
  persistWizardProgressCookie,
  serializeWizardProgressSnapshot,
} from "./progress-cookie";
import { sanitizeWizardData } from "./flow";

interface WizardContextType {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
  resetData: () => void;
  getRoleSuffix: () => string;
  isDraftHydrated: boolean;
  uploadedMedicalFiles: File[];
  setUploadedMedicalFiles: Dispatch<SetStateAction<File[]>>;
}

const WIZARD_DRAFT_STORAGE_KEY = "gmed.apply.wizard.draft.v2";
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
  const [uploadedMedicalFiles, setUploadedMedicalFiles] = useState<File[]>([]);
  const dataRef = useRef(initialWizardData);
  const lastPersistedSerializedRef = useRef(INITIAL_WIZARD_SERIALIZED);
  const lastProgressSnapshotRef = useRef<string>("");

  useEffect(() => {
    let isCancelled = false;

    const loadDraft = async () => {
      const draft = await readEncryptedJson<WizardData>(WIZARD_DRAFT_STORAGE_KEY);

      if (isCancelled) {
        return;
      }

      if (draft) {
        const nextData = sanitizeWizardData({ ...initialWizardData, ...draft });
        const progressSnapshot = createWizardProgressSnapshot(nextData);

        dataRef.current = nextData;
        lastPersistedSerializedRef.current = JSON.stringify(nextData);
        lastProgressSnapshotRef.current = serializeWizardProgressSnapshot(progressSnapshot);
        persistWizardProgressCookie(progressSnapshot);
        setData(nextData);
      } else {
        dataRef.current = initialWizardData;
        lastPersistedSerializedRef.current = INITIAL_WIZARD_SERIALIZED;
        lastProgressSnapshotRef.current = "";
        persistWizardProgressCookie(null);
      }

      setIsDraftHydrated(true);
    };

    void loadDraft();

    return () => {
      isCancelled = true;
    };
  }, []);

  const updateData = useCallback((updates: Partial<WizardData>) => {
    const previous = dataRef.current;
    const next = sanitizeWizardData({ ...previous, ...updates });

    if (!hasWizardDataChanged(previous, next)) {
      return;
    }

    dataRef.current = next;
    const progressSnapshot = createWizardProgressSnapshot(next);
    lastProgressSnapshotRef.current = serializeWizardProgressSnapshot(progressSnapshot);
    persistWizardProgressCookie(progressSnapshot);
    setData(next);
  }, []);

  const resetData = useCallback(() => {
    dataRef.current = initialWizardData;
    lastPersistedSerializedRef.current = INITIAL_WIZARD_SERIALIZED;
    lastProgressSnapshotRef.current = "";
    setData(initialWizardData);
    setUploadedMedicalFiles([]);
    removeEncryptedJson(WIZARD_DRAFT_STORAGE_KEY);
    persistWizardProgressCookie(null);
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
        if (lastProgressSnapshotRef.current) {
          lastProgressSnapshotRef.current = "";
          persistWizardProgressCookie(null);
        }
        return;
      }

      const progressSnapshot = createWizardProgressSnapshot(data);
      const serializedProgressSnapshot = serializeWizardProgressSnapshot(progressSnapshot);

      if (serializedProgressSnapshot !== lastProgressSnapshotRef.current) {
        lastProgressSnapshotRef.current = serializedProgressSnapshot;
        persistWizardProgressCookie(progressSnapshot);
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
      value={{
        data,
        updateData,
        resetData,
        getRoleSuffix,
        isDraftHydrated,
        uploadedMedicalFiles,
        setUploadedMedicalFiles,
      }}
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
