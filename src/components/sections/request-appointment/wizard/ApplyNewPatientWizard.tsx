"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { WizardProvider } from "./WizardContext";
import { getAccessibleWizardStep } from "./flow";
import { LocationStep } from "./steps/LocationStep";
import { TravelReadyStep } from "./steps/TravelReadyStep";
import { MedicalRecordsStep } from "./steps/MedicalRecordsStep";
import { TravelDocumentsStep } from "./steps/TravelDocumentsStep";
import { ExitNoTravelStep } from "./steps/ExitNoTravelStep";
import { ExitNoRecordsStep } from "./steps/ExitNoRecordsStep";
import { MedicalRecordsLanguageStep } from "./steps/shared/MedicalRecordsLanguageStep";
import { NoContactExitStep } from "./steps/shared/NoContactExitStep";
import { WrapUpIntroStep } from "./steps/shared/WrapUpIntroStep";

// Shared new steps
import { WelcomeStep } from "./steps/shared/WelcomeStep";
import { MemberCheckStep } from "./steps/shared/MemberCheckStep";
import { BecomeMemberStep } from "./steps/shared/BecomeMemberStep";
import { HealthCareIntroStep } from "./steps/shared/HealthCareIntroStep";
import { CurrentTreatmentStep } from "./steps/shared/CurrentTreatmentStep";
import { TravelRiskStep } from "./steps/shared/TravelRiskStep";
import { SharedPatientNameStep } from "./steps/shared/SharedPatientNameStep";
import { SharedDateOfBirthStep } from "./steps/shared/SharedDateOfBirthStep";
import { SharedLegalSexStep } from "./steps/shared/SharedLegalSexStep";
import { SharedPrimaryLanguageStep } from "./steps/shared/SharedPrimaryLanguageStep";
import { SharedInterpreterStep } from "./steps/shared/SharedInterpreterStep";
import { EmailConsentStep } from "./steps/shared/EmailConsentStep";
import { WhatsAppConsentStep } from "./steps/shared/WhatsAppConsentStep";
import { PhoneStep } from "./steps/shared/PhoneStep";
import { ConcernIntroStep } from "./steps/shared/ConcernIntroStep";
import { PrimaryConcernStep } from "./steps/shared/PrimaryConcernStep";
import { AdditionalConcernsStep } from "./steps/shared/AdditionalConcernsStep";
import { AddressStep } from "./steps/shared/AddressStep";
import { ServicesStep } from "./steps/shared/ServicesStep";
import { InsuranceIntroStep } from "./steps/shared/InsuranceIntroStep";
import { InsuranceStep } from "./steps/shared/InsuranceStep";
import { InsuranceCoverageStep } from "./steps/shared/InsuranceCoverageStep";
import { PreferredLocationStep } from "./steps/shared/PreferredLocationStep";
import { VisitTimingStep } from "./steps/shared/VisitTimingStep";
import { AnythingElseStep } from "./steps/shared/AnythingElseStep";
import { ReviewSubmitStep } from "./steps/shared/ReviewSubmitStep";
import { useWizard } from "./WizardContext";
import type { WizardStep } from "./types";

function WizardStepView() {
  const router = useRouter();
  const { data, isDraftHydrated } = useWizard();
  const searchParams = useSearchParams();
  const requestedStep = (searchParams.get("step") ?? "member-check") as WizardStep;
  const step = isDraftHydrated
    ? getAccessibleWizardStep(requestedStep, data)
    : requestedStep;

  useEffect(() => {
    if (!isDraftHydrated || step === requestedStep) {
      return;
    }

    router.replace(`/apply?type=new&step=${step}`);
  }, [isDraftHydrated, requestedStep, router, step]);

  if (!isDraftHydrated) {
    return null;
  }

  switch (step) {
    // Shared start
    case "member-check":
      return <MemberCheckStep />;
    case "welcome":
      return <WelcomeStep />;
    case "location":
      return <LocationStep />;

    // Non-Germany eligibility
    case "become-member":
      return <BecomeMemberStep />;
    case "outside-travel":
      return <TravelReadyStep />;
    case "outside-records":
      return <MedicalRecordsStep />;
    case "records-language":
      return <MedicalRecordsLanguageStep />;
    case "outside-documents":
      return <TravelDocumentsStep />;
    case "outside-exit-travel":
      return <ExitNoTravelStep />;
    case "outside-exit-records":
      return <ExitNoRecordsStep />;

    // Shared form steps
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
    case "services":
      return <ServicesStep />;
    case "address":
      return <AddressStep />;
    case "concern-intro":
      return <ConcernIntroStep />;
    case "primary-concern":
      return <PrimaryConcernStep />;
    case "health-risk":
      return <TravelRiskStep />;
    case "current-treatment":
      return <CurrentTreatmentStep />;
    case "additional-concerns":
      return <AdditionalConcernsStep />;
    case "insurance-intro":
      return <InsuranceIntroStep />;
    case "insurance":
      return <InsuranceStep />;
    case "insurance-coverage":
      return <InsuranceCoverageStep />;
    case "wrap-up-intro":
      return <WrapUpIntroStep />;
    case "preferred-location":
      return <PreferredLocationStep />;
    case "visit-timing":
      return <VisitTimingStep />;
    case "anything-else":
      return <AnythingElseStep />;
    case "review":
      return <ReviewSubmitStep />;

    default:
      return <MemberCheckStep />;
  }
}

export function ApplyNewPatientWizard() {
  return (
    <WizardProvider>
      <WizardStepView />
    </WizardProvider>
  );
}
