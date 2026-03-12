import type { WizardData, WizardStep } from "./types";

function hasText(value: string | null | undefined) {
  return Boolean(value?.trim());
}

function hasPrimaryPhone(data: WizardData) {
  return hasText(data.phones[0]?.number);
}

function hasPhoneAndEmail(data: WizardData) {
  return hasPrimaryPhone(data) && hasText(data.email);
}

function hasWhatsAppChoice(data: WizardData) {
  return (
    data.whatsappConsent === false ||
    (data.whatsappConsent === true && hasText(data.whatsappNumber))
  );
}

function hasContactPermission(data: WizardData) {
  return data.whatsappConsent === true || data.emailConsent === true;
}

function hasRequiredAddress(data: WizardData) {
  return (
    hasText(data.country) &&
    hasText(data.streetAddress) &&
    hasText(data.city) &&
    hasText(data.zipCode)
  );
}

function isNonGermanyPath(data: WizardData) {
  return data.locationDetailed === "eu_not_germany" || data.locationDetailed === "outside_eu";
}

function hasReachedLocationOrLater(data: WizardData) {
  return (
    data.locationDetailed !== null ||
    data.wantsMembership !== null ||
    data.canTravel !== null ||
    data.hasMedicalRecords !== null ||
    data.recordsInAcceptedLanguage !== null ||
    data.hasTravelDocuments !== null ||
    hasText(data.firstName) ||
    hasText(data.lastName) ||
    hasText(data.dateOfBirth) ||
    hasPrimaryPhone(data) ||
    hasText(data.email) ||
    data.legalSex !== null ||
    data.needsInterpreter !== null ||
    hasText(data.primaryLanguage) ||
    data.services.length > 0 ||
    hasRequiredAddress(data) ||
    hasText(data.primaryConcernText) ||
    data.hasHealthRiskForTravel !== null ||
    data.currentlyInTreatment !== null ||
    data.hasInsurance !== null ||
    data.insuranceCoversGermany !== null ||
    data.preferredLocation !== null ||
    data.visitTiming !== null ||
    hasText(data.message)
  );
}

function getEntryFallback(data: WizardData): WizardStep | null {
  if (!data.memberCheckCompleted) {
    return "member-check";
  }

  if (!data.welcomeCompleted) {
    return "welcome";
  }

  return null;
}

function getLocationFallback(data: WizardData): WizardStep | null {
  const entryFallback = getEntryFallback(data);
  if (entryFallback) {
    return entryFallback;
  }

  return data.locationDetailed ? null : "location";
}

function getNonGermanyEligibilityFallback(data: WizardData): WizardStep | null {
  const locationFallback = getLocationFallback(data);
  if (locationFallback) {
    return locationFallback;
  }

  if (!isNonGermanyPath(data)) {
    return data.locationDetailed === "germany" ? "health-intro" : "location";
  }

  if (data.wantsMembership === null) {
    return "become-member";
  }

  if (data.canTravel === null) {
    return "outside-travel";
  }

  if (data.canTravel === "no") {
    return "outside-exit-travel";
  }

  if (data.hasMedicalRecords === null) {
    return "outside-records";
  }

  if (data.hasMedicalRecords !== "yes") {
    return "outside-exit-records";
  }

  if (data.recordsInAcceptedLanguage === null) {
    return "records-language";
  }

  if (data.hasTravelDocuments === null) {
    return "outside-documents";
  }

  if (data.hasTravelDocuments === "no") {
    return "outside-exit-travel";
  }

  return null;
}

function getHealthIntroFallback(data: WizardData): WizardStep | null {
  const locationFallback = getLocationFallback(data);
  if (locationFallback) {
    return locationFallback;
  }

  if (data.locationDetailed === "germany") {
    return null;
  }

  return getNonGermanyEligibilityFallback(data);
}

function getPatientInfoFallback(data: WizardData): WizardStep | null {
  const healthIntroFallback = getHealthIntroFallback(data);

  if (healthIntroFallback) {
    return healthIntroFallback;
  }

  if (!hasText(data.firstName) || !hasText(data.lastName)) {
    return "patient-name";
  }

  if (!hasText(data.dateOfBirth)) {
    return "patient-dob";
  }

  if (!hasPhoneAndEmail(data)) {
    return "phone";
  }

  if (!hasWhatsAppChoice(data)) {
    return "whatsapp-consent";
  }

  if (data.emailConsent === null) {
    return "email-consent";
  }

  if (!hasContactPermission(data)) {
    return "no-contact-exit";
  }

  if (data.legalSex === null) {
    return "legal-sex";
  }

  if (data.needsInterpreter === null) {
    return "interpreter";
  }

  if (data.needsInterpreter === "yes" && !hasText(data.primaryLanguage)) {
    return "primary-language";
  }

  return null;
}

