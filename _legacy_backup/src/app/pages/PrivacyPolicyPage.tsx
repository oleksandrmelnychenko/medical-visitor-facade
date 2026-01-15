import { motion } from "motion/react";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "privacy policy" }]} />

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
              Privacy Policy
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: '20px', lineHeight: '1.6' }}>
              Your privacy and the security of your personal health information are our top priorities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-[1200px]">
          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: "Data Encrypted",
                description: "All information is secured with encryption"
              },
              {
                title: "Limited Access",
                description: "Only authorized personnel can view your records"
              },
              {
                title: "Your Control",
                description: "You decide who can access your information"
              }
            ].map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-lg"
              >
                <h3 className="mb-2" style={{ fontSize: '18px', fontWeight: 500 }}>
                  {point.title}
                </h3>
                <p className="text-gray-600" style={{ fontSize: '13px', lineHeight: '1.5' }}>
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Policy Content */}
          <div className="prose max-w-none">
            <div className="mb-12">
              <h2 className="mb-4" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                Notice of Privacy Practices
              </h2>
              <p className="text-gray-700 mb-4" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Effective Date: January 1, 2024
              </p>
              <p className="text-gray-600" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                This notice describes how medical information about you may be used and disclosed 
                and how you can get access to this information. Please review it carefully.
              </p>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="mb-4" style={{ fontSize: '24px', fontWeight: 500 }}>
                  How We Use and Disclose Your Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2" style={{ fontSize: '18px', fontWeight: 500 }}>
                      For Treatment
                    </h4>
                    <p className="text-gray-600" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                      We may use your health information to provide, coordinate, or manage your 
                      healthcare and related services. This includes sharing information with 
                      other healthcare providers involved in your care.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2" style={{ fontSize: '18px', fontWeight: 500 }}>
                      For Payment
                    </h4>
                    <p className="text-gray-600" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                      We may use and disclose your health information to obtain payment for 
                      services we provide to you, including billing and collection activities.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2" style={{ fontSize: '18px', fontWeight: 500 }}>
                      For Healthcare Operations
                    </h4>
                    <p className="text-gray-600" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                      We may use your information for quality improvement, training, and other 
                      business operations necessary to run our practice and ensure quality care.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4" style={{ fontSize: '24px', fontWeight: 500 }}>
                  Your Privacy Rights
                </h3>
                <ul className="space-y-3">
                  {[
                    "Right to request restrictions on certain uses and disclosures of your information",
                    "Right to receive confidential communications of your health information",
                    "Right to inspect and copy your health information",
                    "Right to amend your health information",
                    "Right to receive an accounting of disclosures",
                    "Right to obtain a paper copy of this notice"
                  ].map((right, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                        {right}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4" style={{ fontSize: '24px', fontWeight: 500 }}>
                  Our Responsibilities
                </h3>
                <p className="text-gray-600 mb-4" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                  We are required by law to:
                </p>
                <ul className="space-y-3">
                  {[
                    "Maintain the privacy of your protected health information",
                    "Provide you with this notice of our legal duties and privacy practices",
                    "Follow the terms of the notice currently in effect",
                    "Notify you if we are unable to agree to a requested restriction",
                    "Notify affected individuals following a breach of unsecured health information"
                  ].map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                        {responsibility}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center pt-8 border-t border-gray-200">
                <p className="text-gray-600" style={{ fontSize: '14px' }}>
                  Last Updated: January 1, 2024 | This notice is effective as of this date
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Questions or Complaints */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="text-center">
            <h2 className="mb-4" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Questions or Complaints?
            </h2>
            <p className="text-gray-600 mb-4 max-w-2xl mx-auto" style={{ fontSize: '16px', lineHeight: '1.6' }}>
              If you have questions about this notice or wish to file a complaint about our 
              privacy practices, please contact:
            </p>
            <div className="text-gray-700 mb-8" style={{ fontSize: '15px', lineHeight: '1.8' }}>
              <p><strong>Privacy Officer</strong></p>
              <p>Gmed Agency for Patient Care</p>
              <p>Email: privacy@gmed.org</p>
              <p>Phone: (555) 123-4567</p>
            </div>
            <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer">
              <span style={{ fontSize: '16px', fontWeight: 500 }}>Contact Privacy Officer</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}