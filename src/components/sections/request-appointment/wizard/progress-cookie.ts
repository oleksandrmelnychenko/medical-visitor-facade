import {
  type InsuranceCoverageType,
  initialWizardData,
  type LegalSexType,
  type LocationDetailedType,
  type PreferredLocationType,
  type VisitTimingType,
  type WizardData,
  type WizardStep,
  type YesNoType,
  type MedicalRecordsType,
} from "./types";
import { sanitizeWizardData } from "./flow";

export const WIZARD_PROGRESS_COOKIE_NAME = "gmed.apply.progress.v1";
const WIZARD_PROGRESS_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

const LOCATION_DETAILED_VALUES = ["germany", "eu_not_germany", "outside_eu"] as const;
const YES_NO_VALUES = ["yes", "no"] as const;
const MEDICAL_RECORDS_VALUES = ["yes", "no", "none"] as const;
const LEGAL_SEX_VALUES = ["female", "male", "diverse", "no_entry"] as const;
const INSURANCE_COVERAGE_VALUES = ["yes", "no", "not_sure"] as const;
const PREFERRED_LOCATION_VALUES = [
  "no_preference",
  "munich",
  "berlin",
  "hamburg",
  "cologne",
] as const;
const VISIT_TIMING_VALUES = ["asap", "next_few_months", "not_sure"] as const;

const WIZARD_STEPS = [
  "member-check",
  "welcome",
  "location",
  "become-member",
  "outside-travel",
  "outside-records",
  "records-language",
  "outside-documents",
  "outside-exit-travel",
  "outside-exit-records",
  "health-intro",
  "patient-name",
  "patient-dob",
  "phone",
  "whatsapp-consent",
  "email-consent",
  "no-contact-exit",
  "legal-sex",
  "interpreter",
  "primary-language",
  "services",
  "address",
  "concern-intro",
  "primary-concern",
  "health-risk",
  "current-treatment",
  "insurance-intro",
  "insurance",
  "insurance-coverage",
  "wrap-up-intro",
  "preferred-location",
  "visit-timing",
  "anything-else",
  "review",
] as const satisfies readonly WizardStep[];

type WizardProgressSnapshot = {
  memberCheckCompleted: boolean;
  welcomeCompleted: boolean;
  locationDetailed: LocationDetailedType;
  wantsMembership: YesNoType;
  canTravel: YesNoType;
  hasMedicalRecords: MedicalRecordsType;
  recordsInAcceptedLanguage: YesNoType;
  hasTravelDocuments: YesNoType;
  currentlyInTreatment: YesNoType;
  hasHealthRiskForTravel: YesNoType;
  hasName: boolean;
  legalSex: LegalSexType;
  dateOfBirthCompleted: boolean;
  primaryLanguageCompleted: boolean;
  needsInterpreter: YesNoType;
  emailConsent: boolean | null;
  emailCompleted: boolean;
  whatsappConsent: boolean | null;
  whatsappNumberCompleted: boolean;
  primaryPhoneCompleted: boolean;
  addressCompleted: boolean;
  primaryConcernCompleted: boolean;
  additionalConcernsCompleted: boolean;
  servicesSelected: boolean;
  hasInsurance: YesNoType;
  insuranceCoversGermany: InsuranceCoverageType;
  preferredLocation: PreferredLocationType;
  visitTiming: VisitTimingType;
  messageCompleted: boolean;
};

function hasText(value: string | null | undefined) {
  return Boolean(value?.trim());
}

function isOneOf<T extends string>(value: unknown, values: readonly T[]): value is T {
  return typeof value === "string" && values.includes(value as T);
}

function asBooleanOrNull(value: unknown): boolean | null {
  if (value === true || value === false) {
    return value;
  }

  return null;
}

function normalizeLocationDetailed(value: unknown): LocationDetailedType {
  return isOneOf(value, LOCATION_DETAILED_VALUES) ? value : null;
}

function normalizeYesNo(value: unknown): YesNoType {
  return isOneOf(value, YES_NO_VALUES) ? value : null;
}

function normalizeMedicalRecords(value: unknown): MedicalRecordsType {
  return isOneOf(value, MEDICAL_RECORDS_VALUES) ? value : null;
}

function normalizeLegalSex(value: unknown): LegalSexType {
  return isOneOf(value, LEGAL_SEX_VALUES) ? value : null;
}

