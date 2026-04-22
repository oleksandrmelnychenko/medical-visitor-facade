"use client";

import type { WizardStep } from "../types";
import { Services } from "../steps/care/Services";
import { Address } from "../steps/care/Address";
import { PrimaryConcern } from "../steps/care/PrimaryConcern";
import { TravelRisk } from "../steps/care/TravelRisk";
import { CurrentTreatment } from "../steps/care/CurrentTreatment";
import { InsuranceIntro } from "../steps/insurance/InsuranceIntro";
import { Insurance } from "../steps/insurance/Insurance";
import { InsuranceCoverage } from "../steps/insurance/InsuranceCoverage";
import { WrapUpIntro } from "../steps/finish/WrapUpIntro";
import { PreferredLocation } from "../steps/finish/PreferredLocation";
import { VisitTiming } from "../steps/finish/VisitTiming";
import { AnythingElse } from "../steps/finish/AnythingElse";
import { ReviewSubmit } from "../steps/finish/ReviewSubmit";

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

type LateFlowProps = {
  step: Extract<WizardStep, LateFlowStep>;
};

export function LateFlow({ step }: LateFlowProps) {
  switch (step) {
    case "services":
      return <Services />;
    case "address":
      return <Address />;
    case "concern-intro":
      return <PrimaryConcern />;
    case "primary-concern":
      return <PrimaryConcern />;
    case "health-risk":
      return <TravelRisk />;
    case "current-treatment":
      return <CurrentTreatment />;
    case "insurance-intro":
      return <InsuranceIntro />;
    case "insurance":
      return <Insurance />;
    case "insurance-coverage":
      return <InsuranceCoverage />;
    case "wrap-up-intro":
      return <WrapUpIntro />;
    case "preferred-location":
      return <PreferredLocation />;
    case "visit-timing":
      return <VisitTiming />;
    case "anything-else":
      return <AnythingElse />;
    case "review":
      return <ReviewSubmit />;
    default:
      return null;
  }
}
