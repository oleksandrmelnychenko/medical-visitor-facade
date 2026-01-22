"use client";

import { motion } from "motion/react";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import { cn } from "@/lib/utils";

export default function LocationsPage() {
  const t = useTranslations('locations');

  const locations = [
    {
      name: t('facilities.mainCampus.name'),
      address: "123 Medical Plaza, Downtown",
      city: "New York, NY 10001",
      phone: "(555) 123-4567",
      hours: t('facilities.mainCampus.hours'),
      services: [t('services.emergencyCare'), t('services.cardiology'), t('services.oncology'), t('services.surgery')]
    },
    {
      name: t('facilities.northCenter.name'),
      address: "456 Health Avenue",
      city: "Brooklyn, NY 11201",
      phone: "(555) 234-5678",
      hours: t('facilities.northCenter.hours'),
      services: [t('services.primaryCare'), t('services.pediatrics'), t('services.orthopedics'), t('services.imaging')]
    },
    {
      name: t('facilities.eastClinic.name'),
      address: "789 Wellness Boulevard",
      city: "Queens, NY 11354",
      phone: "(555) 345-6789",
      hours: t('facilities.eastClinic.hours'),
      services: [t('services.familyMedicine'), t('services.preventiveCare'), t('services.labServices')]
    }
  ];

  return (
    <div className={pageStyles.page}>
      <section className={cn(sectionStyles.section, pageStyles.heroSection)}>
        <div className={sectionStyles.container}>
          <SectionHeader
            title={t('title')}
            subtitle={t('subtitle')}
            variant="page"
            titleAs="h1"
          />
        </div>
      </section>

      <section className={cn(sectionStyles.section, pageStyles.sectionMuted)}>
        <div className={sectionStyles.container}>
          <div className={pageStyles.mapCard}>
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

      <section className={sectionStyles.section}>
        <div className={sectionStyles.container}>
          <div className={pageStyles.stackMd}>
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cn(pageStyles.card, pageStyles.cardHover)}
              >
                <div className={pageStyles.locationGrid}>
                  <div
                    className={pageStyles.locationImage}
                    style={{ backgroundColor: '#e2e8f0', minHeight: '200px' }}
                  />
                  <div className={pageStyles.locationBody}>
                    <h3 className={pageStyles.sectionTitleSm}>{location.name}</h3>

                    <div className={pageStyles.stackMd}>
                      <div className={pageStyles.metaRow}>
                        <MapPin className={cn(pageStyles.iconMd, pageStyles.iconAccent)} />
                        <div>
                          <p className={pageStyles.textBody}>{location.address}</p>
                          <p className={pageStyles.textSmall}>{location.city}</p>
                        </div>
                      </div>

                      <div className={pageStyles.metaRow}>
                        <Phone className={cn(pageStyles.iconMd, pageStyles.iconAccent)} />
                        <p className={pageStyles.textBody}>{location.phone}</p>
                      </div>

                      <div className={pageStyles.metaRow}>
                        <Clock className={cn(pageStyles.iconMd, pageStyles.iconAccent)} />
                        <p className={pageStyles.textBody}>{location.hours}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className={pageStyles.textStrong}>
                        {t('availableServices')}:
                      </h4>
                      <div className={pageStyles.buttonRow}>
                        {location.services.map((service, idx) => (
                          <span key={idx} className={pageStyles.tag}>
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={pageStyles.buttonRow}>
                      <button className={pageStyles.buttonOutline}>
                        <Navigation className={pageStyles.iconSm} />
                        {t('getDirections')}
                      </button>
                      <button className={pageStyles.buttonOutline}>
                        {t('contactLocation')}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={cn(sectionStyles.section, pageStyles.sectionMuted)}>
        <div className={sectionStyles.container}>
          <div className={pageStyles.textCenter}>
            <h2 className={pageStyles.sectionTitle}>{t('cantFind.title')}</h2>
            <p className={pageStyles.textBody}>{t('cantFind.description')}</p>
            <button className={pageStyles.buttonOutline}>{t('contactUs')}</button>
          </div>
        </div>
      </section>
    </div>
  );
}
