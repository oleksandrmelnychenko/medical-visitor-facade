export type WizardStep =
  | 'location'
  | 'patientRole'
  | 'travelReady'
  | 'medicalRecords'
  | 'travelDocuments'
  | 'patientInfoIntro'
  | 'patientInfoForm'
  | 'exitNoTravel'
  | 'exitNoRecords';

export type LocationType = 'eu' | 'outside_eu' | null;
export type PatientRoleType = 'patient' | 'companion' | null;
export type YesNoType = 'yes' | 'no' | null;
export type MedicalRecordsType = 'yes' | 'no' | 'none' | null;
export type LegalSexType = 'female' | 'male' | 'non-binary' | null;
export type PhoneType = 'mobile' | 'home' | 'work';

export interface PhoneEntry {
  number: string;
  type: PhoneType;
}

export interface WizardData {
  location: LocationType;
  patientRole: PatientRoleType;
  canTravel: YesNoType;
  needsVisaHelp: YesNoType;
  hasMedicalRecords: MedicalRecordsType;
  hasTravelDocuments: YesNoType;
  // Patient info
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  preferredName: string;
  legalSex: LegalSexType;
  email: string;
  phones: PhoneEntry[];
  dateOfBirth: string;
  country: string;
  message: string;
  needsInterpreter: YesNoType;
  primaryLanguage: string;
  // WhatsApp
  whatsappConsent: boolean | null;
  whatsappNumber: string;
  // Address
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  // Companion info (EU flow)
  companionFirstName: string;
  companionLastName: string;
  relationshipToPatient: string;
}

export const PROGRESS_STEPS = [
  { key: 'travelReady', label: 'Travel Readiness' },
  { key: 'patientInfo', label: 'Patient Information' },
  { key: 'primaryConcern', label: 'Primary Concern' },
  { key: 'insuranceDetails', label: 'Insurance Details' },
  { key: 'wrapUp', label: 'Wrap Up' },
];

export const initialWizardData: WizardData = {
  location: null,
  patientRole: null,
  canTravel: null,
  needsVisaHelp: null,
  hasMedicalRecords: null,
  hasTravelDocuments: null,
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  preferredName: '',
  legalSex: null,
  email: '',
  phones: [{ number: '', type: 'mobile' }],
  dateOfBirth: '',
  country: '',
  message: '',
  needsInterpreter: null,
  primaryLanguage: '',
  whatsappConsent: null,
  whatsappNumber: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  companionFirstName: '',
  companionLastName: '',
  relationshipToPatient: '',
};
