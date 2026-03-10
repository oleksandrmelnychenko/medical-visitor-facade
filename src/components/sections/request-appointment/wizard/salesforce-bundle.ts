"use client";

import type { WizardData } from "./types";

export interface SalesforceBundle {
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
    patientRole: WizardData["patientRole"];
    medicalArea: WizardData["medicalArea"];
    canTravel: WizardData["canTravel"];
    hasMedicalRecords: WizardData["hasMedicalRecords"];
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

export function buildSalesforceBundle(
  data: WizardData,
  options: { flow: "eu" | "outside-eu"; locale: string }
): SalesforceBundle {
  return {
    version: 1,
    source: "apply",
    flow: options.flow,
    submittedAt: new Date().toISOString(),
    patientType: "new",
    locale: options.locale,
    summary: {
      fullName: getFullName(data),
      email: data.email,
      primaryPhone: getPrimaryPhone(data),
      patientRole: data.patientRole,
      medicalArea: data.medicalArea,
      canTravel: data.canTravel,
      hasMedicalRecords: data.hasMedicalRecords,
    },
    payload: data,
  };
}

export function downloadSalesforceBundle(bundle: SalesforceBundle) {
  const filename = `salesforce-intake-${bundle.flow}-${bundle.submittedAt
    .replace(/[:.]/g, "-")
    .replace("T", "_")
    .replace("Z", "")}.json`;

  const blob = new Blob([JSON.stringify(bundle, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