function normalizeInsuranceCoverage(value: unknown): InsuranceCoverageType {
  return isOneOf(value, INSURANCE_COVERAGE_VALUES) ? value : null;
}

function normalizePreferredLocation(value: unknown): PreferredLocationType {
  return isOneOf(value, PREFERRED_LOCATION_VALUES) ? value : null;
}

function normalizeVisitTiming(value: unknown): VisitTimingType {
  return isOneOf(value, VISIT_TIMING_VALUES) ? value : null;
}

export function isWizardStep(value: string | null | undefined): value is WizardStep {
  return typeof value === "string" && (WIZARD_STEPS as readonly string[]).includes(value);
}

export function createWizardProgressSnapshot(data: WizardData): WizardProgressSnapshot {
  const cleanData = sanitizeWizardData(data);

  return {
    memberCheckCompleted: cleanData.memberCheckCompleted,
    welcomeCompleted: cleanData.welcomeCompleted,
    locationDetailed: cleanData.locationDetailed,
    wantsMembership: cleanData.wantsMembership,
    canTravel: cleanData.canTravel,
    hasMedicalRecords: cleanData.hasMedicalRecords,
    recordsInAcceptedLanguage: cleanData.recordsInAcceptedLanguage,
    hasTravelDocuments: cleanData.hasTravelDocuments,
    currentlyInTreatment: cleanData.currentlyInTreatment,
    hasHealthRiskForTravel: cleanData.hasHealthRiskForTravel,
    hasName: hasText(cleanData.firstName) && hasText(cleanData.lastName),
    legalSex: cleanData.legalSex,
    dateOfBirthCompleted: hasText(cleanData.dateOfBirth),
    primaryLanguageCompleted: hasText(cleanData.primaryLanguage),
    needsInterpreter: cleanData.needsInterpreter,
    emailConsent: cleanData.emailConsent,
    emailCompleted: hasText(cleanData.email),
    whatsappConsent: cleanData.whatsappConsent,
    whatsappNumberCompleted: hasText(cleanData.whatsappNumber),
    primaryPhoneCompleted: hasText(cleanData.phones[0]?.number),
    addressCompleted:
      hasText(cleanData.country) &&
      hasText(cleanData.streetAddress) &&
      hasText(cleanData.city) &&
      hasText(cleanData.zipCode),
    primaryConcernCompleted: hasText(cleanData.primaryConcernText),
    additionalConcernsCompleted: cleanData.additionalConcernsCompleted,
    servicesSelected: cleanData.services.length > 0,
    hasInsurance: cleanData.hasInsurance,
    insuranceCoversGermany: cleanData.insuranceCoversGermany,
    preferredLocation: cleanData.preferredLocation,
    visitTiming: cleanData.visitTiming,
    messageCompleted: hasText(cleanData.message),
  };
}

export function serializeWizardProgressSnapshot(snapshot: WizardProgressSnapshot) {
  return encodeURIComponent(JSON.stringify(snapshot));
}

export function parseWizardProgressSnapshot(
  value: string | undefined
): WizardProgressSnapshot | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as Partial<WizardProgressSnapshot>;

    return {
      memberCheckCompleted: parsed.memberCheckCompleted === true,
      welcomeCompleted: parsed.welcomeCompleted === true,
      locationDetailed: normalizeLocationDetailed(parsed.locationDetailed),
      wantsMembership: normalizeYesNo(parsed.wantsMembership),
      canTravel: normalizeYesNo(parsed.canTravel),
      hasMedicalRecords: normalizeMedicalRecords(parsed.hasMedicalRecords),
      recordsInAcceptedLanguage: normalizeYesNo(parsed.recordsInAcceptedLanguage),
      hasTravelDocuments: normalizeYesNo(parsed.hasTravelDocuments),
      currentlyInTreatment: normalizeYesNo(parsed.currentlyInTreatment),
      hasHealthRiskForTravel: normalizeYesNo(parsed.hasHealthRiskForTravel),
      hasName: parsed.hasName === true,
      legalSex: normalizeLegalSex(parsed.legalSex),
      dateOfBirthCompleted: parsed.dateOfBirthCompleted === true,
      primaryLanguageCompleted: parsed.primaryLanguageCompleted === true,
      needsInterpreter: normalizeYesNo(parsed.needsInterpreter),
      emailConsent: asBooleanOrNull(parsed.emailConsent),
      emailCompleted: parsed.emailCompleted === true,
      whatsappConsent: asBooleanOrNull(parsed.whatsappConsent),
      whatsappNumberCompleted: parsed.whatsappNumberCompleted === true,
      primaryPhoneCompleted: parsed.primaryPhoneCompleted === true,
      addressCompleted: parsed.addressCompleted === true,
      primaryConcernCompleted: parsed.primaryConcernCompleted === true,
      additionalConcernsCompleted: parsed.additionalConcernsCompleted === true,
      servicesSelected: parsed.servicesSelected === true,
      hasInsurance: normalizeYesNo(parsed.hasInsurance),
      insuranceCoversGermany: normalizeInsuranceCoverage(parsed.insuranceCoversGermany),
      preferredLocation: normalizePreferredLocation(parsed.preferredLocation),
      visitTiming: normalizeVisitTiming(parsed.visitTiming),
      messageCompleted: parsed.messageCompleted === true,
    };
  } catch {
    return null;
  }
}

