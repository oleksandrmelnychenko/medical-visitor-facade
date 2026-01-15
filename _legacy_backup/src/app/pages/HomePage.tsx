import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/slider-custom.css";
import { useState, useRef } from "react";
import { MapPin, Phone, Mail, Clock as ClockIcon } from "lucide-react";
import { CTAVariation5 } from "../components/CTAVariation5";

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // Cardiology, Oncology, and Surgery
  const sliderRef = useRef<Slider>(null);

  const goToPrevSlide = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNextSlide = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZSUyMGRvY3RvciUyMHBhdGllbnR8ZW58MXx8fHwxNzY1OTg1MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Medical healthcare professionals"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 px-4 py-16">
              <div className="text-center">
                <motion.p
                  className="text-white/80 uppercase tracking-wider mb-6"
                  style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  Where Compassion Meets Excellence
                </motion.p>
                
                <motion.h1 
                  className="text-white uppercase mb-8" 
                  style={{ fontSize: '48px', lineHeight: '48px', fontWeight: 300 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                >
                  Agency for Patient Care
                </motion.h1>
                
                <motion.p 
                  className="text-white/90 max-w-3xl mx-auto mb-10"
                  style={{ fontSize: '20px', lineHeight: '1.6', fontWeight: 400 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                  Your personal assistant 24/7 — We value your time, provide unlimited support, and find the best solutions for your healthcare needs
                </motion.p>
                
                <motion.button 
                  className="border-2 border-white text-white px-10 py-4 hover:bg-white hover:text-black transition-colors"
                  style={{ fontSize: '16px', fontWeight: 500 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="text-white/60" style={{ fontSize: '14px', letterSpacing: '0.1em' }}>SCROLL</div>
                  <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-white/40 rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Care That Moves You Forward Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-[1200px]">
          {/* Overline */}
          <motion.p
            className="text-center text-gray-500 uppercase tracking-wider mb-2"
            style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Our Approach
          </motion.p>
          
          <motion.h2 
            className="text-center text-gray-900 mb-4"
            style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Care that moves you forward
          </motion.h2>
          
          <motion.p
            className="text-center text-gray-600 max-w-3xl mx-auto mb-10"
            style={{ fontSize: '18px', lineHeight: '1.7' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Dedicated support and expert coordination for every step of your healthcare journey
          </motion.p>
          
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Row 1, Column 1 - Text Content */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <h3 
                className="text-gray-900 mb-3"
                style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '-0.01em' }}
              >
                Trust starts here
              </h3>
              <p 
                className="text-gray-600 mb-8 max-w-xl"
                style={{ fontSize: '17px', lineHeight: '1.7' }}
              >
                Quality care depends on understanding each patient's unique needs. Our dedicated team provides compassionate support and seamless coordination throughout your healthcare journey.
              </p>
              <motion.button 
                className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors w-fit"
                style={{ fontSize: '16px', fontWeight: 500 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Row 1, Column 2 - Doctor Patient Image */}
            <motion.div
              className="relative overflow-hidden rounded-3xl h-96 shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc2NTc4NTQ3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Doctor patient consultation"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Row 2, Column 1 - Hospital Image */}
            <motion.div
              className="relative overflow-hidden rounded-3xl h-96 shadow-2xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1662414185445-b9a05e26dba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2NTc1ODczOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern hospital building"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Row 2, Column 2 - Text Content */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <h3 
                className="text-gray-900 mb-6"
                style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '-0.01em' }}
              >
                World-class German healthcare, personally delivered
              </h3>
              <p 
                className="text-gray-600 mb-8 max-w-xl"
                style={{ fontSize: '17px', lineHeight: '1.7' }}
              >
                We simplify access to Germany's leading medical institutions for patients everywhere.
              </p>
              <motion.button 
                className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors w-fit"
                style={{ fontSize: '16px', fontWeight: 500 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-[1200px]">
          {/* Overline */}
          <motion.p
            className="text-center text-gray-500 uppercase tracking-wider mb-2"
            style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Comprehensive Care
          </motion.p>
          
          <motion.h2 
            className="text-center text-gray-900 mb-4"
            style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our Services
          </motion.h2>
          <motion.p
            className="text-center text-gray-600 max-w-3xl mx-auto mb-0"
            style={{ fontSize: '18px', lineHeight: '1.7' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Comprehensive patient support for complex medical needs — compassionate guidance at every step.
          </motion.p>
          
          {/* Services Slider */}
          <div className="services-slider-container">
            <Slider
              ref={sliderRef}
              centerMode={true}
              centerPadding="20%"
              slidesToShow={1}
              infinite={true}
              arrows={false}
              dots={false}
              autoplay={true}
              autoplaySpeed={5000}
              speed={500}
              responsive={[
                {
                  breakpoint: 768,
                  settings: {
                    centerPadding: "10%",
                  }
                }
              ]}
              beforeChange={(current, next) => setCurrentSlide(next)}
            >
              {/* Cardiology Slide */}
              <div className="px-4">
                <div
                  className="rounded-3xl relative overflow-hidden"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1690306816872-91063f6de36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkaW9sb2d5JTIwbWVkaWNhbCUyMGhlYXJ0fGVufDF8fHx8MTc2NTc4ODY4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Cardiology medical services"
                    className="w-full h-auto object-cover rounded-3xl"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40 rounded-3xl flex flex-col justify-end px-8 md:px-12 pb-8 text-white">
                    <h3 
                      className="text-white mb-2"
                      style={{ fontSize: '32px', lineHeight: '38px', fontWeight: 600 }}
                    >
                      Cardiology
                    </h3>
                    <h4 
                      className="text-white mb-4"
                      style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 500 }}
                    >
                      Expert Heart Care, Every Beat Matters
                    </h4>
                    <p 
                      className="text-white/90 max-w-3xl mb-6"
                      style={{ fontSize: '16px', lineHeight: '24px' }}
                    >
                      Trust your heart to the best. We coordinate your care with top cardiologists in Munich, ensuring access to comprehensive diagnostics, personalized treatment plans, and world-class cardiac interventions — all with seamless support along the way.
                    </p>
                    <button 
                      className="border border-white px-8 py-3 hover:bg-white hover:text-black transition-colors w-fit cursor-pointer"
                      style={{ fontSize: '16px', fontWeight: 500 }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>

              {/* Oncology Slide */}
              <div className="px-4">
                <div
                  className="rounded-3xl relative overflow-hidden"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1763310225108-9e16920156f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmNvbG9neSUyMGNhbmNlciUyMHRyZWF0bWVudCUyMG1lZGljYWx8ZW58MXx8fHwxNzY1NzkwMDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Oncology cancer treatment services"
                    className="w-full h-auto object-cover rounded-3xl"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40 rounded-3xl flex flex-col justify-end px-8 md:px-12 pb-8 text-white">
                    <h3 
                      className="text-white mb-2"
                      style={{ fontSize: '32px', lineHeight: '38px', fontWeight: 600 }}
                    >
                      Oncology
                    </h3>
                    <h4 
                      className="text-white mb-4"
                      style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 500 }}
                    >
                      Fighting Cancer
                    </h4>
                    <p 
                      className="text-white/90 max-w-3xl mb-6"
                      style={{ fontSize: '16px', lineHeight: '24px' }}
                    >
                      We stand by your side in cancer treatment. Our team of oncology specialists in Munich offers state-of-the-art diagnostics, personalized therapies, and comprehensive care on your path to recovery.
                    </p>
                    <button 
                      className="border border-white px-8 py-3 hover:bg-white hover:text-black transition-colors w-fit cursor-pointer"
                      style={{ fontSize: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>

              {/* Surgery Slide */}
              <div className="px-4">
                <div
                  className="rounded-3xl relative overflow-hidden"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1757152962882-6bf8495b324d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJnZXJ5JTIwbWVkaWNhbCUyMG9wZXJhdGluZyUyMHJvb218ZW58MXx8fHwxNzY1NzkwNjg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Surgery operating room services"
                    className="w-full h-auto object-cover rounded-3xl"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40 rounded-3xl flex flex-col justify-end px-8 md:px-12 pb-8 text-white">
                    <h3 
                      className="text-white mb-2"
                      style={{ fontSize: '32px', lineHeight: '38px', fontWeight: 600 }}
                    >
                      Surgery
                    </h3>
                    <h4 
                      className="text-white mb-4"
                      style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 500 }}
                    >
                      Surgical Excellence, Personalized Care
                    </h4>
                    <p 
                      className="text-white/90 max-w-3xl mb-6"
                      style={{ fontSize: '16px', lineHeight: '24px' }}
                    >
                      World-class surgeons. Advanced techniques. Seamless coordination. We guide you to the right specialist for your procedure — and support you until full recovery.
                    </p>
                    <button 
                      className="border border-white px-8 py-3 hover:bg-white hover:text-black transition-colors w-fit cursor-pointer"
                      style={{ fontSize: '16px', fontWeight: 500, whiteSpace: 'nowrap' }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
          
          {/* Slide Counter */}
          <div className="slide-counter">
            <div className="slide-navigation">
              <button 
                onClick={goToPrevSlide}
                className="nav-button prev cursor-pointer"
                aria-label="Previous slide"
              >
                ←
              </button>
              <span className="slide-number">
                {currentSlide + 1} / {totalSlides}
              </span>
              <button 
                onClick={goToNextSlide}
                className="nav-button next cursor-pointer"
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Confidentiality Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-[1200px]">
          {/* Overline */}
          <motion.p
            className="text-center text-gray-500 uppercase tracking-wider mb-2"
            style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Your Privacy Matters
          </motion.p>
          
          <motion.h2 
            className="text-center text-gray-900 mb-4"
            style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Trust & Confidentiality
          </motion.h2>

          <motion.p 
            className="text-center text-gray-600 max-w-3xl mx-auto mb-10"
            style={{ fontSize: '18px', lineHeight: '1.7' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your privacy is non-negotiable. Complete confidentiality guaranteed.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Text Content */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <p 
                className="text-gray-600 mb-6 max-w-xl"
                style={{ fontSize: '17px', lineHeight: '1.7' }}
              >
                We ensure complete confidentiality of all patient names, medical records, and personal data. Every interaction is protected by strict European data protection laws.
              </p>
              <p 
                className="text-gray-700 max-w-xl"
                style={{ fontSize: '17px', lineHeight: '1.7', fontWeight: 600 }}
              >
                Your identity stays private. Your data stays secure. Private dialogue, guaranteed.
              </p>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              className="relative overflow-hidden rounded-3xl h-96 shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YWN5JTIwc2VjdXJpdHklMjBtZWRpY2FsfGVufDF8fHx8MTc2NTc5MTU0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Privacy and security in healthcare"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visit Our Office Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-[1200px]">
          {/* Overline */}
          <motion.p
            className="text-center text-gray-500 uppercase tracking-wider mb-3"
            style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Get in Touch
          </motion.p>
          
          <motion.h2 
            className="text-center text-gray-900 mb-6"
            style={{ fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Visit Our Office in Munich
          </motion.h2>
          <motion.p 
            className="text-center text-gray-600 max-w-3xl mx-auto mb-16"
            style={{ fontSize: '18px', lineHeight: '1.7' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Located in the heart of Munich, we're here to serve you with comprehensive medical consulting services.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Information */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <h3 
                className="text-gray-900 mb-2"
                style={{ fontSize: '28px', fontWeight: 600 }}
              >
                Our Location
              </h3>
              <p 
                className="text-gray-600 mb-8"
                style={{ fontSize: '18px', fontWeight: 400 }}
              >
                Munich, Germany
              </p>
              
              <div className="mb-6">
                <h4 
                  className="text-gray-900 mb-2"
                  style={{ fontSize: '18px', fontWeight: 600 }}
                >
                  Address
                </h4>
                <p 
                  className="text-gray-600"
                  style={{ fontSize: '16px', lineHeight: '1.6' }}
                >
                  Albert-Schweitzer-Straße 56<br />
                  81735 München, Germany
                </p>
              </div>

              <div className="mb-6">
                <h4 
                  className="text-gray-900 mb-2"
                  style={{ fontSize: '18px', fontWeight: 600 }}
                >
                  Phone
                </h4>
                <p 
                  className="text-gray-600"
                  style={{ fontSize: '16px', lineHeight: '1.6' }}
                >
                  +49 (89) 123-4567
                </p>
              </div>

              <div className="mb-6">
                <h4 
                  className="text-gray-900 mb-2"
                  style={{ fontSize: '18px', fontWeight: 600 }}
                >
                  Email
                </h4>
                <p 
                  className="text-gray-600"
                  style={{ fontSize: '16px', lineHeight: '1.6' }}
                >
                  contact@gmed-health.com
                </p>
              </div>

              <div>
                <h4 
                  className="text-gray-900 mb-2"
                  style={{ fontSize: '18px', fontWeight: 600 }}
                >
                  Office Hours
                </h4>
                <p 
                  className="text-gray-600"
                  style={{ fontSize: '16px', lineHeight: '1.6' }}
                >
                  Monday - Friday: 8:00 AM - 6:00 PM<br />
                  Saturday: 9:00 AM - 2:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </motion.div>

            {/* Right Column - Google Map */}
            <motion.div
              className="relative overflow-hidden rounded-3xl h-[500px] shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              {/* Google Map Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2664.8267263424843!2d11.644499776739594!3d48.09850857122658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e75f9a38c5fd9%3A0x10e84c5c6c5c5c5c!2sAlbert-Schweitzer-Stra%C3%9Fe%2056%2C%2081735%20M%C3%BCnchen%2C%20Germany!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-3xl"
                title="Office Location Map"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION - Variation 5 */}
      <CTAVariation5 />
    </>
  );
}