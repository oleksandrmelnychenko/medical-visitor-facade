import { motion } from "motion/react";
import { Scale, FileText, MessageSquare, UserCheck, AlertCircle, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function PatientRightsPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "patient rights" }]} />

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
              Patient Rights
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: '20px', lineHeight: '1.6' }}>
              Understanding your rights as a patient and our commitment to respecting them
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-[1200px]">
          {/* Introduction */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6" style={{ fontSize: '36px', lineHeight: '1.2', fontWeight: 400 }}>
                Your Rights Matter
              </h2>
              <p className="text-gray-600 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                As a patient at Gmed, you have fundamental rights that guide how we provide your 
                care. These rights are designed to ensure you receive respectful, safe, and 
                high-quality healthcare.
              </p>
              <p className="text-gray-600" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                We are committed to protecting these rights and ensuring you understand them 
                fully so you can be an active participant in your healthcare decisions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Patient consultation"
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
          </div>

          {/* Core Rights */}
          <div className="mb-20">
            <h2 className="mb-12" style={{ fontSize: '36px', lineHeight: '1.2', fontWeight: 400 }}>
              Your Core Rights
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Right to Respectful Care",
                  description: "You have the right to receive care that respects your personal values, beliefs, and preferences, free from discrimination.",
                  details: [
                    "Dignified and compassionate treatment",
                    "Cultural and spiritual considerations",
                    "Language assistance when needed",
                    "Privacy and confidentiality"
                  ]
                },
                {
                  title: "Right to Information",
                  description: "You have the right to receive complete and accurate information about your diagnosis, treatment options, and prognosis.",
                  details: [
                    "Clear explanations in understandable language",
                    "Access to your medical records",
                    "Information about costs and payment options",
                    "Details about your healthcare providers"
                  ]
                },
                {
                  title: "Right to Make Decisions",
                  description: "You have the right to participate in all decisions about your healthcare and to refuse treatment.",
                  details: [
                    "Informed consent for all procedures",
                    "Second opinion opportunities",
                    "Right to refuse treatment",
                    "Advance directive recognition"
                  ]
                },
                {
                  title: "Right to Communication",
                  description: "You have the right to communicate with your healthcare providers and have your concerns addressed.",
                  details: [
                    "Ask questions and receive answers",
                    "Voice concerns and complaints",
                    "Designate family members for communication",
                    "Access to patient advocates"
                  ]
                }
              ].map((right, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 h-full flex flex-col">
                    <h3 className="mb-4" style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                      {right.title}
                    </h3>
                    <p className="text-gray-600 mb-5" style={{ fontSize: '14px', lineHeight: '1.7' }}>
                      {right.description}
                    </p>
                    <ul className="space-y-2 flex-1">
                      {right.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700" style={{ fontSize: '13px', lineHeight: '1.5' }}>
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional Rights */}
          <div className="bg-gray-50 rounded-lg p-12 mb-20">
            <h2 className="mb-8" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Additional Patient Rights
            </h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
              {[
                "Right to safe, quality healthcare services",
                "Right to privacy during examination and treatment",
                "Right to have your pain assessed and managed",
                "Right to continuity of care and care coordination",
                "Right to be informed about hospital policies",
                "Right to formulate advance directives",
                "Right to have family and friends visit",
                "Right to access protective services",
                "Right to emergency medical treatment",
                "Right to transfer to another facility",
                "Right to review your bill and receive an explanation",
                "Right to designate a healthcare representative"
              ].map((right, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 py-2"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                    {right}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Responsibilities */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Healthcare partnership"
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6" style={{ fontSize: '36px', lineHeight: '1.2', fontWeight: 400 }}>
                Your Responsibilities
              </h2>
              <p className="text-gray-600 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Along with your rights, patients have certain responsibilities to help ensure 
                the best possible care for themselves and others.
              </p>
              <ul className="space-y-3">
                {[
                  "Provide accurate and complete health information",
                  "Follow the treatment plan agreed upon with your healthcare team",
                  "Ask questions when you don't understand",
                  "Treat healthcare providers and staff with respect",
                  "Keep appointments or notify us if you cannot",
                  "Meet financial obligations for your care"
                ].map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                    <p className="text-gray-700" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                      {responsibility}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* File a Grievance */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <h2 className="mb-8" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
            File a Grievance
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-600 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                If you believe your rights have been violated or you have concerns about your 
                care, you have the right to file a grievance without fear of retaliation.
              </p>
              <p className="text-gray-600" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                We take all complaints seriously and will investigate thoroughly. You may also 
                file a complaint with state or federal agencies.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <button className="px-8 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors cursor-pointer">
                <span style={{ fontSize: '16px', fontWeight: 500 }}>File a Complaint</span>
              </button>
              <button className="px-8 py-3 border-2 border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer">
                <span style={{ fontSize: '16px', fontWeight: 500 }}>Contact Patient Advocate</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}