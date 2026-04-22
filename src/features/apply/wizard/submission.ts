import type { WizardData } from "./types";
import { sanitizeWizardData } from "./flow";

export interface SubmissionBundle {
  version: 1;
  source: "apply";
  flow: "eu" | "outside-eu";
  submittedAt: string;
  patientType: "new";
  locale: string;
  summary: {
    fullName: string;
    email: string;
    primaryPhone: string;
    locationDetailed: WizardData["locationDetailed"];
    canTravel: WizardData["canTravel"];
    hasMedicalRecords: WizardData["hasMedicalRecords"];
    recordsInAcceptedLanguage: WizardData["recordsInAcceptedLanguage"];
  };
  payload: WizardData;
}

function getFullName(data: WizardData) {
  return [data.firstName, data.middleName, data.lastName]
    .map((value) => value.trim())
    .filter(Boolean)
    .join(" ");
}

function getPrimaryPhone(data: WizardData) {
  return data.phones[0]?.number ?? "";
}

export function buildSubmissionBundle(
  data: WizardData,
  options: { flow: "eu" | "outside-eu"; locale: string }
): SubmissionBundle {
  const cleanData = sanitizeWizardData(data);

  return {
    version: 1,
    source: "apply",
    flow: options.flow,
    submittedAt: new Date().toISOString(),
    patientType: "new",
    locale: options.locale,
    summary: {
      fullName: getFullName(cleanData),
      email: cleanData.email,
      primaryPhone: getPrimaryPhone(cleanData),
      locationDetailed: cleanData.locationDetailed,
      canTravel: cleanData.canTravel,
      hasMedicalRecords: cleanData.hasMedicalRecords,
      recordsInAcceptedLanguage: cleanData.recordsInAcceptedLanguage,
    },
    payload: cleanData,
  };
}

export async function submitApplication(
  bundle: SubmissionBundle,
  uploadedFiles: File[] = []
): Promise<{ success: boolean; error?: string }> {
  const formData = new FormData();
  formData.append("bundle", JSON.stringify(bundle));

  for (const file of uploadedFiles) {
    formData.append("files", file);
  }

  const res = await fetch("/api/apply/submit", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return { success: false, error: data.error || "Submission failed" };
  }

  return { success: true };
}
