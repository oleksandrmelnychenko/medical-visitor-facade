import type { WizardData } from "./types";
import { sanitizeWizardData } from "./flow";

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

export function buildSalesforceBundle(
  data: WizardData,
  options: { flow: "eu" | "outside-eu"; locale: string }
): SalesforceBundle {
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

const CSV_COLUMNS = [
  "FirstName",
  "MiddleName",
  "LastName",
  "Suffix",
  "Email",
  "Phone",
  "PhoneType",
  "DateOfBirth",
  "LegalSex",
  "Street",
  "City",
  "State",
  "PostalCode",
  "Country",
  "LeadSource",
  "Description",
  "LocationDetailed__c",
  "WantsMembership__c",
  "CanTravel__c",
  "HasMedicalRecords__c",
  "RecordsInAcceptedLanguage__c",
  "HasTravelDocuments__c",
  "NeedsInterpreter__c",
  "PrimaryLanguage__c",
  "EmailConsent__c",
  "WhatsAppConsent__c",
  "WhatsAppNumber__c",
  "CurrentlyInTreatment__c",
  "HasHealthRiskForTravel__c",
  "PrimaryConcernText__c",
  "AdditionalConcerns__c",
  "Services__c",
  "HasInsurance__c",
  "InsuranceCoversGermany__c",
  "PreferredLocation__c",
  "VisitTiming__c",
  "ConsentAutomatedContact__c",
  "ConsentHealthcare__c",
  "ConsentOptOut__c",
  "ConsentPrivacyPractices__c",
  "Flow",
  "SubmittedAt",
  "Locale",
] as const;

export function bundleToCsvRow(
  bundle: SalesforceBundle
): Record<string, string> {
  const d = bundle.payload;
  return {
    FirstName: d.firstName,
    MiddleName: d.middleName,
    LastName: d.lastName,
    Suffix: d.suffix,
    Email: d.email,
    Phone: getPrimaryPhone(d),
    PhoneType: d.phones[0]?.type ?? "",
    DateOfBirth: d.dateOfBirth,
    LegalSex: d.legalSex ?? "",
    Street: d.streetAddress,
    City: d.city,
    State: d.state,
    PostalCode: d.zipCode,
    Country: d.country,
    LeadSource: "Website Apply Form",
    Description: d.message,
    LocationDetailed__c: d.locationDetailed ?? "",
    WantsMembership__c: d.wantsMembership ?? "",
    CanTravel__c: d.canTravel ?? "",
    HasMedicalRecords__c: d.hasMedicalRecords ?? "",
    RecordsInAcceptedLanguage__c: d.recordsInAcceptedLanguage ?? "",
    HasTravelDocuments__c: d.hasTravelDocuments ?? "",
    NeedsInterpreter__c: d.needsInterpreter ?? "",
    PrimaryLanguage__c: d.primaryLanguage,
    EmailConsent__c: d.emailConsent === null ? "" : d.emailConsent ? "true" : "false",
    WhatsAppConsent__c: d.whatsappConsent === null ? "" : d.whatsappConsent ? "true" : "false",
    WhatsAppNumber__c: d.whatsappNumber,
    CurrentlyInTreatment__c: d.currentlyInTreatment ?? "",
    HasHealthRiskForTravel__c: d.hasHealthRiskForTravel ?? "",
    PrimaryConcernText__c: d.primaryConcernText,
    AdditionalConcerns__c: d.additionalConcerns,
    Services__c: (d.services || []).join(";"),
    HasInsurance__c: d.hasInsurance ?? "",
    InsuranceCoversGermany__c: d.insuranceCoversGermany ?? "",
    PreferredLocation__c: d.preferredLocation ?? "",
    VisitTiming__c: d.visitTiming ?? "",
    ConsentAutomatedContact__c: d.consentAutomatedContact ? "true" : "false",
    ConsentHealthcare__c: d.consentHealthcare ? "true" : "false",
    ConsentOptOut__c: d.consentOptOut ? "true" : "false",
    ConsentPrivacyPractices__c: d.consentPrivacyPractices ? "true" : "false",
    Flow: bundle.flow,
    SubmittedAt: bundle.submittedAt,
    Locale: bundle.locale,
  };
}

function escapeCsvValue(value: string): string {
  if (
    value.includes(",") ||
    value.includes('"') ||
    value.includes("\n") ||
    value.includes("\r")
  ) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function generateCsv(row: Record<string, string>): string {
  const header = CSV_COLUMNS.map(escapeCsvValue).join(",");
  const values = CSV_COLUMNS.map((col) => escapeCsvValue(row[col] ?? "")).join(
    ","
  );
  return `\uFEFF${header}\r\n${values}\r\n`;
}

export async function submitSalesforceBundle(
  bundle: SalesforceBundle,
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
