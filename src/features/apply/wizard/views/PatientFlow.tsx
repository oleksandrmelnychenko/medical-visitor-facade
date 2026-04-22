"use client";

import type { WizardStep } from "../types";
import { HealthCareIntro } from "../steps/profile/HealthCareIntro";
import { PatientName } from "../steps/profile/PatientName";
import { DateOfBirth } from "../steps/profile/DateOfBirth";
import { Phone } from "../steps/profile/Phone";
import { WhatsAppConsent } from "../steps/profile/WhatsAppConsent";
import { EmailConsent } from "../steps/profile/EmailConsent";
import { NoContactExit } from "../steps/profile/NoContactExit";
import { LegalSex } from "../steps/profile/LegalSex";
import { Interpreter } from "../steps/profile/Interpreter";
import { PrimaryLanguage } from "../steps/profile/PrimaryLanguage";

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

type PatientFlowProps = {
  step: Extract<WizardStep, PatientFlowStep>;
};

export function PatientFlow({ step }: PatientFlowProps) {
  switch (step) {
    case "health-intro":
      return <HealthCareIntro />;
    case "patient-name":
      return <PatientName />;
    case "patient-dob":
      return <DateOfBirth />;
    case "phone":
      return <Phone />;
    case "whatsapp-consent":
      return <WhatsAppConsent />;
    case "email-consent":
      return <EmailConsent />;
    case "no-contact-exit":
      return <NoContactExit />;
    case "legal-sex":
      return <LegalSex />;
    case "interpreter":
      return <Interpreter />;
    case "primary-language":
      return <PrimaryLanguage />;
    default:
      return null;
  }
}
