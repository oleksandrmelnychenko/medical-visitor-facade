export type WizardStep =
  | 'member-check'
  | 'welcome'
  | 'location'
  | 'become-member'
  | 'outside-travel'
  | 'outside-records'
  | 'records-language'
  | 'outside-documents'
  | 'outside-exit-travel'
  | 'outside-exit-records'
  | 'health-intro'
  | 'patient-name'
  | 'patient-dob'
  | 'phone'
  | 'whatsapp-consent'
  | 'email-consent'
  | 'no-contact-exit'
  | 'legal-sex'
  | 'interpreter'
  | 'primary-language'
  | 'services'
  | 'address'
  | 'concern-intro'
  | 'primary-concern'
  | 'health-risk'
  | 'current-treatment'
  | 'additional-concerns'
  | 'insurance-intro'
  | 'insurance'
  | 'insurance-coverage'
  | 'wrap-up-intro'
  | 'preferred-location'
  | 'visit-timing'
  | 'anything-else'
  | 'review';

export type LocationType = 'eu' | 'outside_eu' | null;
export type LocationDetailedType = 'germany' | 'eu_not_germany' | 'outside_eu' | null;
export type YesNoType = 'yes' | 'no' | null;
export type MedicalRecordsType = 'yes' | 'no' | 'none' | null;
export type LegalSexType = 'female' | 'male' | 'diverse' | 'no_entry' | null;
export type PhoneType = 'mobile' | 'home' | 'work';
export type PreferredLocationType = 'no_preference' | 'munich' | 'berlin' | 'hamburg' | 'cologne' | null;
export type VisitTimingType = 'asap' | 'next_few_months' | 'not_sure' | null;
export type InsuranceCoverageType = 'yes' | 'no' | 'not_sure' | null;

export interface PhoneEntry {
  number: string;
  type: PhoneType;
}

export interface WizardData {
  // Location & path
  location: LocationType;
  locationDetailed: LocationDetailedType;
  memberCheckCompleted: boolean;
  welcomeCompleted: boolean;
  // Member
  wantsMembership: YesNoType;
  // Outside-EU eligibility
  canTravel: YesNoType;
  hasMedicalRecords: MedicalRecordsType;
  recordsInAcceptedLanguage: YesNoType;
  hasTravelDocuments: YesNoType;
  // Health
  currentlyInTreatment: YesNoType;
  hasHealthRiskForTravel: YesNoType;
  // Patient info
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  legalSex: LegalSexType;
  dateOfBirth: string;
  // Language & interpreter
  primaryLanguage: string;
  needsInterpreter: YesNoType;
  // Contact
  emailConsent: boolean | null;
  email: string;
  whatsappConsent: boolean | null;
  whatsappNumber: string;
  phones: PhoneEntry[];
  // Address
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  // Concern
  primaryConcernText: string;
  additionalConcerns: string;
  additionalConcernsCompleted: boolean;
  // Services
  services: string[];
  // Insurance
  hasInsurance: YesNoType;
  insuranceCoversGermany: InsuranceCoverageType;
  // Wrap up
  preferredLocation: PreferredLocationType;
  visitTiming: VisitTimingType;
  message: string;
  // Consent at submit
  consentAutomatedContact: boolean;
  consentHealthcare: boolean;
  consentOptOut: boolean;
  consentPrivacyPractices: boolean;
}

export const PROGRESS_STEPS = [
  { key: 'eligibility', label: 'Eligibility' },
  { key: 'patientInfo', label: 'Patient Information' },
  { key: 'primaryConcern', label: 'Primary Concern' },
  { key: 'servicesInsurance', label: 'Services & Insurance' },
  { key: 'wrapUp', label: 'Wrap Up' },
];

export const initialWizardData: WizardData = {
  location: null,
  locationDetailed: null,
  memberCheckCompleted: false,
  welcomeCompleted: false,
  wantsMembership: null,
  canTravel: null,
  hasMedicalRecords: null,
  recordsInAcceptedLanguage: null,
  hasTravelDocuments: null,
  currentlyInTreatment: null,
  hasHealthRiskForTravel: null,
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  legalSex: null,
  dateOfBirth: '',
  primaryLanguage: '',
  needsInterpreter: null,
  emailConsent: null,
  email: '',
  whatsappConsent: null,
  whatsappNumber: '',
  phones: [{ number: '', type: 'mobile' }],
  country: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  primaryConcernText: '',
  additionalConcerns: '',
  additionalConcernsCompleted: false,
  services: [],
  hasInsurance: null,
  insuranceCoversGermany: null,
  preferredLocation: null,
  visitTiming: null,
  message: '',
  consentAutomatedContact: false,
  consentHealthcare: false,
  consentOptOut: false,
  consentPrivacyPractices: false,
};
