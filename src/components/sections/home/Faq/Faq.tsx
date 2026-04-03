"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import styles from "./Faq.module.scss";

const FAQ_ITEMS = [
  "services",
  "clinicSelection",
  "travel",
  "documents",
  "onSite",
  "start",
] as const;

const FAQ_FALLBACKS = {
  ru: {
    eyebrow: "FAQs",
    title: "Частые вопросы.",
    subtitle: "Самое важное о медицинском сопровождении, организации поездки и начале работы с нами.",
    items: {
      services: {
        question: "Что именно делает Medical Concierge Agency?",
        answer: "Мы сопровождаем международных пациентов на всех этапах: от подбора клиники и специалиста до координации лечения, перевода документов, коммуникации и организации поездки.",
      },
      clinicSelection: {
        question: "Помогаете ли вы выбрать клинику или врача в Германии?",
        answer: "Да. Мы ориентируемся на ваш запрос, медицинскую ситуацию и организационные обстоятельства, чтобы предложить релевантные варианты клиник и профильных специалистов.",
      },
      travel: {
        question: "Нужно ли уже находиться в Германии, чтобы обратиться к вам?",
        answer: "Нет. Многие пациенты начинают процесс дистанционно. Мы помогаем подготовиться заранее и выстроить маршрут лечения до приезда в Германию.",
      },
      documents: {
        question: "Вы помогаете с документами, переводом и коммуникацией с клиниками?",
        answer: "Да. Мы помогаем структурировать медицинскую документацию, переводить материалы и выстраивать понятную коммуникацию со всеми участниками процесса.",
      },
      onSite: {
        question: "Есть ли сопровождение на месте и помощь с поездкой?",
        answer: "Да. При необходимости мы подключаем поддержку по трансферу, логистике, пребыванию и координации очных этапов, чтобы пациенту и семье было спокойнее.",
      },
      start: {
        question: "Как начать работу с вами?",
        answer: "Достаточно оставить заявку через сайт. После этого мы свяжемся с вами, уточним ситуацию и подскажем следующий шаг в зависимости от вашего запроса.",
      },
    },
  },
  en: {
    eyebrow: "FAQs",
    title: "Common questions.",
    subtitle: "The essentials about medical coordination, travel planning, and how to start working with us.",
    items: {
      services: {
        question: "What does the Medical Concierge Agency actually do?",
        answer: "We support international patients through the full journey: clinic and specialist selection, treatment coordination, document handling, communication, and travel organization.",
      },
      clinicSelection: {
        question: "Can you help us choose the right clinic or specialist in Germany?",
        answer: "Yes. We look at your request, medical context, and practical circumstances to suggest relevant clinics and suitable specialists.",
      },
      travel: {
        question: "Do I need to already be in Germany to contact you?",
        answer: "No. Many patients begin remotely. We help prepare the process in advance and structure the medical journey before arrival in Germany.",
      },
      documents: {
        question: "Do you help with records, translation, and communication with clinics?",
        answer: "Yes. We help organize medical documents, translate materials, and create clear communication between everyone involved in the process.",
      },
      onSite: {
        question: "Do you also support travel and on-site coordination?",
        answer: "Yes. When needed, we can support transfers, logistics, local coordination, and in-person stages so the patient and family feel more at ease.",
      },
      start: {
        question: "How do we get started?",
        answer: "You can begin by submitting a request through the website. We then get in touch, understand your situation, and outline the most relevant next step.",
      },
    },
  },
  de: {
    eyebrow: "FAQs",
    title: "Häufige Fragen.",
    subtitle: "Das Wichtigste zu medizinischer Koordination, Reiseplanung und dem Einstieg in die Zusammenarbeit mit uns.",
    items: {
      services: {
        question: "Was genau macht die Medical Concierge Agency?",
        answer: "Wir begleiten internationale Patientinnen und Patienten durch den gesamten Prozess: von der Auswahl von Klinik und Facharzt bis zur Koordination der Behandlung, Dokumente, Kommunikation und Reiseorganisation.",
      },
      clinicSelection: {
        question: "Helfen Sie bei der Auswahl der passenden Klinik oder Fachärztin in Deutschland?",
        answer: "Ja. Wir berücksichtigen Ihr Anliegen, die medizinische Situation und die organisatorischen Rahmenbedingungen, um passende Kliniken und relevante Spezialisten vorzuschlagen.",
      },
      travel: {
        question: "Muss ich bereits in Deutschland sein, um Sie zu kontaktieren?",
        answer: "Nein. Viele Patientinnen und Patienten starten den Prozess aus dem Ausland. Wir helfen dabei, den Ablauf schon vor der Einreise nach Deutschland vorzubereiten.",
      },
      documents: {
        question: "Unterstützen Sie bei Unterlagen, Übersetzungen und der Kommunikation mit Kliniken?",
        answer: "Ja. Wir helfen bei der Strukturierung medizinischer Unterlagen, bei Übersetzungen und bei einer klaren Kommunikation mit allen Beteiligten.",
      },
      onSite: {
        question: "Gibt es auch Unterstützung vor Ort und bei der Reise?",
        answer: "Ja. Bei Bedarf unterstützen wir bei Transfers, Logistik, Aufenthaltskoordination und den persönlichen Terminen vor Ort, damit sich Patient und Familie entlastet fühlen.",
      },
      start: {
        question: "Wie beginnt die Zusammenarbeit?",
        answer: "Am einfachsten über eine Anfrage auf der Website. Danach melden wir uns bei Ihnen, klären die Situation und empfehlen den sinnvollsten nächsten Schritt.",
      },
    },
  },
  es: {
    eyebrow: "FAQs",
    title: "Preguntas frecuentes.",
    subtitle: "Lo esencial sobre la coordinación médica, la planificación del viaje y cómo empezar a trabajar con nosotros.",
    items: {
      services: {
        question: "¿Qué hace exactamente Medical Concierge Agency?",
        answer: "Acompañamos a pacientes internacionales durante todo el proceso: selección de clínica y especialista, coordinación del tratamiento, gestión documental, comunicación y organización del viaje.",
      },
      clinicSelection: {
        question: "¿Pueden ayudarnos a elegir la clínica o el especialista adecuado en Alemania?",
        answer: "Sí. Analizamos su solicitud, el contexto médico y las circunstancias prácticas para proponer clínicas y especialistas relevantes.",
      },
      travel: {
        question: "¿Necesito estar ya en Alemania para contactar con ustedes?",
        answer: "No. Muchos pacientes comienzan a distancia. Ayudamos a preparar el proceso con antelación y a organizar el recorrido médico antes de llegar a Alemania.",
      },
      documents: {
        question: "¿Ayudan con los informes, las traducciones y la comunicación con las clínicas?",
        answer: "Sí. Ayudamos a estructurar la documentación médica, traducir materiales y organizar una comunicación clara entre todas las partes implicadas.",
      },
      onSite: {
        question: "¿También ofrecen apoyo local y ayuda con el viaje?",
        answer: "Sí. Cuando hace falta, apoyamos con traslados, logística, coordinación local y etapas presenciales para que el paciente y su familia se sientan más tranquilos.",
      },
      start: {
        question: "¿Cómo empezamos?",
        answer: "Puede comenzar enviando una solicitud a través del sitio web. Después nos pondremos en contacto con usted, entenderemos la situación y le propondremos el siguiente paso más adecuado.",
      },
    },
  },
} as const;

