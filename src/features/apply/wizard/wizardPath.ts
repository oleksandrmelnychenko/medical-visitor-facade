import type { WizardData, WizardStep } from "./types";

export function buildPath(data: WizardData): WizardStep[] {
  const steps: WizardStep[] = ["member-check", "account-check", "welcome", "location"];

  if (!data.locationDetailed) return steps;

  if (data.locationDetailed !== "germany") {
    steps.push("become-member", "outside-travel");
    if (data.canTravel === "no") {
      steps.push("outside-exit-travel");
      return steps;
    }

    steps.push("outside-records");
    if (data.hasMedicalRecords === "yes") {
      steps.push("records-language");
    }

    steps.push("outside-documents");
  }

  steps.push("health-intro", "patient-name", "patient-dob", "phone", "whatsapp-consent", "email-consent");

  if (data.emailConsent === false && data.whatsappConsent === false) {
    steps.push("no-contact-exit");
    return steps;
  }

  steps.push("primary-language", "legal-sex", "interpreter");

  steps.push("services", "address", "primary-concern", "current-treatment", "health-risk");

  steps.push("insurance-intro", "insurance");
  if (data.hasInsurance === "yes") steps.push("insurance-coverage");

  steps.push("wrap-up-intro", "preferred-location", "visit-timing", "anything-else", "review");
  return steps;
}
