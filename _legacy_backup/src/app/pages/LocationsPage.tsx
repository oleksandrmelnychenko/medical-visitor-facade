import { motion } from "motion/react";
import { MapPin, Phone, Clock, Mail, Navigation } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function LocationsPage() {
  const locations = [
    {
      name: "Main Campus",
      address: "123 Medical Plaza, Downtown",
      city: "New York, NY 10001",
      phone: "(555) 123-4567",
      hours: "24/7 Emergency Services",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      services: ["Emergency Care", "Cardiology", "Oncology", "Surgery"]
    },
    {
      name: "North Medical Center",
      address: "456 Health Avenue",
      city: "Brooklyn, NY 11201",
      phone: "(555) 234-5678",
      hours: "Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      services: ["Primary Care", "Pediatrics", "Orthopedics", "Imaging"]
    },
    {
      name: "East Wellness Clinic",
      address: "789 Wellness Boulevard",
      city: "Queens, NY 11354",
      phone: "(555) 345-6789",
      hours: "Mon-Sat: 9AM-6PM",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      services: ["Family Medicine", "Preventive Care", "Lab Services"]
    }
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "locations" }]} />

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
              Our Locations
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: '20px', lineHeight: '1.6' }}>
              Find a Gmed location near you with convenient access to quality healthcare
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="space-y-8">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="md:col-span-1">
                    <ImageWithFallback
                      src={location.image}
                      alt={location.name}
                      className="w-full h-full object-cover min-h-[300px]"
                    />
                  </div>
                  <div className="md:col-span-2 p-8">
                    <h3 className="mb-4" style={{ fontSize: '28px', fontWeight: 500 }}>
                      {location.name}
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-gray-700" style={{ fontSize: '16px' }}>
                            {location.address}
                          </p>
                          <p className="text-gray-600" style={{ fontSize: '14px' }}>
                            {location.city}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <p className="text-gray-700" style={{ fontSize: '16px' }}>
                          {location.phone}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <p className="text-gray-700" style={{ fontSize: '16px' }}>
                          {location.hours}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="mb-3" style={{ fontSize: '16px', fontWeight: 500 }}>
                        Available Services:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {location.services.map((service, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
                            style={{ fontSize: '13px' }}
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button className="px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors flex items-center gap-2 cursor-pointer">
                        <Navigation className="w-4 h-4" />
                        <span style={{ fontSize: '14px', fontWeight: 500 }}>Get Directions</span>
                      </button>
                      <button className="px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer">
                        <span style={{ fontSize: '14px', fontWeight: 500 }}>Contact Location</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="text-center">
            <h2 className="mb-4" style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Can't Find a Location Near You?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto" style={{ fontSize: '16px', lineHeight: '1.6' }}>
              We're continually expanding our services. Contact us to learn about upcoming locations 
              or to discuss telehealth options.
            </p>
            <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer">
              <span style={{ fontSize: '16px', fontWeight: 500 }}>Contact Us</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}