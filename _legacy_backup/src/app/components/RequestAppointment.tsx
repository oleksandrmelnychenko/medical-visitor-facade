import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, User, Mail, Phone, FileText, ChevronDown, ChevronRight, Upload, Building2, Stethoscope, ArrowLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

type PatientType = "new" | "returning" | "physician" | null;

export function RequestAppointment() {
  const [selectedType, setSelectedType] = useState<PatientType>(null);
  const [showForm, setShowForm] = useState(false);
  const [isPatient, setIsPatient] = useState<boolean | null>(null);
  const [willingToTravel, setWillingToTravel] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    // New Patient fields
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
    
    // Returning Patient fields
    patientId: "",
    patientEmail: "",
    
    // Referring Physician fields
    physicianName: "",
    practiceName: "",
    licenseNumber: "",
    practicePhone: "",
    practiceEmail: "",
    patientFirstName: "",
    patientLastName: "",
    referralReason: "",
    consultationType: "",
    medicalRecords: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      [fieldName]: file,
    });
  };

  const handleCardClick = (type: PatientType) => {
    setSelectedType(type);
    setShowForm(false);
  };

  const handleBack = () => {
    setSelectedType(null);
    setShowForm(false);
    setIsPatient(null);
    setWillingToTravel(null);
  };

  const handleContinue = () => {
    setShowForm(true);
  };

  const handlePatientSelection = (patient: boolean) => {
    setIsPatient(patient);
  };

  const handleTravelSelection = (willing: boolean) => {
    setWillingToTravel(willing);
  };

  return (
    <section className="bg-white" id="appointment">
      {/* Breadcrumb Navigation */}
      <div>
        <div className="container mx-auto px-4 max-w-[1200px] py-3">
          <nav className="flex items-center gap-2" style={{ fontSize: '12px' }}>
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors lowercase">
              home
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-gray-900 lowercase">request appointment</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-[1200px] py-6">
        {/* Header - 3 Layer Title Structure */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Overline */}
          <motion.p
            className="text-center text-gray-500 uppercase tracking-wider mb-2"
            style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Get Started
          </motion.p>
          
          {/* Main Title */}
          <motion.h2 
            className="text-center text-gray-900 mb-4"
            style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Request Appointment
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p
            className="text-center text-gray-600 max-w-3xl mx-auto"
            style={{ fontSize: '18px', lineHeight: '1.7' }}
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
            <>
              {/* Step 1: Patient Type Selection Cards */}
              <motion.div
                key="selection"
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* New Patients Card */}
                <motion.button
                  onClick={() => handleCardClick("new")}
                  className="border-2 border-black bg-white p-8 text-left hover:bg-black hover:text-white transition-all duration-300 group relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowUpRight className="w-6 h-6 absolute top-4 right-4 text-black group-hover:text-white transition-colors" />
                  <h3 className="text-gray-900 group-hover:text-white mb-1 transition-colors">
                    New Patients
                  </h3>
                  <p className="text-gray-500 group-hover:text-gray-200 font-normal transition-colors">
                    Provide your info and set a follow-up time.
                  </p>
                </motion.button>

                {/* Returning Patients Card */}
                <motion.button
                  onClick={() => handleCardClick("returning")}
                  className="border-2 border-black bg-white p-8 text-left hover:bg-black hover:text-white transition-all duration-300 group relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowUpRight className="w-6 h-6 absolute top-4 right-4 text-black group-hover:text-white transition-colors" />
                  <h3 className="text-gray-900 group-hover:text-white mb-1 transition-colors">
                    Returning Patients
                  </h3>
                  <p className="text-gray-500 group-hover:text-gray-200 font-normal transition-colors">
                    Request using your patient account.
                  </p>
                </motion.button>

                {/* Referring Physicians Card */}
                <motion.button
                  onClick={() => handleCardClick("physician")}
                  className="border-2 border-black bg-white p-8 text-left hover:bg-black hover:text-white transition-all duration-300 group relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowUpRight className="w-6 h-6 absolute top-4 right-4 text-black group-hover:text-white transition-colors" />
                  <h3 className="text-gray-900 group-hover:text-white mb-1 transition-colors">
                    Referring Physicians
                  </h3>
                  <p className="text-gray-500 group-hover:text-gray-200 font-normal transition-colors">
                    Get consults and refer your patients.
                  </p>
                </motion.button>
              </motion.div>

              {/* Free Service Application Section */}
              <motion.div
                key="free-service"
                className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Text Content - Left */}
                <motion.div
                  className="flex flex-col justify-center"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <h3 
                    className="text-gray-900 mb-6"
                    style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '-0.01em' }}
                  >
                    Need Financial Assistance?
                  </h3>
                  
                  <p 
                    className="text-gray-600 mb-6"
                    style={{ fontSize: '17px', lineHeight: '1.7' }}
                  >
                    We understand that medical care can be financially challenging. Agency for Patient Care offers a limited program for patients who need assistance with medical expenses.
                  </p>
                  
                  <p 
                    className="text-gray-600 mb-6"
                    style={{ fontSize: '17px', lineHeight: '1.7' }}
                  >
                    Our team carefully reviews each application and provides support when resources are available.
                  </p>

                  {/* Priority Cases Callout */}
                  <div className="border-l-4 border-red-600 bg-red-50 p-5 mb-6">
                    <p className="text-gray-900" style={{ fontSize: '15px', fontWeight: 500, marginBottom: '4px' }}>
                      Priority Cases:
                    </p>
                    <p className="text-gray-700" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                      We prioritize cases involving children, urgent medical situations, and patients facing exceptional circumstances.
                    </p>
                  </div>

                  <p className="text-gray-500 mb-8" style={{ fontSize: '15px' }}>
                    Please note: Free service requests are reviewed on a case-by-case basis depending on available capacity and the nature of medical need. We will contact you within 5-7 business days regarding your application status.
                  </p>

                  <motion.button
                    className="border-2 border-red-600 text-red-600 px-10 py-4 hover:bg-red-600 hover:text-white transition-colors w-fit"
                    style={{ fontSize: '16px', fontWeight: 500 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Apply for Free Service
                  </motion.button>
                </motion.div>

                {/* Image - Right */}
                <motion.div
                  className="relative overflow-hidden rounded-3xl h-80 shadow-2xl"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1708685627299-81bfac32402d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwZmluYW5jaWFsJTIwYXNzaXN0YW5jZSUyMHN1cHBvcnR8ZW58MXx8fHwxNzY4NDYwOTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Healthcare financial assistance"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </>
          ) : (
            // Step 2: Form Based on Selected Type
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Back Button */}
              <motion.button
                onClick={handleBack}
                className="text-gray-600 hover:text-black transition-colors mb-6"
                whileHover={{ x: -5 }}
              >
                ← Back to selection
              </motion.button>

              {/* New Patient Form */}
              {selectedType === "new" && !showForm && (
                <div className="bg-white border-2 border-black p-8 md:p-12 text-center">
                  <h3 className="text-gray-900 mb-6" style={{ fontSize: '28px' }}>
                    Let's get started
                  </h3>
                  <p className="text-gray-700 mb-10 max-w-2xl mx-auto">
                    We will ask you a series of questions that will guide your follow-up with an appointment coordinator.
                  </p>

                  <motion.button
                    onClick={handleContinue}
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
                      If this is a mental health emergency, call or text 988 to talk to a counselor. If you are located outside of the United States, please visit{' '}
                      <a 
                        href="https://findahelpline.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-black underline hover:no-underline"
                      >
                        findahelpline.com
                      </a>
                      .
                    </p>
                    <p className="text-sm text-gray-700">
                      Read our{' '}
                      <a href="#" className="text-black underline hover:no-underline">
                        privacy policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              )}

              {selectedType === "new" && showForm && isPatient === null && (
                <div className="bg-white border-2 border-black p-8 md:p-12 text-center">
                  <h3 className="text-gray-900 mb-8" style={{ fontSize: '28px' }}>
                    Are you the patient?
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {/* Yes - I'm the patient */}
                    <motion.button
                      onClick={() => handlePatientSelection(true)}
                      className="border-2 border-black bg-white p-10 text-center hover:bg-black hover:text-white transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col items-center gap-4">
                        <User className="w-12 h-12 text-black group-hover:text-white transition-colors" />
                        <div>
                          <h4 className="text-gray-900 group-hover:text-white mb-2 transition-colors">
                            Yes
                          </h4>
                          <p className="text-gray-600 group-hover:text-gray-200 font-normal transition-colors">
                            I'm the patient
                          </p>
                        </div>
                      </div>
                    </motion.button>

                    {/* No - I'm requesting for someone else */}
                    <motion.button
                      onClick={() => handlePatientSelection(false)}
                      className="border-2 border-black bg-white p-10 text-center hover:bg-black hover:text-white transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col items-center gap-4">
                        <User className="w-12 h-12 text-black group-hover:text-white transition-colors" />
                        <div>
                          <h4 className="text-gray-900 group-hover:text-white mb-2 transition-colors">
                            No
                          </h4>
                          <p className="text-gray-600 group-hover:text-gray-200 font-normal transition-colors">
                            I'm requesting for someone else
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </div>
              )}

              {selectedType === "new" && showForm && isPatient !== null && willingToTravel === null && (
                <div className="bg-white border-2 border-black p-8 md:p-12">
                  <h3 className="text-gray-900 mb-6" style={{ fontSize: '28px' }}>
                    Are you able and willing to travel to Berlin to receive care?
                  </h3>
                  
                  <div className="mb-8">
                    <p className="text-gray-700 mb-4">
                      Getting an appointment at Agency for Patient Care will require you to travel to our facility in Berlin, Germany.
                    </p>
                    <p className="text-gray-700">
                      Agency for Patient Care does not provide care to patients through remote appointments or video conferences.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
                    {/* Yes */}
                    <motion.button
                      onClick={() => handleTravelSelection(true)}
                      className="border-2 border-black bg-white px-12 py-4 text-center hover:bg-black hover:text-white transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h4 className="text-gray-900 group-hover:text-white transition-colors">
                        Yes
                      </h4>
                    </motion.button>

                    {/* No */}
                    <motion.button
                      onClick={() => handleTravelSelection(false)}
                      className="border-2 border-black bg-white px-12 py-4 text-center hover:bg-black hover:text-white transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h4 className="text-gray-900 group-hover:text-white transition-colors">
                        No
                      </h4>
                    </motion.button>
                  </div>

                  <div className="border-t-2 border-gray-200 pt-6 text-center">
                    <a href="#" className="text-black underline hover:no-underline text-sm">
                      Get help
                    </a>
                  </div>
                </div>
              )}

              {selectedType === "new" && showForm && isPatient !== null && willingToTravel !== null && (
                <div className="bg-white border-2 border-black p-8 md:p-12">
                  <h3 className="text-gray-900 mb-8" style={{ fontSize: '28px' }}>New Patient Registration</h3>
                  <form onSubmit={handleSubmit}>
                    {/* Personal Information */}
                    <div className="mb-10">
                      <h4 className="text-gray-900 mb-6">
                        Personal Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-gray-700 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                            placeholder="Enter your last name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                            placeholder="your.email@example.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                            placeholder="+49 123 456 7890"
                          />
                        </div>
                        <div>
                          <label htmlFor="dateOfBirth" className="block text-gray-700 mb-2">
                            Date of Birth *
                          </label>
                          <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="mb-10">
                      <h4 className="text-gray-900 mb-6">
                        Appointment Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label htmlFor="service" className="block text-gray-700 mb-2">
                            Service / Specialty *
                          </label>
                          <div className="relative">
                            <select
                              id="service"
                              name="service"
                              value={formData.service}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors appearance-none bg-white"
                            >
                              <option value="">Select a service</option>
                              <option value="cardiology">Cardiology</option>
                              <option value="oncology">Oncology</option>
                              <option value="surgery">Surgery</option>
                              <option value="orthopedics">Orthopedics</option>
                              <option value="neurology">Neurology</option>
                              <option value="gastroenterology">Gastroenterology</option>
                              <option value="general">General Consultation</option>
                              <option value="other">Other</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="preferredDate" className="block text-gray-700 mb-2">
                            Preferred Date *
                          </label>
                          <input
                            type="date"
                            id="preferredDate"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label htmlFor="preferredTime" className="block text-gray-700 mb-2">
                            Preferred Time *
                          </label>
                          <div className="relative">
                            <select
                              id="preferredTime"
                              name="preferredTime"
                              value={formData.preferredTime}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors appearance-none bg-white"
                            >
                              <option value="">Select a time</option>
                              <option value="08:00">08:00 AM</option>
                              <option value="09:00">09:00 AM</option>
                              <option value="10:00">10:00 AM</option>
                              <option value="11:00">11:00 AM</option>
                              <option value="12:00">12:00 PM</option>
                              <option value="13:00">01:00 PM</option>
                              <option value="14:00">02:00 PM</option>
                              <option value="15:00">03:00 PM</option>
                              <option value="16:00">04:00 PM</option>
                              <option value="17:00">05:00 PM</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Medical History Upload */}
                    <div className="mb-10">
                      <h4 className="text-gray-900 mb-6">
                        Medical History (Optional)
                      </h4>
                      <div>
                        <label htmlFor="medicalHistory" className="block text-gray-700 mb-2">
                          Upload Medical Records
                        </label>
                        <input
                          type="file"
                          id="medicalHistory"
                          name="medicalHistory"
                          onChange={(e) => handleFileChange(e, "medicalHistory")}
                          accept=".pdf,.doc,.docx"
                          className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                        />
                        <p className="text-sm text-gray-500 mt-2">Accepted formats: PDF, DOC, DOCX (Max 10MB)</p>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="mb-10">
                      <h4 className="text-gray-900 mb-6">
                        Additional Information
                      </h4>
                      <div>
                        <label htmlFor="message" className="block text-gray-700 mb-2">
                          Message / Reason for Visit
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors resize-none"
                          placeholder="Please provide any additional information about your medical concerns or questions..."
                        ></textarea>
                      </div>
                    </div>

                    {/* Privacy Notice */}
                    <div className="mb-8 p-6 bg-gray-50 border-2 border-gray-200">
                      <p className="text-sm text-gray-600">
                        <strong className="text-gray-900">Privacy Notice:</strong> Your personal information is protected under European data protection laws (GDPR). All information provided will be kept strictly confidential and used solely for the purpose of scheduling and managing your appointment.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                      <motion.button
                        type="submit"
                        className="border-2 border-black text-black px-12 py-4 hover:bg-black hover:text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Submit Request
                      </motion.button>
                      <p className="text-sm text-gray-600">
                        We'll contact you within 24 hours
                      </p>
                    </div>
                  </form>
                </div>
              )}

              {/* Returning Patient Form */}
              {selectedType === "returning" && (
                <div className="bg-white border-2 border-black p-8 md:p-12">
                  <h3 className="text-gray-900 mb-8" style={{ fontSize: '28px' }}>Returning Patient Appointment</h3>
                  <form onSubmit={handleSubmit}>
                    {/* Patient Account Login */}
                    <div className="mb-10">
                      <h4 className="text-gray-900 mb-6">
                        Account Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="patientId" className="block text-gray-700 mb-2">
                            Patient ID *
                          </label>
                          <input
                            type="text"
                            id="patientId"
                            name="patientId"
                            value={formData.patientId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                            placeholder="Enter your patient ID"
                          />
                        </div>
                        <div>
                          <label htmlFor="patientEmail" className="block text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="patientEmail"
                            name="patientEmail"
                            value={formData.patientEmail}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Appointment Selection */}
                    <div className="mb-10">
                      <h4 className="text-gray-900 mb-6 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Appointment Request
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label htmlFor="service" className="block text-gray-700 mb-2">
                            Service / Specialty *
                          </label>
                          <div className="relative">
                            <select
                              id="service"
                              name="service"
                              value={formData.service}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors appearance-none bg-white"
                            >
                              <option value="">Select a service</option>
                              <option value="cardiology">Cardiology</option>
                              <option value="oncology">Oncology</option>
                              <option value="surgery">Surgery</option>
                              <option value="orthopedics">Orthopedics</option>
                              <option value="neurology">Neurology</option>
                              <option value="gastroenterology">Gastroenterology</option>
                              <option value="general">General Consultation</option>
                              <option value="other">Other</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="preferredDate" className="block text-gray-700 mb-2">
                            Preferred Date *
                          </label>
                          <input
                            type="date"
                            id="preferredDate"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label htmlFor="preferredTime" className="block text-gray-700 mb-2">
                            Preferred Time *
                          </label>
                          <div className="relative">
                            <select
                              id="preferredTime"
                              name="preferredTime"
                              value={formData.preferredTime}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors appearance-none bg-white"
                            >
                              <option value="">Select a time</option>
                              <option value="08:00">08:00 AM</option>
                              <option value="09:00">09:00 AM</option>
                              <option value="10:00">10:00 AM</option>
                              <option value="11:00">11:00 AM</option>
                              <option value="12:00">12:00 PM</option>
                              <option value="13:00">01:00 PM</option>
                              <option value="14:00">02:00 PM</option>
                              <option value="15:00">03:00 PM</option>
                              <option value="16:00">04:00 PM</option>
                              <option value="17:00">05:00 PM</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="mb-10">
                      <h4 className="text-gray-900 mb-6 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Additional Notes
                      </h4>
                      <div>
                        <label htmlFor="message" className="block text-gray-700 mb-2">
                          Message (Optional)
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors resize-none"
                          placeholder="Any additional information..."
                        ></textarea>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                      <motion.button
                        type="submit"
                        className="border-2 border-black text-black px-12 py-4 hover:bg-black hover:text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Request Appointment
                      </motion.button>
                      <p className="text-sm text-gray-600">
                        We'll contact you within 24 hours
                      </p>
                    </div>
                  </form>
                </div>
              )}

              {/* Referring Physician Form */}
              {selectedType === "physician" && (
                <div className="bg-white border-2 border-black p-8 md:p-12">
                  <h3 className="text-gray-900 mb-8" style={{ fontSize: '28px' }}>Physician Referral</h3>
                  <form onSubmit={handleSubmit}>
                    {/* Physician Information */}
                    <div className="mb-10">
                      <h4 className="text-gray-900 mb-6 flex items-center gap-2">
                        <Stethoscope className="w-5 h-5" />
                        Physician Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="physicianName" className="block text-gray-700 mb-2">
                            Physician Name *
                          </label>
                          <input
                            type="text"
                            id="physicianName"
                            name="physicianName"
                            value={formData.physicianName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                            placeholder="Dr. Full Name"
                          />
                        </div>
                        <div>
                          <label htmlFor="licenseNumber" className="block text-gray-700 mb-2">
                            Medical License Number *
                          </label>
                          <input
                            type="text"
                            id="licenseNumber"
                            name="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                            placeholder="License number"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Practice Information */}
                    <div className="mb-10">
                      <h4 className="text-gray-900 mb-6 flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        Practice Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label htmlFor="practiceName" className="block text-gray-700 mb-2">
                            Practice Name *
                          </label>
                          <input
                            type="text"
                            id="practiceName"
                            name="practiceName"
                            value={formData.practiceName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                            placeholder="Practice or clinic name"
                          />
                        </div>
                        <div>
                          <label htmlFor="practicePhone" className="block text-gray-700 mb-2">
                            Practice Phone *
                          </label>
                          <input
                            type="tel"
                            id="practicePhone"
                            name="practicePhone"
                            value={formData.practicePhone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                            placeholder="+49 123 456 7890"
                          />
                        </div>
                        <div>
                          <label htmlFor="practiceEmail" className="block text-gray-700 mb-2">
                            Practice Email *
                          </label>
                          <input
                            type="email"
                            id="practiceEmail"
                            name="practiceEmail"
                            value={formData.practiceEmail}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                            placeholder="practice@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Patient Referral Details */}
                    <div className="mb-10">
                      <h4 className="text-gray-900 mb-6 flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Patient Referral Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="patientFirstName" className="block text-gray-700 mb-2">
                            Patient First Name *
                          </label>
                          <input
                            type="text"
                            id="patientFirstName"
                            name="patientFirstName"
                            value={formData.patientFirstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                            placeholder="Patient's first name"
                          />
                        </div>
                        <div>
                          <label htmlFor="patientLastName" className="block text-gray-700 mb-2">
                            Patient Last Name *
                          </label>
                          <input
                            type="text"
                            id="patientLastName"
                            name="patientLastName"
                            value={formData.patientLastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                            placeholder="Patient's last name"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="consultationType" className="block text-gray-700 mb-2">
                            Consultation Type *
                          </label>
                          <div className="relative">
                            <select
                              id="consultationType"
                              name="consultationType"
                              value={formData.consultationType}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors appearance-none bg-white"
                            >
                              <option value="">Select consultation type</option>
                              <option value="cardiology">Cardiology Consultation</option>
                              <option value="oncology">Oncology Consultation</option>
                              <option value="surgery">Surgical Consultation</option>
                              <option value="orthopedics">Orthopedic Consultation</option>
                              <option value="neurology">Neurology Consultation</option>
                              <option value="gastroenterology">Gastroenterology Consultation</option>
                              <option value="general">General Consultation</option>
                              <option value="other">Other</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Medical Records Upload */}
                    <div className="mb-10">
                      <h4 className="text-gray-900 mb-6 flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        Medical Records
                      </h4>
                      <div>
                        <label htmlFor="medicalRecords" className="block text-gray-700 mb-2">
                          Upload Patient Medical Records *
                        </label>
                        <input
                          type="file"
                          id="medicalRecords"
                          name="medicalRecords"
                          onChange={(e) => handleFileChange(e, "medicalRecords")}
                          required
                          accept=".pdf,.doc,.docx"
                          className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                        />
                        <p className="text-sm text-gray-500 mt-2">Accepted formats: PDF, DOC, DOCX (Max 10MB)</p>
                      </div>
                    </div>

                    {/* Referral Reason */}
                    <div className="mb-10">
                      <h4 className="text-gray-900 mb-6 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Referral Information
                      </h4>
                      <div>
                        <label htmlFor="referralReason" className="block text-gray-700 mb-2">
                          Reason for Referral *
                        </label>
                        <textarea
                          id="referralReason"
                          name="referralReason"
                          value={formData.referralReason}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors resize-none"
                          placeholder="Please provide detailed information about the reason for referral, patient's current condition, and any relevant medical history..."
                        ></textarea>
                      </div>
                    </div>

                    {/* Privacy Notice */}
                    <div className="mb-8 p-6 bg-gray-50 border-2 border-gray-200">
                      <p className="text-sm text-gray-600">
                        <strong className="text-gray-900">Confidentiality Notice:</strong> All patient information and medical records are protected under GDPR and medical confidentiality laws. Information will be used solely for consultation and treatment purposes.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                      <motion.button
                        type="submit"
                        className="border-2 border-black text-black px-12 py-4 hover:bg-black hover:text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Submit Referral
                      </motion.button>
                      <p className="text-sm text-gray-600">
                        We'll contact you within 24 hours
                      </p>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phone Appointment Block */}
        <motion.div
          className="mt-16 mb-24 p-8 md:p-12 bg-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-gray-900 mb-6" style={{ fontSize: '28px' }}>
            Still want to schedule by phone?
          </h3>
          
          <div className="space-y-6">
            <div>
              <p className="text-gray-700 mb-4">
                To request an appointment with Agency for Patient Care, you can email us at{' '}
                <a href="mailto:contact@gmed-health.com" className="text-black underline hover:no-underline">
                  contact@gmed-health.com
                </a>{' '}
                or call{' '}
                <a href="tel:+498912345678" className="text-black underline hover:no-underline">
                  +49 (89) 123-4567
                </a>
                . Our office is open Monday through Friday, 8:00 AM – 6:00 PM, and Saturday, 9:00 AM – 2:00 PM (Central European Time).
              </p>
            </div>

            <div className="border-t-2 border-gray-200 pt-6">
              <h4 className="text-gray-900 mb-4">Agency for Patient Care Location</h4>
              <p className="text-gray-700">
                Albert-Schweitzer-Straße 56<br />
                81735 München, Germany
              </p>
            </div>

            <div className="border-t-2 border-gray-200 pt-6">
              <p className="text-gray-700">
                Our dedicated team provides compassionate support and seamless coordination throughout your healthcare journey. We simplify access to Germany's leading medical institutions for patients everywhere, with 24/7 personal assistance to help you navigate every step.
              </p>
            </div>

            <div className="border-t-2 border-gray-200 pt-6">
              <p className="text-gray-700">
                For international patients requiring additional assistance with travel arrangements, accommodation, or multilingual support, our team is here to help. We value your time and provide unlimited support to find the best solutions for your healthcare needs.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}