function getConcernFallback(data: WizardData): WizardStep | null {
  const patientInfoFallback = getPatientInfoFallback(data);

  if (patientInfoFallback) {
    return patientInfoFallback;
  }

  if (!data.services.length) {
    return "services";
  }

  if (!hasRequiredAddress(data)) {
    return "address";
  }

  if (!hasText(data.primaryConcernText)) {
    return "primary-concern";
  }

  if (data.hasHealthRiskForTravel === null) {
    return "health-risk";
  }

  if (data.hasHealthRiskForTravel === "no" && data.currentlyInTreatment === null) {
    return "current-treatment";
  }

  return null;
}

function getInsuranceFallback(data: WizardData): WizardStep | null {
  const concernFallback = getConcernFallback(data);

  if (concernFallback) {
    return concernFallback;
  }

  if (data.hasInsurance === null) {
    return "insurance";
  }

  if (data.hasInsurance === "yes" && data.insuranceCoversGermany === null) {
    return "insurance-coverage";
  }

  return null;
}

function getWrapUpFallback(data: WizardData): WizardStep | null {
  const insuranceFallback = getInsuranceFallback(data);

  if (insuranceFallback) {
    return insuranceFallback;
  }

  if (data.preferredLocation === null) {
    return "preferred-location";
  }

  if (data.visitTiming === null) {
    return "visit-timing";
  }

  return null;
}

export function sanitizeWizardData(data: WizardData): WizardData {
  const next: WizardData = {
    ...data,
    phones: data.phones.length ? data.phones : [{ number: "", type: "mobile" }],
  };

  if (hasReachedLocationOrLater(next)) {
    next.memberCheckCompleted = true;
    next.welcomeCompleted = true;
  } else if (next.welcomeCompleted) {
    next.memberCheckCompleted = true;
  }

  if (!next.memberCheckCompleted) {
    next.welcomeCompleted = false;
  }

  if (!isNonGermanyPath(next)) {
    next.wantsMembership = null;
    next.canTravel = null;
    next.hasMedicalRecords = null;
    next.recordsInAcceptedLanguage = null;
    next.hasTravelDocuments = null;
  } else {
    if (next.canTravel !== "yes") {
      next.hasMedicalRecords = null;
      next.recordsInAcceptedLanguage = null;
      next.hasTravelDocuments = null;
    } else if (next.hasMedicalRecords !== "yes") {
      next.recordsInAcceptedLanguage = null;
      next.hasTravelDocuments = null;
    } else if (next.recordsInAcceptedLanguage === null) {
      next.hasTravelDocuments = null;
    }
  }

  if (next.needsInterpreter !== "yes") {
    next.primaryLanguage = "";
  }

  if (next.whatsappConsent !== true) {
    next.whatsappNumber = "";
  }

  if (next.hasHealthRiskForTravel !== "no") {
    next.currentlyInTreatment = null;
    next.additionalConcerns = "";
  } else if (next.currentlyInTreatment === null) {
    next.additionalConcerns = "";
  }

  if (next.hasInsurance !== "yes") {
    next.insuranceCoversGermany = null;
  }

  return next;
}

