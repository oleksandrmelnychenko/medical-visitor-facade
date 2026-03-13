"use client";

import type { WizardStep } from "./types";
import { HealthCareIntroStep } from "./steps/shared/HealthCareIntroStep";
import { SharedPatientNameStep } from "./steps/shared/SharedPatientNameStep";
import { SharedDateOfBirthStep } from "./steps/shared/SharedDateOfBirthStep";
import { PhoneStep } from "./steps/shared/PhoneStep";
import { WhatsAppConsentStep } from "./steps/shared/WhatsAppConsentStep";
import { EmailConsentStep } from "./steps/shared/EmailConsentStep";
import { NoContactExitStep } from "./steps/shared/NoContactExitStep";
import { SharedLegalSexStep } from "./steps/shared/SharedLegalSexStep";
import { SharedInterpreterStep } from "./steps/shared/SharedInterpreterStep";
import { SharedPrimaryLanguageStep } from "./steps/shared/SharedPrimaryLanguageStep";

type PatientFlowStep =
  | "health-intro"
  | "patient-name"
  | "patient-dob"
  | "phone"
  | "whatsapp-consent"
  | "email-consent"
  | "no-contact-exit"
  | "legal-sex"
  | "interpreter"
  | "primary-language";

type PatientFlowStepViewProps = {
  step: Extract<WizardStep, PatientFlowStep>;
};

export function PatientFlowStepView({ step }: PatientFlowStepViewProps) {
  switch (step) {
    case "health-intro":
      return <HealthCareIntroStep />;
    case "patient-name":
      return <SharedPatientNameStep />;
    case "patient-dob":
      return <SharedDateOfBirthStep />;
    case "phone":
      return <PhoneStep />;
    case "whatsapp-consent":
      return <WhatsAppConsentStep />;
    case "email-consent":
      return <EmailConsentStep />;
    case "no-contact-exit":
      return <NoContactExitStep />;
    case "legal-sex":
      return <SharedLegalSexStep />;
    case "interpreter":
      return <SharedInterpreterStep />;
    case "primary-language":
      return <SharedPrimaryLanguageStep />;
    default:
      return null;
  }
}
