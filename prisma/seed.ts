import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Database connection
const connectionString = "postgresql://postgres:postgres@localhost:5432/medical_website?schema=public";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ============================================
  // LOCATIONS
  // ============================================
  const locations = [
    {
      code: "germany",
      nameEn: "Germany",
      nameDe: "Deutschland",
      nameRu: "Германия",
      nameEs: "Alemania",
      sortOrder: 1,
    },
    {
      code: "eu",
      nameEn: "European Union (not Germany)",
      nameDe: "Europäische Union (nicht Deutschland)",
      nameRu: "Евросоюз (не Германия)",
      nameEs: "Unión Europea (no Alemania)",
      sortOrder: 2,
    },
    {
      code: "other",
      nameEn: "Other country",
      nameDe: "Anderes Land",
      nameRu: "Другая страна",
      nameEs: "Otro país",
      sortOrder: 3,
    },
  ];

  for (const location of locations) {
    await prisma.location.upsert({
      where: { code: location.code },
      update: location,
      create: location,
    });
  }
  console.log("✅ Locations seeded");

  // ============================================
  // SERVICES
  // ============================================
  const services = [
    {
      code: "charter",
      nameEn: "Charter Flight",
      nameDe: "Charterflug",
      nameRu: "Чартерный рейс",
      nameEs: "Vuelo chárter",
      descEn: "Private flight without queues and layovers",
      descDe: "Privatflug ohne Warteschlangen und Zwischenstopps",
      descRu: "Частный перелёт без очередей и пересадок",
      descEs: "Vuelo privado sin colas ni escalas",
      icon: "Plane",
      sortOrder: 1,
    },
    {
      code: "transport",
      nameEn: "Personal Transport",
      nameDe: "Persönlicher Transport",
      nameRu: "Личный транспорт",
      nameEs: "Transporte personal",
      descEn: "Premium car with driver",
      descDe: "Premiumfahrzeug mit Fahrer",
      descRu: "Премиальный автомобиль с водителем",
      descEs: "Coche premium con conductor",
      icon: "Car",
      sortOrder: 2,
    },
    {
      code: "visa",
      nameEn: "Visa Support",
      nameDe: "Visa-Unterstützung",
      nameRu: "Визовая поддержка",
      nameEs: "Apoyo de visa",
      descEn: "Visas, invitations, document processing",
      descDe: "Visa, Einladungen, Dokumentenbearbeitung",
      descRu: "Визы, приглашения, оформление документов",
      descEs: "Visas, invitaciones, tramitación de documentos",
      icon: "FileCheck",
      sortOrder: 3,
    },
    {
      code: "translator",
      nameEn: "Personal Interpreter",
      nameDe: "Persönlicher Dolmetscher",
      nameRu: "Личный переводчик",
      nameEs: "Intérprete personal",
      descEn: "Accompaniment at all meetings and consultations",
      descDe: "Begleitung bei allen Treffen und Beratungen",
      descRu: "Сопровождение на всех встречах и консультациях",
      descEs: "Acompañamiento en todas las reuniones y consultas",
      icon: "Languages",
      sortOrder: 4,
    },
    {
      code: "hotel",
      nameEn: "Hotel Booking",
      nameDe: "Hotelbuchung",
      nameRu: "Бронирование отеля",
      nameEs: "Reserva de hotel",
      descEn: "We will find accommodation near the clinic",
      descDe: "Wir finden eine Unterkunft in der Nähe der Klinik",
      descRu: "Подберём размещение рядом с клиникой",
      descEs: "Encontraremos alojamiento cerca de la clínica",
      icon: "Hotel",
      sortOrder: 5,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { code: service.code },
      update: service,
      create: service,
    });
  }
  console.log("✅ Services seeded");

  // ============================================
  // INSURANCE STATUSES
  // ============================================
  const insuranceStatuses = [
    {
      code: "yes",
      nameEn: "Yes, I have insurance",
      nameDe: "Ja, ich habe eine Versicherung",
      nameRu: "Да, есть страховка",
      nameEs: "Sí, tengo seguro",
      sortOrder: 1,
    },
    {
      code: "no",
      nameEn: "No insurance",
      nameDe: "Keine Versicherung",
      nameRu: "Нет страховки",
      nameEs: "Sin seguro",
      sortOrder: 2,
    },
  ];

  for (const status of insuranceStatuses) {
    await prisma.insuranceStatus.upsert({
      where: { code: status.code },
      update: status,
      create: status,
    });
  }
  console.log("✅ Insurance statuses seeded");

  // ============================================
  // TRAVEL ABILITIES
  // ============================================
  const travelAbilities = [
    {
      code: "yes",
      nameEn: "Yes",
      nameDe: "Ja",
      nameRu: "Да",
      nameEs: "Sí",
      sortOrder: 1,
    },
    {
      code: "no",
      nameEn: "No",
      nameDe: "Nein",
      nameRu: "Нет",
      nameEs: "No",
      sortOrder: 2,
    },
    {
      code: "need_help",
      nameEn: "I need help organizing the trip",
      nameDe: "Ich brauche Hilfe bei der Organisation der Reise",
      nameRu: "Нужна помощь с организацией поездки",
      nameEs: "Necesito ayuda para organizar el viaje",
      sortOrder: 3,
    },
  ];

  for (const ability of travelAbilities) {
    await prisma.travelAbility.upsert({
      where: { code: ability.code },
      update: ability,
      create: ability,
    });
  }
  console.log("✅ Travel abilities seeded");

  // ============================================
  // SUPER ADMIN USER
  // ============================================
  const bcrypt = await import("bcryptjs");
  const adminPassword = await bcrypt.hash("Admin123!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@gmed.de" },
    update: {
      password: adminPassword,
      role: "ADMIN",
    },
    create: {
      email: "admin@gmed.de",
      phone: "+4917612345678",
      password: adminPassword,
      firstName: "Super",
      lastName: "Admin",
      role: "ADMIN",
      emailVerified: new Date(),
      phoneVerified: new Date(),
    },
  });
  console.log("✅ Super Admin created:", admin.email);

  console.log("🎉 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
