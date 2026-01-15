import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function AboutGmedPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "about gmed" }]} />

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
              About Gmed
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: '20px', lineHeight: '1.6' }}>
              A legacy of excellence in healthcare spanning decades of innovation and patient care
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
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
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Modern hospital facility"
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
                Our Mission
              </h2>
              <p className="text-gray-600 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Gmed is committed to inspiring hope and contributing to health and well-being by 
                providing the best care to every patient through integrated clinical practice, 
                education, and research.
              </p>
              <p className="text-gray-600" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                We strive to deliver unparalleled expertise and compassion to all who seek healing, 
                making a positive impact on the lives we touch through our dedication to excellence.
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {[
              { number: "50+", label: "Years of Excellence" },
              { number: "500K+", label: "Patients Served" },
              { number: "200+", label: "Medical Specialists" },
              { number: "15", label: "Specialty Centers" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-blue-600 mb-2" style={{ fontSize: '48px', fontWeight: 300 }}>
                  {stat.number}
                </div>
                <div className="text-gray-600" style={{ fontSize: '14px', letterSpacing: '0.05em' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-center mb-12" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  image: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGNlbGxlbmNlJTIwbWVkaWNhbCUyMGFjaGlldmVtZW50fGVufDF8fHx8MTc2NjE1MDIyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  title: "Excellence",
                  description: "We pursue the highest standards in everything we do, constantly innovating to improve patient outcomes."
                },
                {
                  image: "https://images.unsplash.com/photo-1685657814797-83706c4e5279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNwZWN0JTIwaGVhbHRoY2FyZSUyMGRpZ25pdHl8ZW58MXx8fHwxNzY2MTUwMjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  title: "Respect",
                  description: "We honor the dignity of every individual, treating patients, families, and colleagues with compassion."
                },
                {
                  image: "https://images.unsplash.com/photo-1640030104754-0a33c686c533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlZ3JpdHklMjB0cnVzdCUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzY2MTUwMjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  title: "Integrity",
                  description: "We uphold the highest ethical standards, earning trust through transparency and accountability."
                },
                {
                  image: "https://images.unsplash.com/photo-1706777280252-5de52771cf13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwbWVkaWNhbCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY2MTUwMjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  title: "Innovation",
                  description: "We embrace new ideas and technologies that advance medical science and improve patient care."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group overflow-hidden rounded-2xl"
                >
                  <div className="relative h-80">
                    <ImageWithFallback
                      src={value.image}
                      alt={value.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="mb-3 text-white" style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                        {value.title}
                      </h3>
                      <p className="text-white/90" style={{ fontSize: '14px', lineHeight: '1.7' }}>
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="bg-gray-50 pt-16 pb-16">
        <div className="text-center">
          <h2 className="mb-4" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
            Our History
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.8' }}>
            Founded over half a century ago, Gmed has grown from a small community hospital to 
            a world-renowned medical center. Our journey has been marked by groundbreaking 
            research, innovative treatments, and an unwavering commitment to patient care.
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.8' }}>
            Today, we continue to build on this legacy, combining cutting-edge technology with 
            the compassionate, personalized care that has always been our hallmark.
          </p>
        </div>
      </section>
    </div>
  );
}