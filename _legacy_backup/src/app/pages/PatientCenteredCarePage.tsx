import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function PatientCenteredCarePage() {
  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "patient-centered care" }]} />

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
              Patient-Centered Care
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: '20px', lineHeight: '1.6' }}>
              Your health, your needs, and your preferences are at the heart of everything we do
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                Our Approach
              </h2>
              <p className="text-gray-600 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                At Gmed, we believe that exceptional healthcare goes beyond treating symptoms. 
                We focus on understanding you as a whole person, considering your physical, 
                emotional, and social needs.
              </p>
              <p className="text-gray-600" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Our patient-centered approach ensures that you're an active participant in your 
                care, with access to the information, support, and resources you need to make 
                informed decisions about your health.
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
                alt="Doctor consulting with patient"
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
          </div>

          {/* Core Principles */}
          <div className="mb-20">
            <h2 className="text-center mb-12" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Core Principles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  image: "https://images.unsplash.com/photo-1764885449364-b1a758f03063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYXNzaW9uJTIwaGVhbHRoY2FyZSUyMGNhcmV8ZW58MXx8fHwxNzY2MTQyMTc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  title: "Compassionate Care",
                  description: "We treat every patient with empathy, respect, and dignity, ensuring you feel heard and valued."
                },
                {
                  image: "https://images.unsplash.com/photo-1758574437870-f83c160efd82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzY2MDg0NTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  title: "Collaborative Partnership",
                  description: "Your care team works together with you and your family to develop personalized treatment plans."
                },
                {
                  image: "https://images.unsplash.com/photo-1695720247432-8b353fba8c7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbGl6ZWQlMjBoZWFsdGhjYXJlfGVufDF8fHx8MTc2NjE0MjE3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  title: "Personalized Treatment",
                  description: "Every patient is unique, and we tailor our approach to meet your individual health goals and preferences."
                }
              ].map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden group rounded-2xl"
                >
                  <div className="relative h-full">
                    <div className="relative h-64 overflow-hidden rounded-t-2xl">
                      <ImageWithFallback
                        src={principle.image}
                        alt={principle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="bg-white p-8 rounded-b-2xl border-2 border-gray-200 border-t-0">
                      <h3 className="mb-4" style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                        {principle.title}
                      </h3>
                      <p className="text-gray-600" style={{ fontSize: '14px', lineHeight: '1.7' }}>
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* What This Means for You */}
          <div className="bg-gray-50 p-12">
            <h2 className="mb-8" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              What This Means for You
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Access to a dedicated care team that knows you and your health history",
                "Clear communication about your condition and treatment options",
                "Involvement in every decision about your care",
                "Coordinated care across all your healthcare providers",
                "Support services to address your physical and emotional needs",
                "Convenient access to your medical records and test results"
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-white p-4 rounded-lg"
                >
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                  <p className="text-gray-700" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}