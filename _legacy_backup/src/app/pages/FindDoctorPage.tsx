import { motion } from "motion/react";
import { Search, MapPin, Award, Calendar, Users, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useState } from "react";

export function FindDoctorPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const specialties = [
    "All Specialties",
    "Cardiology",
    "Oncology",
    "Orthopedics",
    "Neurology",
    "Pediatrics",
    "Internal Medicine"
  ];

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      location: "Main Campus",
      experience: "15+ years"
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Oncology",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      location: "Cancer Center",
      experience: "20+ years"
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      location: "Children's Hospital",
      experience: "12+ years"
    },
    {
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      location: "Orthopedic Center",
      experience: "18+ years"
    }
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "find a doctor" }]} />

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
              Find a Doctor
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto mb-12" style={{ fontSize: '20px', lineHeight: '1.6' }}>
              Connect with our experienced medical professionals who are dedicated to your health
            </p>

            {/* Search Section */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name or condition..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
              <button className="w-full border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors cursor-pointer" style={{ fontSize: '16px', fontWeight: 500 }}>
                Search Doctors
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <h2 className="mb-12" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
            Our Medical Professionals
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <ImageWithFallback
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="mb-2" style={{ fontSize: '20px', fontWeight: 500 }}>
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 mb-4" style={{ fontSize: '14px', fontWeight: 500 }}>
                    {doctor.specialty}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600" style={{ fontSize: '13px' }}>
                      <MapPin className="w-4 h-4" />
                      {doctor.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600" style={{ fontSize: '13px' }}>
                      <Award className="w-4 h-4" />
                      {doctor.experience}
                    </div>
                  </div>
                  <button className="w-full border border-black px-8 py-2 hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    <Calendar className="w-4 h-4" />
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>Book Appointment</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Doctors */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <h2 className="text-center mb-12" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
            Why Choose Our Doctors
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Board Certified",
                description: "All our physicians are board-certified in their specialties with ongoing education."
              },
              {
                title: "Patient-Focused",
                description: "Our doctors prioritize patient care, taking time to listen and address concerns."
              },
              {
                title: "Advanced Training",
                description: "Continuous professional development ensures our doctors stay at the forefront of medicine."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-2xl p-10 border-2 border-gray-200 text-center h-full flex flex-col">
                  <h3 className="mb-4" style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 flex-1" style={{ fontSize: '14px', lineHeight: '1.7' }}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}