"use client";

import { AnimatePresence, motion } from "motion/react";
import { ReturningPatientForm } from "../Components/ReturningPatientForm";
import { PhysicianForm } from "../Components/PhysicianForm";

type RequestAppointmentFallbackFlowProps = {
  activeType: "returning" | "physician";
  onBack: () => void;
};

export function RequestAppointmentFallbackFlow({
  activeType,
  onBack,
}: RequestAppointmentFallbackFlowProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeType}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {activeType === "returning" && <ReturningPatientForm onBack={onBack} />}
        {activeType === "physician" && <PhysicianForm onBack={onBack} />}
      </motion.div>
    </AnimatePresence>
  );
}
