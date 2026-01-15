import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function DataSecurityPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "data security" }]} />

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
              Data Security
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: '20px', lineHeight: '1.6' }}>
              Advanced protection measures to safeguard your most sensitive information
            </p>
          </motion.div>
        </div>
      </section>

      {/* Security Measures */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Cybersecurity"
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
                Enterprise-Grade Security
              </h2>
              <p className="text-gray-600 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                We employ multiple layers of security to protect your health information from 
                unauthorized access, ensuring your data remains confidential and secure at all times.
              </p>
              <p className="text-gray-600" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Our security infrastructure meets and exceeds industry standards, including 
                HIPAA compliance, SOC 2 certification, and regular third-party security audits.
              </p>
            </motion.div>
          </div>

          {/* Security Features */}
          <div className="mb-20">
            <h2 className="text-center mb-12" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Our Security Measures
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  image: "https://images.unsplash.com/photo-1597781914467-a5b93258e748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmNyeXB0aW9uJTIwc2VjdXJpdHklMjBsb2NrfGVufDF8fHx8MTc2NjE1MDMxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  title: "End-to-End Encryption",
                  description: "All data is encrypted both in transit and at rest using AES-256 encryption standards."
                },
                {
                  image: "https://images.unsplash.com/flagged/photo-1579274216947-86eaa4b00475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwY2VudGVyJTIwc2VydmVyc3xlbnwxfHx8fDE3NjYxNTAxNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  title: "Secure Data Centers",
                  description: "Your information is stored in SOC 2 certified facilities with 24/7 physical security."
                },
                {
                  image: "https://images.unsplash.com/photo-1765710475256-1708882da66e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2Nlc3MlMjBjb250cm9sJTIwc2VjdXJpdHl8ZW58MXx8fHwxNzY2MTUwMzExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  title: "Access Controls",
                  description: "Multi-factor authentication and role-based access ensure only authorized personnel can view your data."
                },
                {
                  image: "https://images.unsplash.com/photo-1704969724221-8b7361b61f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWRpdCUyMGNvbXBsaWFuY2UlMjBjaGVja3xlbnwxfHx8fDE3NjYxNTAzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  title: "Regular Audits",
                  description: "Continuous monitoring and quarterly security assessments to identify and address vulnerabilities."
                },
                {
                  image: "https://images.unsplash.com/photo-1762340916350-ad5a3d620c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aHJlYXQlMjBkZXRlY3Rpb24lMjBzZWN1cml0eXxlbnwxfHx8fDE3NjYxNTAzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  title: "Threat Detection",
                  description: "Advanced intrusion detection systems monitor for suspicious activity 24/7."
                },
                {
                  image: "https://images.unsplash.com/photo-1586974175094-0a7259238613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrdXAlMjByZWNvdmVyeSUyMGRhdGF8ZW58MXx8fHwxNzY2MTUwMzEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  title: "Backup & Recovery",
                  description: "Automated daily backups with disaster recovery procedures to prevent data loss."
                }
              ].map((feature, index) => (
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
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  <div className="bg-white p-6 border-2 border-gray-200 border-t-0 rounded-b-2xl flex-grow">
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

          {/* Compliance */}
          <div className="bg-gray-50 rounded-lg p-12 mb-20">
            <h2 className="mb-8" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Compliance & Certifications
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="mb-4" style={{ fontSize: '24px', fontWeight: 500 }}>
                  HIPAA Compliance
                </h3>
                <p className="text-gray-600 mb-4" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                  We are fully compliant with the Health Insurance Portability and Accountability 
                  Act (HIPAA), ensuring the highest standards of patient privacy and data security.
                </p>
                <ul className="space-y-2">
                  {[
                    "Privacy Rule compliance",
                    "Security Rule implementation",
                    "Breach notification procedures",
                    "Business Associate Agreements"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-600"></div>
                      </div>
                      <span className="text-gray-700" style={{ fontSize: '14px' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4" style={{ fontSize: '24px', fontWeight: 500 }}>
                  Industry Certifications
                </h3>
                <p className="text-gray-600 mb-4" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                  Our security practices are validated by independent third-party auditors and 
                  meet rigorous industry standards.
                </p>
                <ul className="space-y-2">
                  {[
                    "SOC 2 Type II Certified",
                    "ISO 27001 Compliant",
                    "HITRUST CSF Certified",
                    "Annual penetration testing"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-600"></div>
                      </div>
                      <span className="text-gray-700" style={{ fontSize: '14px' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Employee Training */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                Staff Training & Awareness
              </h2>
              <p className="text-gray-600 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Every member of our team undergoes comprehensive security training to ensure they 
                understand their role in protecting your information.
              </p>
              <ul className="space-y-3">
                {[
                  "Annual HIPAA and security training for all staff",
                  "Regular updates on emerging security threats",
                  "Strict policies for handling patient information",
                  "Background checks for all employees"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                    <p className="text-gray-700" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                      {item}
                    </p>
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
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Team training"
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Report Security Concerns */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="text-center">
            <h2 className="mb-4" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Report a Security Concern
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto" style={{ fontSize: '16px', lineHeight: '1.6' }}>
              If you believe you've identified a security vulnerability or have concerns about 
              the security of your information, please contact us immediately.
            </p>
            <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer">
              <span style={{ fontSize: '16px', fontWeight: 500 }}>Contact Security Team</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}