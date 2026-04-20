const fs = require('fs');
const path = require('path');

const dir = '/Users/oleksandrmelnychenko/medical-visitor-facade/src/messages';
const files = ['en.json', 'de.json', 'es.json'];

const updates = {
  en: {
    appointmentSubtitle: "Fill out the form, and our specialist will contact you.",
    pathWelcome: "Start",
    pathConcernIntro: "Purpose of request",
    pathPrimaryConcern: "Clinical situation",
    welcomeTitle: "Registration of request",
    welcomeSubtitle: "The data provided in the form is necessary for the initial clinical audit and the selection of specialized medical experts.",
    concernIntroTitle: "Purpose of request",
    concernIntroDescription: "A brief description of the situation is sufficient. We will discuss and analyze the details more thoroughly during our call.",
    primaryConcernTitle: "Clinical situation (Diagnosis or symptom)",
    driverTitle: "Driver and transfer services",
    driverDetails: "Provision of professional logistics and transfer between medical visit locations.",
    conciergeTitle: "Concierge services",
    conciergeDetails: "Comprehensive organizational support: coordination of daily tasks, booking, and execution of personal requests.",
    insuranceIntroTitle: "Insurance",
    insuranceIntroSubtitle: "Please provide your medical insurance details.",
    wrapUpIntroTitle: "Final details",
    wrapUpIntroSubtitle: "Only timing and location remain to be specified. We will contact you within 3 business days."
  },
  de: {
    appointmentSubtitle: "Füllen Sie das Formular aus, und unser Spezialist wird sich mit Ihnen in Verbindung setzen.",
    pathWelcome: "Start",
    pathConcernIntro: "Zweck der Anfrage",
    pathPrimaryConcern: "Klinische Situation",
    welcomeTitle: "Registrierung der Anfrage",
    welcomeSubtitle: "Die im Formular angegebenen Daten sind für das primäre klinische Audit und die Auswahl der medizinischen Fachärzte erforderlich.",
    concernIntroTitle: "Zweck der Anfrage",
    concernIntroDescription: "Eine kurze Beschreibung der Situation ist ausreichend. Alles Weitere können wir während unseres Telefonats im Detail besprechen und klären.",
    primaryConcernTitle: "Klinische Situation (Diagnose oder Symptom)",
    driverTitle: "Fahrer- und Transferservices",
    driverDetails: "Sicherstellung professioneller Logistik und Transfers zwischen den Standorten der medizinischen Termine.",
    conciergeTitle: "Concierge-Services",
    conciergeDetails: "Umfassende organisatorische Begleitung: Koordination täglicher Aufgaben, Buchungen und Ausführung persönlicher Anliegen.",
    insuranceIntroTitle: "Versicherung",
    insuranceIntroSubtitle: "Bitte geben Sie Ihre Krankenversicherungsdaten an.",
    wrapUpIntroTitle: "Letzte Details",
    wrapUpIntroSubtitle: "Es müssen nur noch Zeit und Ort festgelegt werden. Wir werden uns innerhalb von 3 Werktagen bei Ihnen melden."
  },
  es: {
    appointmentSubtitle: "Complete el formulario y nuestro especialista se pondrá en contacto con usted.",
    pathWelcome: "Inicio",
    pathConcernIntro: "Propósito de la solicitud",
    pathPrimaryConcern: "Situación clínica",
    welcomeTitle: "Registro de solicitud",
    welcomeSubtitle: "Los datos proporcionados en el formulario son necesarios para la auditoría clínica inicial y la selección de especialistas médicos.",
    concernIntroTitle: "Propósito de la solicitud",
    concernIntroDescription: "Una breve descripción de la situación es suficiente. Podremos discutir y analizar los detalles más a fondo durante nuestra llamada.",
    primaryConcernTitle: "Situación clínica (Diagnóstico o síntoma)",
    driverTitle: "Servicios de conductor y traslado",
    driverDetails: "Provisión de logística profesional y traslado entre los lugares de visita médica.",
    conciergeTitle: "Servicios de conserjería",
    conciergeDetails: "Apoyo organizativo integral: coordinación de tareas diarias, reservas y ejecución de solicitudes personales.",
    insuranceIntroTitle: "Seguro",
    insuranceIntroSubtitle: "Por favor, proporcione los detalles de su seguro médico.",
    wrapUpIntroTitle: "Últimos detalles",
    wrapUpIntroSubtitle: "Solo queda especificar los plazos y la ciudad. Nos pondremos en contacto con usted dentro de 3 días hábiles."
  }
};

files.forEach(file => {
  const lang = file.replace('.json', '');
  const filePath = path.join(dir, file);
  
  if (!updates[lang]) return;
  const update = updates[lang];
  
  let content = fs.readFileSync(filePath, 'utf8');
  let data = JSON.parse(content);
  
  if (data.appointment) {
    data.appointment.subtitle = update.appointmentSubtitle;
    
    if (data.appointment.newPatient) {
      const np = data.appointment.newPatient;
      
      if (np.pathTree) {
        np.pathTree.welcome = update.pathWelcome;
        np.pathTree["concern-intro"] = update.pathConcernIntro;
        np.pathTree["primary-concern"] = update.pathPrimaryConcern;
      }
      
      if (np.welcome) {
        np.welcome.title = update.welcomeTitle;
        np.welcome.subtitle = update.welcomeSubtitle;
      }
      
      if (np.concernIntro) {
        np.concernIntro.title = update.concernIntroTitle;
        np.concernIntro.description = update.concernIntroDescription;
      }
      
      if (np.primaryConcernText) {
        np.primaryConcernText.title = update.primaryConcernTitle;
      }
      
      if (np.services) {
        np.services.driver = update.driverTitle;
        np.services.driverDetails = update.driverDetails;
        np.services.concierge = update.conciergeTitle;
        np.services.conciergeDetails = update.conciergeDetails;
      }
      
      if (np.insuranceIntro) {
        np.insuranceIntro.title = update.insuranceIntroTitle;
        np.insuranceIntro.subtitle = update.insuranceIntroSubtitle;
      }
      
      if (np.wrapUpIntro) {
        np.wrapUpIntro.title = update.wrapUpIntroTitle;
        np.wrapUpIntro.subtitle = update.wrapUpIntroSubtitle;
      }
    }
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated ${file}`);
});
