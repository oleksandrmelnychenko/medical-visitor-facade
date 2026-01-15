import { motion } from "motion/react";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function HIPAACompliancePage() {
  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "hipaa compliance" }]} />

      {/* Hero Section */}
      <section className="relative bg-white py-24">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="uppercase mb-6" style={{ fontSize: '64px', lineHeight: '68px', fontWeight: 600, letterSpacing: '-0.02em' }}>
              HIPAA Compliance
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: '20px', lineHeight: '1.6' }}>
              Our commitment to protecting your health information through comprehensive compliance
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is HIPAA */}
      <section className="py-20">
        <div className="container mx-auto max-w-[1200px]">
          <div className="mb-20">
            <h2 className="mb-6" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              What is HIPAA?
            </h2>
            <p className="text-gray-600 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
              The Health Insurance Portability and Accountability Act (HIPAA) is a federal law 
              that establishes national standards to protect sensitive patient health information 
              from being disclosed without the patient's consent or knowledge.
            </p>
            <p className="text-gray-600" style={{ fontSize: '16px', lineHeight: '1.8' }}>
              At Gmed, we take HIPAA compliance seriously and have implemented comprehensive 
              policies and procedures to ensure your Protected Health Information (PHI) remains 
              secure and confidential.
            </p>
          </div>

          {/* HIPAA Rules */}
          <div className="mb-20">
            <h2 className="text-center mb-12" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              HIPAA Rules We Follow
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Privacy Rule",
                  description: "Establishes national standards for the protection of health information and gives patients rights over their health information.",
                  points: [
                    "Right to access your medical records",
                    "Right to request corrections to your records",
                    "Right to know who has accessed your information",
                    "Right to receive privacy notices"
                  ]
                },
                {
                  title: "Security Rule",
                  description: "Sets standards for protecting electronic health information through administrative, physical, and technical safeguards.",
                  points: [
                    "Encryption of electronic health records",
                    "Secure access controls and authentication",
                    "Regular security risk assessments",
                    "Incident response procedures"
                  ]
                },
                {
                  title: "Breach Notification Rule",
                  description: "Requires covered entities to notify affected individuals in the event of a breach of unsecured protected health information.",
                  points: [
                    "Individual notification within 60 days",
                    "Media notification for large breaches",
                    "HHS notification reporting",
                    "Documentation of all breaches"
                  ]
                },
                {
                  title: "Omnibus Rule",
                  description: "Strengthens privacy and security protections for health information and extends HIPAA requirements to business associates.",
                  points: [
                    "Business associate compliance",
                    "Enhanced patient privacy rights",
                    "Increased penalty enforcement",
                    "Genetic information protection"
                  ]
                }
              ].map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 h-full flex flex-col">
                    <h3 className="mb-3" style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                      {rule.title}
                    </h3>
                    <p className="text-gray-600 mb-5" style={{ fontSize: '14px', lineHeight: '1.7' }}>
                      {rule.description}
                    </p>
                    <ul className="space-y-2 flex-1">
                      {rule.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-gray-700" style={{ fontSize: '13px', lineHeight: '1.5' }}>
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Our Compliance Measures */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-12 pb-4 mb-4">
            <h2 className="mb-8" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              How We Ensure Compliance
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="mb-4" style={{ fontSize: '20px', fontWeight: 500 }}>
                  Administrative Safeguards
                </h3>
                <ul className="space-y-3">
                  {[
                    "Designated Privacy Officer and Security Officer",
                    "Comprehensive employee training programs",
                    "Written policies and procedures",
                    "Regular risk assessments and audits",
                    "Workforce sanctions policy"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4" style={{ fontSize: '20px', fontWeight: 500 }}>
                  Physical Safeguards
                </h3>
                <ul className="space-y-3">
                  {[
                    "Controlled facility access with badge systems",
                    "Secure workstation and device policies",
                    "Proper disposal of PHI-containing materials",
                    "Visitor logging and escort procedures",
                    "Surveillance and monitoring systems"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4" style={{ fontSize: '20px', fontWeight: 500 }}>
                  Technical Safeguards
                </h3>
                <ul className="space-y-3">
                  {[
                    "Unique user identification and authentication",
                    "Automatic logoff after inactivity",
                    "Encryption and decryption of ePHI",
                    "Audit controls and monitoring",
                    "Transmission security protocols"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4" style={{ fontSize: '20px', fontWeight: 500 }}>
                  Ongoing Monitoring
                </h3>
                <ul className="space-y-3">
                  {[
                    "Continuous compliance monitoring",
                    "Regular security updates and patches",
                    "Incident response and reporting",
                    "Annual compliance audits",
                    "Updates to policies as regulations evolve"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="text-center">
            <h2 className="mb-4" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Questions About HIPAA?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto" style={{ fontSize: '16px', lineHeight: '1.6' }}>
              Our Privacy Officer is available to answer your questions about HIPAA compliance 
              and your privacy rights.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer">
                <span style={{ fontSize: '16px', fontWeight: 500 }}>Contact Privacy Officer</span>
              </button>
              <button className="px-8 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                <span style={{ fontSize: '16px', fontWeight: 500 }}>Download Notice</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}