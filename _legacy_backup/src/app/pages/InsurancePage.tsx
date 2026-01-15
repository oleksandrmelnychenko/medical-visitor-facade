import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function InsurancePage() {
  const acceptedInsurance = [
    "Blue Cross Blue Shield",
    "Aetna",
    "UnitedHealthcare",
    "Cigna",
    "Humana",
    "Medicare",
    "Medicaid",
    "Kaiser Permanente"
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "insurance & billing" }]} />

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
              Insurance & Billing
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: '20px', lineHeight: '1.6' }}>
              Transparent pricing and flexible payment options to make healthcare accessible
            </p>
          </motion.div>
        </div>
      </section>

      {/* Accepted Insurance */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="mb-20">
            <h2 className="text-center mb-12" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Accepted Insurance Plans
            </h2>
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {acceptedInsurance.map((insurance, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow"
                >
                  <p className="text-gray-700" style={{ fontSize: '16px', fontWeight: 500 }}>
                    {insurance}
                  </p>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-gray-600" style={{ fontSize: '14px' }}>
              Don't see your insurance? <a href="#" className="text-blue-600 hover:underline">Contact us</a> to verify coverage.
            </p>
          </div>

          {/* Billing Information */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                Understanding Your Bill
              </h2>
              <p className="text-gray-600 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                We believe in transparent pricing and clear communication about healthcare costs. 
                Our billing team works with you to understand your coverage and explain any 
                out-of-pocket expenses before treatment.
              </p>
              <ul className="space-y-3">
                {[
                  "Itemized billing statements",
                  "Insurance verification before appointments",
                  "Cost estimates for procedures",
                  "Flexible payment plans available"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-3 h-3 rounded-full bg-green-600"></div>
                    </div>
                    <span className="text-gray-700" style={{ fontSize: '14px' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Financial planning"
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
          </div>

          {/* Payment Options */}
          <div className="mb-20">
            <h2 className="text-center mb-12" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Payment Options
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  image: "https://images.unsplash.com/photo-1765226410758-9ae3d34cd791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBwYXltZW50JTIwc2VjdXJlfGVufDF8fHx8MTc2NjE1MDI2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  title: "Online Payment",
                  description: "Pay your bill securely online through our patient portal using credit/debit cards or bank transfer."
                },
                {
                  image: "https://images.unsplash.com/photo-1634128222187-18eababc763d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXltZW50JTIwcGxhbiUyMGZpbmFuY2V8ZW58MXx8fHwxNzY2MTUwMjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  title: "Payment Plans",
                  description: "Interest-free payment plans available for eligible patients to spread costs over time."
                },
                {
                  image: "https://images.unsplash.com/photo-1688126507367-b7cb61e19f30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBhc3Npc3RhbmNlJTIwaGVscHxlbnwxfHx8fDE3NjYxNTAyNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  title: "Financial Assistance",
                  description: "Financial aid programs for qualifying patients who need help covering medical expenses."
                }
              ].map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-2xl group h-full flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={option.image}
                      alt={option.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                  <div className="bg-white p-6 border-2 border-gray-200 border-t-0 rounded-b-2xl flex-grow">
                    <h3 className="mb-3" style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                      {option.title}
                    </h3>
                    <p className="text-gray-600" style={{ fontSize: '14px', lineHeight: '1.7' }}>
                      {option.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-gray-50 p-12">
            <h2 className="mb-8" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Common Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: "When will I receive my bill?",
                  answer: "Bills are typically sent within 2-3 weeks after your visit or procedure. You'll receive an email notification when your statement is ready."
                },
                {
                  question: "What if I can't afford my medical bill?",
                  answer: "We offer flexible payment plans and financial assistance programs. Contact our billing department to discuss options."
                },
                {
                  question: "How do I submit an insurance claim?",
                  answer: "We submit insurance claims directly to your provider. You only need to provide your insurance information at check-in."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 border-l-4 border-blue-600"
                >
                  <div>
                    <h3 className="mb-2" style={{ fontSize: '18px', fontWeight: 500 }}>
                      {faq.question}
                    </h3>
                    <p className="text-gray-600" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Billing */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="text-center">
            <h2 className="mb-4" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Questions About Your Bill?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto" style={{ fontSize: '16px', lineHeight: '1.6' }}>
              Our billing specialists are here to help you understand your charges and explore payment options.
            </p>
            <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer">
              <span style={{ fontSize: '16px', fontWeight: 500 }}>Contact Billing Department</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}