export function snapshotToWizardData(snapshot: WizardProgressSnapshot): WizardData {
  return sanitizeWizardData({
    ...initialWizardData,
    memberCheckCompleted: snapshot.memberCheckCompleted,
    welcomeCompleted: snapshot.welcomeCompleted,
    locationDetailed: snapshot.locationDetailed,
    wantsMembership: snapshot.wantsMembership,
    canTravel: snapshot.canTravel,
    hasMedicalRecords: snapshot.hasMedicalRecords,
    recordsInAcceptedLanguage: snapshot.recordsInAcceptedLanguage,
    hasTravelDocuments: snapshot.hasTravelDocuments,
    currentlyInTreatment: snapshot.currentlyInTreatment,
    hasHealthRiskForTravel: snapshot.hasHealthRiskForTravel,
    firstName: snapshot.hasName ? "done" : "",
    lastName: snapshot.hasName ? "done" : "",
    legalSex: snapshot.legalSex,
    dateOfBirth: snapshot.dateOfBirthCompleted ? "done" : "",
    primaryLanguage: snapshot.primaryLanguageCompleted ? "done" : "",
    needsInterpreter: snapshot.needsInterpreter,
    emailConsent: snapshot.emailConsent,
    email: snapshot.emailCompleted ? "done@example.com" : "",
    whatsappConsent: snapshot.whatsappConsent,
    whatsappNumber: snapshot.whatsappNumberCompleted ? "done" : "",
    phones: [{ number: snapshot.primaryPhoneCompleted ? "done" : "", type: "mobile" }],
    country: snapshot.addressCompleted ? "done" : "",
    streetAddress: snapshot.addressCompleted ? "done" : "",
    city: snapshot.addressCompleted ? "done" : "",
    zipCode: snapshot.addressCompleted ? "done" : "",
    primaryConcernText: snapshot.primaryConcernCompleted ? "done" : "",
    additionalConcernsCompleted: snapshot.additionalConcernsCompleted,
    services: snapshot.servicesSelected ? ["selected"] : [],
    hasInsurance: snapshot.hasInsurance,
    insuranceCoversGermany: snapshot.insuranceCoversGermany,
    preferredLocation: snapshot.preferredLocation,
    visitTiming: snapshot.visitTiming,
    message: snapshot.messageCompleted ? "done" : "",
  });
}

export function getWizardDataFromCookieValue(value: string | undefined) {
  const snapshot = parseWizardProgressSnapshot(value);
  return snapshot ? snapshotToWizardData(snapshot) : initialWizardData;
}

export function persistWizardProgressCookie(snapshot: WizardProgressSnapshot | null) {
  if (typeof document === "undefined") {
    return;
  }

  if (!snapshot) {
    document.cookie = `${WIZARD_PROGRESS_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
    return;
  }

  document.cookie = [
    `${WIZARD_PROGRESS_COOKIE_NAME}=${serializeWizardProgressSnapshot(snapshot)}`,
    "Path=/",
    `Max-Age=${WIZARD_PROGRESS_COOKIE_MAX_AGE}`,
    "SameSite=Lax",
  ].join("; ");
}
