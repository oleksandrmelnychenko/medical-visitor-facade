"use client";

import { useSearchParams } from "next/navigation";
import { WizardProvider } from "./WizardContext";
import { LocationStep } from "./steps/LocationStep";
import { PatientRoleStep } from "./steps/PatientRoleStep";
import { TravelReadyStep } from "./steps/TravelReadyStep";
import { VisaHelpStep } from "./steps/VisaHelpStep";
import { MedicalRecordsStep } from "./steps/MedicalRecordsStep";
import { TravelDocumentsStep } from "./steps/TravelDocumentsStep";
import { PatientInfoIntroStep } from "./steps/PatientInfoIntroStep";
import { OutsideEuPatientForm } from "./steps/OutsideEuPatientForm";
import { ExitNoTravelStep } from "./steps/ExitNoTravelStep";
import { ExitNoRecordsStep } from "./steps/ExitNoRecordsStep";
import { EuPatientRoleStep } from "./steps/eu/EuPatientRoleStep";
import { EuCompanionInfoStep } from "./steps/eu/EuCompanionInfoStep";
import { EuPatientNameStep } from "./steps/eu/EuPatientNameStep";
import { EuPatientDobStep } from "./steps/eu/EuPatientDobStep";
import { EuPatientContactStep } from "./steps/eu/EuPatientContactStep";
import { EuInterpreterStep } from "./steps/eu/EuInterpreterStep";
import { EuAddressStep } from "./steps/eu/EuAddressStep";
import { EuMedicalStep } from "./steps/eu/EuMedicalStep";

function WizardStepView() {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") ?? "location";

  switch (step) {
    case "eu-role":
      return <EuPatientRoleStep />;
    case "eu-companion":
      return <EuCompanionInfoStep />;
    case "eu-form":
      return <EuPatientNameStep />;
    case "eu-dob":
      return <EuPatientDobStep />;
    case "eu-contact":
      return <EuPatientContactStep />;
    case "eu-interpreter":
      return <EuInterpreterStep />;
    case "eu-address":
      return <EuAddressStep />;
    case "eu-medical":
      return <EuMedicalStep />;
    case "eu-travel":
      return <TravelReadyStep wizardPath="eu" />;
    case "eu-visa":
      return <VisaHelpStep wizardPath="eu" />;
    case "outside-role":
      return <PatientRoleStep wizardPath="outside-eu" />;
    case "outside-travel":
      return <TravelReadyStep wizardPath="outside-eu" />;
    case "outside-visa":
      return <VisaHelpStep wizardPath="outside-eu" />;
    case "outside-records":
      return <MedicalRecordsStep wizardPath="outside-eu" />;
    case "outside-documents":
      return <TravelDocumentsStep wizardPath="outside-eu" />;
    case "outside-info":
      return <PatientInfoIntroStep wizardPath="outside-eu" />;
    case "outside-form":
      return <OutsideEuPatientForm />;
    case "outside-exit-travel":
      return <ExitNoTravelStep wizardPath="outside-eu" />;
    case "outside-exit-records":
      return <ExitNoRecordsStep wizardPath="outside-eu" />;
    case "location":
    default:
      return <LocationStep />;
  }
}

export function ApplyNewPatientWizard() {
  return (
    <WizardProvider>
      <WizardStepView />
    </WizardProvider>
  );
}
