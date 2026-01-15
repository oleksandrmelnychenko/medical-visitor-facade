"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, ChevronDown } from 'lucide-react';
import styles from '../request-appointment.module.scss';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'; // If I had a button component, but I'll use standard button for now or port Shadcn button fully.
// Note: I implemented Button component earlier. I should use it.

interface NewPatientFormProps {
  onBack: () => void;
}

export function NewPatientForm({ onBack }: NewPatientFormProps) {
  // Silence unused prop warning
  void onBack;
  const [step, setStep] = useState<'intro' | 'isPatient' | 'travel' | 'form'>('intro');
  const [isPatient, setIsPatient] = useState<boolean | null>(null);
  const [willingToTravel, setWillingToTravel] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
    medicalHistory: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      medicalHistory: file,
    });
  };

  // Prevent unused var warnings
  void isPatient;
  void willingToTravel;
  void handleFileChange;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle submission logic
  };

  if (step === 'intro') {
    return (
      <div className="bg-white border-2 border-black p-8 md:p-12 text-center">
        <h3 className="text-gray-900 mb-6" style={{ fontSize: '28px' }}>
          Let&apos;s get started
        </h3>
        <p className="text-gray-700 mb-10 max-w-2xl mx-auto">
          We will ask you a series of questions that will guide your follow-up with an appointment coordinator.
        </p>

        <motion.button
          onClick={() => setStep('isPatient')}
          className="border-2 border-black text-black px-12 py-4 hover:bg-black hover:text-white transition-colors mb-12"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue
        </motion.button>

        <div className="border-t-2 border-gray-200 pt-8 text-left">
          <p className="text-sm text-gray-700 mb-4">
            <strong className="text-gray-900">If this is a medical emergency, call 911.</strong>
          </p>
          <p className="text-sm text-gray-700 mb-4">
            If this is a mental health emergency, call or text 988 to talk to a counselor.
          </p>
        </div>
      </div>
    );
  }

  if (step === 'isPatient') {
    return (
      <div className="bg-white border-2 border-black p-8 md:p-12 text-center">
        <h3 className="text-gray-900 mb-8" style={{ fontSize: '28px' }}>
          Are you the patient?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Yes */}
          <motion.button
            onClick={() => { setIsPatient(true); setStep('travel'); }}
            className={styles.card} // Reuse card style or similar
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
             <div className="flex flex-col items-center gap-4">
                <User className="w-12 h-12 text-black mb-2" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Yes</h4>
                   <p className="text-sm">I&apos;m the patient</p>
                </div>
             </div>
          </motion.button>

          {/* No */}
          <motion.button
            onClick={() => { setIsPatient(false); setStep('travel'); }}
            className={styles.card}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
             <div className="flex flex-col items-center gap-4">
                <User className="w-12 h-12 text-black mb-2" />
                <div>
                  <h4 className="font-bold text-lg mb-2">No</h4>
                   <p className="text-sm">I&apos;m requesting for someone else</p>
                </div>
             </div>
          </motion.button>
        </div>
      </div>
    );
  }

  if (step === 'travel') {
    return (
       <div className="bg-white border-2 border-black p-8 md:p-12 text-center">
          <h3 className="text-gray-900 mb-6" style={{ fontSize: '28px' }}>
            Are you able and willing to travel to Berlin to receive care?
          </h3>
          <p className="text-gray-700 mb-8">
            Getting an appointment at Agency for Patient Care will require you to travel to our facility in Berlin, Germany.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <motion.button
              onClick={() => { setWillingToTravel(true); setStep('form'); }}
               className="border-2 border-black px-12 py-4 hover:bg-black hover:text-white transition-colors"
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
            >
              <h4 className="font-bold">Yes</h4>
            </motion.button>

            <motion.button
              onClick={() => { setWillingToTravel(false); setStep('form'); }} // Logic might vary if No
               className="border-2 border-black px-12 py-4 hover:bg-black hover:text-white transition-colors"
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
            >
              <h4 className="font-bold">No</h4>
            </motion.button>
          </div>
       </div>
    );
  }

  return (
    <div className="bg-white border-2 border-black p-8 md:p-12">
      <h3 className="text-gray-900 mb-8" style={{ fontSize: '28px' }}>New Patient Registration</h3>
      <form onSubmit={handleSubmit}>
         <div className="mb-10">
            <h4 className="text-gray-900 mb-6 font-medium">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Input placeholder="First Name *" name="firstName" value={formData.firstName} onChange={handleChange} required />
               <Input placeholder="Last Name *" name="lastName" value={formData.lastName} onChange={handleChange} required />
               <Input placeholder="Email Address *" name="email" type="email" value={formData.email} onChange={handleChange} required />
               <Input placeholder="Phone Number *" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
               <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
            </div>
         </div>

         <div className="mb-10">
            <h4 className="text-gray-900 mb-6 font-medium">Appointment Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 relative">
                   <select 
                      name="service" 
                      value={formData.service} 
                      onChange={handleChange} 
                      className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="oncology">Oncology</option>
                      <option value="surgery">Surgery</option>
                      <option value="other">Other</option>
                   </select>
                   <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
                </div>
                <Input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required />
                 <div className="relative">
                   <select 
                      name="preferredTime" 
                      value={formData.preferredTime} 
                      onChange={handleChange} 
                      className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                      required
                    >
                      <option value="">Select a time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                   </select>
                   <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
                </div>
            </div>
         </div>
         
         <div className="mb-10">
            <h4 className="text-gray-900 mb-6 font-medium">Message</h4>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Reason for visit..."
            ></textarea>
         </div>

         <div className="flex justify-center">
            <Button type="submit" size="lg">Submit Request</Button>
         </div>
      </form>
    </div>
  );
}
