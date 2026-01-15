import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function CTAVariation5() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="rounded-3xl overflow-hidden bg-white">
          {/* Centered Content */}
          <motion.div
            className="px-8 py-16 flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-gray-500 uppercase tracking-wider mb-4"
              style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em' }}
            >
              Ready to Begin?
            </p>
            
            <h2 
              className="text-gray-900 mb-6 max-w-2xl"
              style={{ fontSize: '48px', lineHeight: '1.2', fontWeight: 600, letterSpacing: '-0.02em' }}
            >
              Start Your Journey to Better Health
            </h2>
            
            <p 
              className="text-gray-600 mb-10 max-w-2xl"
              style={{ fontSize: '18px', lineHeight: '1.7' }}
            >
              Our team of specialists is ready to provide you with world-class care and support.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-12 mb-10">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-gray-900 mb-1" style={{ fontSize: '42px', fontWeight: 600 }}>
                  1000+
                </div>
                <div className="text-gray-700" style={{ fontSize: '14px' }}>Patients Served</div>
              </motion.div>
              
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="text-gray-900 mb-1" style={{ fontSize: '42px', fontWeight: 600 }}>
                  50+
                </div>
                <div className="text-gray-700" style={{ fontSize: '14px' }}>Specialists</div>
              </motion.div>
              
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-gray-900 mb-1" style={{ fontSize: '42px', fontWeight: 600 }}>
                  24/7
                </div>
                <div className="text-gray-700" style={{ fontSize: '14px' }}>Support</div>
              </motion.div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <motion.button 
                className="bg-black text-white px-10 py-4 hover:bg-gray-800 transition-colors flex items-center justify-center gap-3"
                style={{ fontSize: '15px', fontWeight: 600 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <button 
                className="border-2 border-gray-200 text-gray-900 px-10 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                style={{ fontSize: '15px', fontWeight: 500 }}
              >
                GET STARTED
              </button>
            </div>

            {/* Office Hours */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-gray-500" style={{ fontSize: '13px' }}>
                Available Monday - Friday • 8:00 AM - 6:00 PM CET
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}