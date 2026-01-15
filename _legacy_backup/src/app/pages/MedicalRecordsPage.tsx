import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function MedicalRecordsPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "medical records" }]} />

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
              Medical Records
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: '20px', lineHeight: '1.6' }}>
              Secure, convenient access to your complete health information
            </p>
          </motion.div>
        </div>
      </section>

      {/* Access Portal */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="max-w-2xl mx-auto bg-white rounded-lg border-2 border-gray-200 p-8 mb-20">
            <h2 className="text-center mb-6" style={{ fontSize: '28px', fontWeight: 500 }}>
              Access Your Medical Records
            </h2>
            <p className="text-center text-gray-600 mb-8" style={{ fontSize: '14px', lineHeight: '1.6' }}>
              Log in to view and download your medical records, test results, and health history.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors cursor-pointer">
                <span style={{ fontSize: '16px', fontWeight: 500 }}>Access Records</span>
              </button>
            </div>
            <p className="text-center text-gray-600 mt-4" style={{ fontSize: '13px' }}>
              Don't have an account? <a href="#" className="text-blue-600 hover:underline">Register here</a>
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                image: "https://images.unsplash.com/photo-1691934286085-c88039d93dae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3dubG9hZCUyMG1lZGljYWwlMjBkb2N1bWVudHN8ZW58MXx8fHwxNzY2MTUwMjYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                title: "Download Records",
                description: "Easily download your medical records, lab results, and imaging reports in PDF format."
              },
              {
                image: "https://images.unsplash.com/photo-1618912487390-8987d3c3b862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cGxvYWQlMjBmaWxlcyUyMGRpZ2l0YWx8ZW58MXx8fHwxNzY2MTUwMjYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                title: "Upload Documents",
                description: "Share records from other providers to ensure your care team has complete information."
              },
              {
                image: "https://images.unsplash.com/photo-1621107087907-a57ec37605c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwyNCUyMDclMjBhY2Nlc3MlMjBhbnl0aW1lfGVufDF8fHx8MTc2NjE1MDI2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                title: "24/7 Access",
                description: "View your health information anytime, anywhere from any device."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl group"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="bg-white p-6 border-2 border-gray-200 border-t-0 rounded-b-2xl">
                  <h3 className="mb-3" style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600" style={{ fontSize: '14px', lineHeight: '1.7' }}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Request Records */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Medical documents"
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                Request Medical Records
              </h2>
              <p className="text-gray-600 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Need to share your records with another provider or for personal use? Submit a 
                request and we'll process it within 3-5 business days.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Complete medical history",
                  "Laboratory test results",
                  "Imaging reports and films",
                  "Prescription history",
                  "Immunization records"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-3 h-3 rounded-full bg-green-600"></div>
                    </div>
                    <span className="text-gray-700" style={{ fontSize: '14px' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer">
                <span style={{ fontSize: '16px', fontWeight: 500 }}>Request Records</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="text-center">
            <h2 className="mb-4" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Your Privacy is Protected
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: '16px', lineHeight: '1.6' }}>
              We use industry-leading security measures to protect your medical records. All data 
              is encrypted and access is strictly controlled in compliance with HIPAA regulations. 
              Your information is never shared without your explicit consent.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}