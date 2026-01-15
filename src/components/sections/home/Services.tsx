"use client";

import { useState, useRef } from "react";
import Slider from "react-slick";
import { useTranslations } from "next-intl";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import sectionStyles from "@/components/sections/shared/section.module.scss";
import styles from "./services.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function Services() {
  const t = useTranslations('home.services');
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const services = [
    {
      title: t('items.cardiology.title'),
      subtitle: t('items.cardiology.subtitle'),
      description: t('items.cardiology.description'),
      image:
        "https://images.unsplash.com/photo-1690306816872-91063f6de36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkaW9sb2d5JTIwbWVkaWNhbCUyMGhlYXJ0fGVufDF8fHx8MTc2NTc4ODY4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: t('items.oncology.title'),
      subtitle: t('items.oncology.subtitle'),
      description: t('items.oncology.description'),
      image:
        "https://images.unsplash.com/photo-1763310225108-9e16920156f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmNvbG9neSUyMGNhbmNlciUyMHRyZWF0bWVudCUyMG1lZGljYWx8ZW58MXx8fHwxNzY1NzkwMDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: t('items.surgery.title'),
      subtitle: t('items.surgery.subtitle'),
      description: t('items.surgery.description'),
      image:
        "https://images.unsplash.com/photo-1757152962882-6bf8495b324d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJnZXJ5JTIwbWVkaWNhbCUyMG9wZXJhdGluZyUyMHJvb218ZW58MXx8fHwxNzY1NzkwNjg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const goToPrevSlide = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNextSlide = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <section className={sectionStyles.section}>
      <div className={sectionStyles.container}>
        <SectionHeader
          overline={t('overline')}
          title={t('title')}
          subtitle={t('subtitle')}
        />
      </div>

      {/* Services Slider */}
      <div className={styles.sliderContainer}>
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
              breakpoint: 1024,
              settings: {
                centerPadding: "12%",
              },
            },
            {
              breakpoint: 768,
              settings: {
                centerPadding: "8%",
              },
            },
            {
              breakpoint: 640,
              settings: {
                centerPadding: "0px",
              },
            },
          ]}
          beforeChange={(_, next) => setCurrentSlide(next)}
        >
          {services.map((service, index) => (
            <div key={index} className={styles.slideWrapper}>
              <div className={styles.serviceSlide}>
                <ImageWithFallback src={service.image} alt={service.title} />
                <div className={styles.slideOverlay}>
                  <h3 className={styles.slideTitle}>{service.title}</h3>
                  <h4 className={styles.slideSubtitle}>{service.subtitle}</h4>
                  <p className={styles.slideDescription}>{service.description}</p>
                  <button className={styles.slideButton}>{t('learnMore')}</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Slide Counter */}
      <div className={styles.slideCounter}>
        <div className={styles.slideNavigation}>
          <button onClick={goToPrevSlide} className={styles.navButton} aria-label="Previous slide">
            &larr;
          </button>
          <span className={styles.slideNumber}>
            {currentSlide + 1} / {services.length}
          </span>
          <button onClick={goToNextSlide} className={styles.navButton} aria-label="Next slide">
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
