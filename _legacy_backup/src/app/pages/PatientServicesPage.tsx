import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function PatientServicesPage() {
  const services = [
    {
      number: "01",
      image: "https://images.unsplash.com/photo-1758556549027-879615701c61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBvaW50bWVudCUyMHNjaGVkdWxpbmclMjBjYWxlbmRhcnxlbnwxfHx8fDE3NjYxNDk4NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Appointment Scheduling",
      description: "Easy online scheduling for consultations, follow-ups, and specialist visits."
    },
    {
      number: "02",
      image: "https://images.unsplash.com/photo-1758691462321-9b6c98c40f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3VwcG9ydCUyMGhlbHB8ZW58MXx8fHwxNzY2MTQ5ODc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "24/7 Patient Support",
      description: "Round-the-clock assistance for urgent questions and medical guidance."
    },
    {
      number: "03",
      image: "https://images.unsplash.com/photo-1758691462814-485c3672e447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVjb3JkcyUyMGRvY3VtZW50c3xlbnwxfHx8fDE3NjYxNDk4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Medical Records Access",
      description: "Secure online access to your complete medical history and test results."
    },
    {
      number: "04",
      image: "https://images.unsplash.com/photo-1635367216109-aa3353c0c22e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMGhlYWx0aCUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NjYxMzA3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Wellness Programs",
      description: "Preventive care programs designed to keep you healthy and informed."
    },
    {
      number: "05",
      image: "https://images.unsplash.com/photo-1758691462285-9e2db8b8dc44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRpZW50JTIwZWR1Y2F0aW9uJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzY2MTQ5ODc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Patient Education",
      description: "Comprehensive resources to help you understand and manage your health."
    },
    {
      number: "06",
      image: "https://images.unsplash.com/photo-1722235623488-ae7639a2ffd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2FyZSUyMGNvb3JkaW5hdGlvbnxlbnwxfHx8fDE3NjYxNDk4NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Care Coordination",
      description: "Seamless coordination between specialists, primary care, and support services."
    }
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "patient services" }]} />

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
              Patient Services
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: '20px', lineHeight: '1.6' }}>
              Comprehensive support services designed to make your healthcare experience seamless
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <div className="bg-white p-6 border border-gray-200 border-t-0 rounded-b-2xl">
                  <h3 className="mb-2" style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600" style={{ fontSize: '14px', lineHeight: '1.7' }}>
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Featured Service */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                Personalized Care Plans
              </h2>
              <p className="text-gray-600 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Every patient is unique, which is why we develop customized care plans tailored to 
                your specific health needs, lifestyle, and goals. Our multidisciplinary team works 
                together to ensure you receive coordinated, comprehensive care.
              </p>
              <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer">
                <span style={{ fontSize: '16px', fontWeight: 500 }}>Learn More</span>
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Healthcare professional with patient"
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="text-center">
            <h2 className="mb-4" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Need Help with Our Services?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto" style={{ fontSize: '16px', lineHeight: '1.6' }}>
              Our patient services team is here to assist you with any questions or concerns.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer">
                <span style={{ fontSize: '16px', fontWeight: 500 }}>Contact Support</span>
              </button>
              <button className="px-8 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                <span style={{ fontSize: '16px', fontWeight: 500 }}>Call (555) 123-4567</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}