export function Faq() {
  const locale = useLocale();
  const t = useTranslations("home");
  const [openKey, setOpenKey] = useState<(typeof FAQ_ITEMS)[number] | null>(FAQ_ITEMS[0]);
  const fallback = FAQ_FALLBACKS[locale as keyof typeof FAQ_FALLBACKS] ?? FAQ_FALLBACKS.en;

  const getFaqText = (key: "eyebrow" | "title" | "subtitle") => (
    t.has(`faq.${key}`) ? t(`faq.${key}`) : fallback[key]
  );

  const getFaqItemText = (
    itemKey: (typeof FAQ_ITEMS)[number],
    field: "question" | "answer"
  ) => (
    t.has(`faq.items.${itemKey}.${field}`)
      ? t(`faq.items.${itemKey}.${field}`)
      : fallback.items[itemKey][field]
  );

  return (
    <section id="faq" className={styles.section} data-home-section="faq">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>({getFaqText("eyebrow")})</p>
            <h2 className={styles.title}>{getFaqText("title")}</h2>
            <p className={styles.subtitle}>{getFaqText("subtitle")}</p>
          </div>

          <div className={styles.accordion}>
            {FAQ_ITEMS.map((itemKey, index) => {
              const isOpen = openKey === itemKey;
              const triggerId = `faq-${itemKey}-trigger`;
              const panelId = `faq-${itemKey}-panel`;

              return (
                <article
                  key={itemKey}
                  className={cn(styles.item, isOpen && styles.itemOpen)}
                >
                  <button
                    id={triggerId}
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenKey((current) => (current === itemKey ? null : itemKey))}
                  >
                    <span className={styles.index}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.question}>{getFaqItemText(itemKey, "question")}</span>
                    <span className={cn(styles.icon, isOpen && styles.iconOpen)} aria-hidden="true">
                      <span className={styles.iconBar} />
                      <span className={cn(styles.iconBar, styles.iconBarVertical)} />
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    aria-hidden={!isOpen}
                    className={cn(styles.panel, isOpen && styles.panelOpen)}
                  >
                    <div className={styles.answerWrap}>
                      <p className={styles.answer}>{getFaqItemText(itemKey, "answer")}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
