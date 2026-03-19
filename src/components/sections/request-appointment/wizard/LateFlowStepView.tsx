"use client";

import type { WizardStep } from "./types";
import { ServicesStep } from "./steps/shared/ServicesStep";
import { AddressStep } from "./steps/shared/AddressStep";
import { PrimaryConcernStep } from "./steps/shared/PrimaryConcernStep";
import { TravelRiskStep } from "./steps/shared/TravelRiskStep";
import { CurrentTreatmentStep } from "./steps/shared/CurrentTreatmentStep";
import { InsuranceIntroStep } from "./steps/shared/InsuranceIntroStep";
import { InsuranceStep } from "./steps/shared/InsuranceStep";
import { InsuranceCoverageStep } from "./steps/shared/InsuranceCoverageStep";
import { WrapUpIntroStep } from "./steps/shared/WrapUpIntroStep";
import { PreferredLocationStep } from "./steps/shared/PreferredLocationStep";
import { VisitTimingStep } from "./steps/shared/VisitTimingStep";
import { AnythingElseStep } from "./steps/shared/AnythingElseStep";
import { ReviewSubmitStep } from "./steps/shared/ReviewSubmitStep";

type LateFlowStep =
  | "services"
  | "address"
  | "concern-intro"
  | "primary-concern"
  | "health-risk"
  | "current-treatment"
  | "insurance-intro"
  | "insurance"
  | "insurance-coverage"
  | "wrap-up-intro"
  | "preferred-location"
  | "visit-timing"
  | "anything-else"
  | "review";

type LateFlowStepViewProps = {
  step: Extract<WizardStep, LateFlowStep>;
};

export function LateFlowStepView({ step }: LateFlowStepViewProps) {
  switch (step) {
    case "services":
      return <ServicesStep />;
    case "address":
      return <AddressStep />;
    case "concern-intro":
      return <PrimaryConcernStep />;
    case "primary-concern":
      return <PrimaryConcernStep />;
    case "health-risk":
      return <TravelRiskStep />;
    case "current-treatment":
      return <CurrentTreatmentStep />;
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
      return null;
  }
}
