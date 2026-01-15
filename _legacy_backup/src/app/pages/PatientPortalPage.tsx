import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function PatientPortalPage() {
  const portalFeatures = [
    {
      image: "https://images.unsplash.com/photo-1617131633412-39437b40a16b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hlZHVsZSUyMGFwcG9pbnRtZW50JTIwY2FsZW5kYXJ8ZW58MXx8fHwxNzY2MTUwNDU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Schedule Appointments",
      description: "Book, reschedule, or cancel appointments with your healthcare providers."
    },
    {
      image: "https://images.unsplash.com/photo-1693328397193-b858f1b38c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV3JTIwcmVjb3JkcyUyMGRvY3VtZW50c3xlbnwxfHx8fDE3NjYxNTA0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "View Medical Records",
      description: "Access your complete medical history, test results, and imaging reports."
    },
    {
      image: "https://images.unsplash.com/photo-1762330469637-dfbb6e014a16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cmUlMjBtZXNzYWdpbmclMjBjb21tdW5pY2F0aW9ufGVufDF8fHx8MTc2NjE1MDQ1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Secure Messaging",
      description: "Communicate directly with your care team and get answers to your questions."
    },
    {
      image: "https://images.unsplash.com/photo-1631669969504-f35518bf96ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzY3JpcHRpb24lMjBtZWRpY2F0aW9uJTIwcGlsbHN8ZW58MXx8fHwxNzY2MDcwNzMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Prescription Refills",
      description: "Request prescription refills and view your medication history."
    },
    {
      image: "https://images.unsplash.com/photo-1762768767074-e491f1eebdfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB0cmFja2luZyUyMGRhdGF8ZW58MXx8fHwxNzY2MTUwNDYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Track Health Data",
      description: "Monitor vitals, lab results, and wellness metrics over time."
    },
    {
      image: "https://images.unsplash.com/photo-1762340275855-ae8f4c2c144e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzY2MTUwNDYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Manage Profile",
      description: "Update your contact information, insurance details, and preferences."
    }
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "patient portal" }]} />

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
              Patient Portal
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: '20px', lineHeight: '1.6' }}>
              Your personal health hub for managing all aspects of your care
            </p>
          </motion.div>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="max-w-md mx-auto bg-white rounded-lg border-2 border-gray-200 p-8 mb-20 shadow-lg">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white" style={{ fontSize: '32px', fontWeight: 600 }}>P</span>
              </div>
              <h2 className="mb-2" style={{ fontSize: '28px', fontWeight: 500 }}>
                Log In to Your Portal
              </h2>
              <p className="text-gray-600" style={{ fontSize: '14px' }}>
                Access your health information securely
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button className="w-full border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors mb-4 cursor-pointer">
              <span style={{ fontSize: '16px', fontWeight: 500 }}>Sign In</span>
            </button>

            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-blue-600 hover:underline" style={{ fontSize: '13px' }}>
                Forgot password?
              </a>
              <a href="#" className="text-blue-600 hover:underline" style={{ fontSize: '13px' }}>
                Create account
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <h2 className="text-center mb-12" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Portal Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portalFeatures.map((feature, index) => (
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
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
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                Why Use the Portal?
              </h2>
              <ul className="space-y-4">
                {[
                  "24/7 access to your health information from any device",
                  "Reduce phone wait times by messaging your care team",
                  "Never miss an appointment with automated reminders",
                  "Keep all your health records in one secure location",
                  "Share your medical information with family members",
                  "Review test results as soon as they're available"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                    <p className="text-gray-700" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                      {benefit}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-12">
              <h3 className="mb-6" style={{ fontSize: '24px', fontWeight: 500 }}>
                Getting Started
              </h3>
              <ol className="space-y-4">
                {[
                  "Create your account with your email and medical record number",
                  "Verify your identity through our secure verification process",
                  "Set up your profile and preferences",
                  "Start managing your health online!"
                ].map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0" style={{ fontSize: '14px', fontWeight: 600 }}>
                      {index + 1}
                    </div>
                    <p className="text-gray-700 pt-1" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="text-center">
            <h2 className="mb-4" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Need Help with the Portal?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto" style={{ fontSize: '16px', lineHeight: '1.6' }}>
              Our support team is available to assist you with registration, login issues, or any portal questions.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer">
                <span style={{ fontSize: '16px', fontWeight: 500 }}>Contact Support</span>
              </button>
              <button className="px-8 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                <span style={{ fontSize: '16px', fontWeight: 500 }}>View Tutorial</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}