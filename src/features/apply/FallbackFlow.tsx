"use client";

import { AnimatePresence, motion } from "motion/react";
import { ReturningPatientForm } from "./forms/ReturningPatientForm";
import { PhysicianForm } from "./forms/PhysicianForm";

type FallbackFlowProps = {
  activeType: "returning" | "physician";
  onBack: () => void;
};

export function FallbackFlow({ activeType, onBack }: FallbackFlowProps) {
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
