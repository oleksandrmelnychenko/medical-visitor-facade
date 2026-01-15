"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import styles from '../request-appointment.module.scss';
import { PatientType } from '../RequestAppointment';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface PatientTypeSelectionProps {
  onSelect: (type: PatientType) => void;
}

export function PatientTypeSelection({ onSelect }: PatientTypeSelectionProps) {
  return (
    <>
      <motion.div
        key="selection"
        className={styles.cardGrid}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {/* New Patients Card */}
        <motion.button
          onClick={() => onSelect("new")}
          className={styles.card}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowUpRight className={styles.cardIcon} />
          <h3 className={styles.cardTitle}>
            New Patients
          </h3>
          <p className={styles.cardDescription}>
            Provide your info and set a follow-up time.
          </p>
        </motion.button>

        {/* Returning Patients Card */}
        <motion.button
          onClick={() => onSelect("returning")}
          className={styles.card}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowUpRight className={styles.cardIcon} />
          <h3 className={styles.cardTitle}>
            Returning Patients
          </h3>
          <p className={styles.cardDescription}>
            Request using your patient account.
          </p>
        </motion.button>

        {/* Referring Physicians Card */}
        <motion.button
          onClick={() => onSelect("physician")}
          className={styles.card}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowUpRight className={styles.cardIcon} />
          <h3 className={styles.cardTitle}>
            Referring Physicians
          </h3>
          <p className={styles.cardDescription}>
            Get consults and refer your patients.
          </p>
        </motion.button>
      </motion.div>

      {/* Free Service Application Section */}
      <motion.div
        key="free-service"
        className={styles.freeService}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Text Content - Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className={styles.freeServiceTitle}>
            Need Financial Assistance?
          </h3>
          
          <p className={styles.freeServiceText}>
            We understand that medical care can be financially challenging. Agency for Patient Care offers a limited program for patients who need assistance with medical expenses.
          </p>
          
          <p className={styles.freeServiceText}>
            Our team carefully reviews each application and provides support when resources are available.
          </p>

          <div className={styles.priorityCallout}>
            <p style={{ fontWeight: 500, marginBottom: '4px' }}>
              Priority Cases:
            </p>
            <p>
              We prioritize cases involving children, urgent medical situations, and patients facing exceptional circumstances.
            </p>
          </div>

          <p className={styles.freeServiceText} style={{ fontSize: '15px' }}>
            Please note: Free service requests are reviewed on a case-by-case basis depending on available capacity and the nature of medical need. We will contact you within 5-7 business days regarding your application status.
          </p>

          <motion.button
            className={styles.applyButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply for Free Service
          </motion.button>
        </motion.div>

        {/* Image - Right */}
        <motion.div
          className={styles.fullImage}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <ImageWithFallback
            src="/assets/dfb83cb5936b44ca2202c18d197b3196619183a4.png" // Local asset
            alt="Healthcare financial assistance"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </>
  );
}
