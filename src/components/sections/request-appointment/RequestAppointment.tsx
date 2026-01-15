"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './request-appointment.module.scss';
import { PatientTypeSelection } from './components/PatientTypeSelection';
import { NewPatientForm } from './components/NewPatientForm';
import { ReturningPatientForm } from './components/ReturningPatientForm';
import { PhysicianForm } from './components/PhysicianForm';

export type PatientType = "new" | "returning" | "physician" | null;

export function RequestAppointment() {
  const [selectedType, setSelectedType] = useState<PatientType>(null);

  const handleCardClick = (type: PatientType) => {
    setSelectedType(type);
  };

  const handleBack = () => {
    setSelectedType(null);
  };

  return (
    <section className={styles.section} id="appointment">
      {/* Breadcrumb Navigation */}
      <div>
        <div className={cn(styles.container, 'py-3')}>
          <nav className={styles.breadcrumbs}>
            <Link href="/">home</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span>request appointment</span>
          </nav>
        </div>
      </div>

      <div className={cn(styles.container, 'py-6')}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className={styles.overline}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Get Started
          </motion.p>
          
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Request Appointment
          </motion.h2>
          
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Start here. Our team will contact you within 24 hours.
          </motion.p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedType ? (
             <PatientTypeSelection onSelect={handleCardClick} />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-black transition-colors mb-6 flex items-center gap-1"
              >
                 ← Back to selection
              </button>
              
              {selectedType === 'new' && <NewPatientForm onBack={handleBack} />}
              {selectedType === 'returning' && <ReturningPatientForm onBack={handleBack} />}
              {selectedType === 'physician' && <PhysicianForm onBack={handleBack} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