export function getAccessibleWizardStep(step: WizardStep, data: WizardData): WizardStep {
  const cleanData = sanitizeWizardData(data);

  switch (step) {
    case "member-check":
      return step;

    case "welcome":
      return cleanData.memberCheckCompleted ? "welcome" : "member-check";

    case "location": {
      const fallback = getEntryFallback(cleanData);
      return fallback ?? "location";
    }

    case "become-member":
      return getLocationFallback(cleanData)
        ?? (cleanData.locationDetailed === "germany"
          ? "health-intro"
          : "become-member");

    case "outside-travel":
      if (getLocationFallback(cleanData)) {
        return getLocationFallback(cleanData)!;
      }

      if (cleanData.locationDetailed === "germany") {
        return "health-intro";
      }

      return cleanData.wantsMembership === null ? "become-member" : "outside-travel";

    case "outside-records":
      if (getLocationFallback(cleanData)) {
        return getLocationFallback(cleanData)!;
      }

      if (cleanData.locationDetailed === "germany") {
        return "health-intro";
      }

      if (cleanData.wantsMembership === null) {
        return "become-member";
      }

      if (cleanData.canTravel === null) {
        return "outside-travel";
      }

      return cleanData.canTravel === "yes" ? "outside-records" : "outside-exit-travel";

    case "records-language":
      if (getLocationFallback(cleanData)) {
        return getLocationFallback(cleanData)!;
      }

      if (cleanData.locationDetailed === "germany") {
        return "health-intro";
      }

      if (cleanData.wantsMembership === null) {
        return "become-member";
      }

      if (cleanData.canTravel === null) {
        return "outside-travel";
      }

      if (cleanData.canTravel === "no") {
        return "outside-exit-travel";
      }

      if (cleanData.hasMedicalRecords === null) {
        return "outside-records";
      }

      return cleanData.hasMedicalRecords === "yes" ? "records-language" : "outside-exit-records";

    case "outside-documents":
      if (getLocationFallback(cleanData)) {
        return getLocationFallback(cleanData)!;
      }

      if (cleanData.locationDetailed === "germany") {
        return "health-intro";
      }

      if (cleanData.wantsMembership === null) {
        return "become-member";
      }

      if (cleanData.canTravel === null) {
        return "outside-travel";
      }

      if (cleanData.canTravel === "no") {
        return "outside-exit-travel";
      }

      if (cleanData.hasMedicalRecords === null) {
        return "outside-records";
      }

      if (cleanData.hasMedicalRecords !== "yes") {
        return "outside-exit-records";
      }

      if (cleanData.recordsInAcceptedLanguage === null) {
        return "records-language";
      }

      return "outside-documents";

    case "outside-exit-travel":
      if (getLocationFallback(cleanData)) {
        return getLocationFallback(cleanData)!;
      }

      if (cleanData.locationDetailed === "germany") {
        return "health-intro";
      }

      if (cleanData.wantsMembership === null) {
        return "become-member";
      }

      if (cleanData.canTravel === "no") {
        return "outside-exit-travel";
      }

      if (cleanData.canTravel !== "yes") {
        return "outside-travel";
      }

      if (cleanData.hasMedicalRecords === null) {
        return "outside-records";
      }

      if (cleanData.hasMedicalRecords !== "yes") {
        return "outside-exit-records";
      }

      if (cleanData.recordsInAcceptedLanguage === null) {
        return "records-language";
      }

      return cleanData.hasTravelDocuments === "no" ? "outside-exit-travel" : "outside-documents";

    case "outside-exit-records":
      if (getLocationFallback(cleanData)) {
        return getLocationFallback(cleanData)!;
      }

      if (cleanData.locationDetailed === "germany") {
        return "health-intro";
      }

      if (cleanData.wantsMembership === null) {
        return "become-member";
      }

      if (cleanData.canTravel === null) {
        return "outside-travel";
      }

      if (cleanData.canTravel === "no") {
        return "outside-exit-travel";
      }

      if (cleanData.hasMedicalRecords === null) {
        return "outside-records";
      }

      return cleanData.hasMedicalRecords === "yes" ? "outside-records" : "outside-exit-records";

    case "health-intro":
      return getHealthIntroFallback(cleanData) ?? "health-intro";

    case "patient-name":
      return getHealthIntroFallback(cleanData) ?? "patient-name";

    case "patient-dob": {
      const fallback = getHealthIntroFallback(cleanData);
      if (fallback) {
        return fallback;
      }

      return !hasText(cleanData.firstName) || !hasText(cleanData.lastName)
        ? "patient-name"
        : "patient-dob";
    }

    case "phone": {
      const fallback = getHealthIntroFallback(cleanData);
      if (fallback) {
        return fallback;
      }

      if (!hasText(cleanData.firstName) || !hasText(cleanData.lastName)) {
        return "patient-name";
      }

      return !hasText(cleanData.dateOfBirth) ? "patient-dob" : "phone";
    }

    case "whatsapp-consent": {
      const fallback = getHealthIntroFallback(cleanData);
      if (fallback) {
        return fallback;
      }

      if (!hasText(cleanData.firstName) || !hasText(cleanData.lastName)) {
        return "patient-name";
      }

      if (!hasText(cleanData.dateOfBirth)) {
        return "patient-dob";
      }

      return hasPhoneAndEmail(cleanData) ? "whatsapp-consent" : "phone";
    }

    case "email-consent": {
      const fallback = getHealthIntroFallback(cleanData);
      if (fallback) {
        return fallback;
      }

      if (!hasText(cleanData.firstName) || !hasText(cleanData.lastName)) {
        return "patient-name";
      }

      if (!hasText(cleanData.dateOfBirth)) {
        return "patient-dob";
      }

      if (!hasPhoneAndEmail(cleanData)) {
        return "phone";
      }

      return hasWhatsAppChoice(cleanData) ? "email-consent" : "whatsapp-consent";
    }

    case "no-contact-exit": {
      const fallback = getPatientInfoFallback(cleanData);
      if (fallback && fallback !== "no-contact-exit") {
        return fallback;
      }

      return "no-contact-exit";
    }

    case "legal-sex": {
      const fallback = getPatientInfoFallback(cleanData);
      if (fallback) {
        return fallback === "no-contact-exit" ? "no-contact-exit" : fallback;
      }

      return "legal-sex";
    }

    case "interpreter": {
      const fallback = getPatientInfoFallback(cleanData);
      if (fallback && fallback !== "interpreter" && fallback !== "primary-language") {
        return fallback;
      }

      return cleanData.legalSex === null ? "legal-sex" : "interpreter";
    }

    case "primary-language": {
      const fallback = getPatientInfoFallback(cleanData);
      if (fallback && fallback !== "primary-language") {
        return fallback;
      }

      if (cleanData.legalSex === null) {
        return "legal-sex";
      }

      if (cleanData.needsInterpreter === null) {
        return "interpreter";
      }

      return cleanData.needsInterpreter === "yes" ? "primary-language" : "services";
    }

    case "services": {
      const fallback = getPatientInfoFallback(cleanData);
      if (fallback) {
        return fallback;
      }

      return "services";
    }

    case "address": {
      const fallback = getPatientInfoFallback(cleanData);
      if (fallback) {
        return fallback;
      }

      return cleanData.services.length ? "address" : "services";
    }

    case "concern-intro": {
      const fallback = getPatientInfoFallback(cleanData);
      if (fallback) {
        return fallback;
      }

      if (!cleanData.services.length) {
        return "services";
      }

      return hasRequiredAddress(cleanData) ? "concern-intro" : "address";
    }

    case "primary-concern": {
      const fallback = getPatientInfoFallback(cleanData);
      if (fallback) {
        return fallback;
      }

      if (!cleanData.services.length) {
        return "services";
      }

      return hasRequiredAddress(cleanData) ? "primary-concern" : "address";
    }

    case "health-risk": {
      const fallback = getPatientInfoFallback(cleanData);
      if (fallback) {
        return fallback;
      }

      if (!cleanData.services.length) {
        return "services";
      }

      if (!hasRequiredAddress(cleanData)) {
        return "address";
      }

      return hasText(cleanData.primaryConcernText) ? "health-risk" : "primary-concern";
    }

    case "current-treatment": {
      const fallback = getConcernFallback(cleanData);
      if (fallback && fallback !== "current-treatment") {
        return fallback;
      }

      if (cleanData.hasHealthRiskForTravel === null) {
        return "health-risk";
      }

      return cleanData.hasHealthRiskForTravel === "no" ? "current-treatment" : "insurance-intro";
    }

    case "additional-concerns": {
      const fallback = getConcernFallback(cleanData);
      if (fallback && fallback !== "additional-concerns") {
        return fallback;
      }

      if (cleanData.hasHealthRiskForTravel === "yes") {
        return "insurance-intro";
      }

      return cleanData.currentlyInTreatment === null ? "current-treatment" : "additional-concerns";
    }

    case "insurance-intro":
      return getConcernFallback(cleanData) ?? "insurance-intro";

    case "insurance":
      return getConcernFallback(cleanData) ?? "insurance";

    case "insurance-coverage": {
      const fallback = getConcernFallback(cleanData);
      if (fallback) {
        return fallback;
      }

      if (cleanData.hasInsurance === null) {
        return "insurance";
      }

      return cleanData.hasInsurance === "yes" ? "insurance-coverage" : "wrap-up-intro";
    }

    case "wrap-up-intro":
      return getInsuranceFallback(cleanData) ?? "wrap-up-intro";

    case "preferred-location":
      return getInsuranceFallback(cleanData) ?? "preferred-location";

    case "visit-timing": {
      const fallback = getInsuranceFallback(cleanData);
      if (fallback) {
        return fallback;
      }

      return cleanData.preferredLocation === null ? "preferred-location" : "visit-timing";
    }

    case "anything-else": {
      const fallback = getWrapUpFallback(cleanData);
      return fallback ?? "anything-else";
    }

    case "review": {
      const fallback = getWrapUpFallback(cleanData);
      return fallback ?? "review";
    }

    default:
      return "member-check";
  }
}

export function validateWizardSubmission(data: WizardData): string[] {
  const cleanData = sanitizeWizardData(data);
  const errors: string[] = [];

  if (getAccessibleWizardStep("review", cleanData) !== "review") {
    errors.push("Wizard is incomplete.");
  }

  if (!cleanData.consentAutomatedContact) {
    errors.push("Automated contact consent is required.");
  }

  if (!cleanData.consentHealthcare) {
    errors.push("Healthcare contact consent is required.");
  }

  if (!cleanData.consentOptOut) {
    errors.push("Opt-out acknowledgement is required.");
  }

  if (!cleanData.consentPrivacyPractices) {
    errors.push("Privacy practices acknowledgement is required.");
  }

  return errors;
}
