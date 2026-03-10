import { config } from "dotenv";
import pg from "pg";

config({ path: ".env.local" });
config({ path: ".env" });

const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Database connection string not found");
}

const pool = new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } });

function cuid() {
  return "c" + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

async function main() {
  const client = await pool.connect();

  try {
    console.log("🌱 Seeding database...");

    // LOCATIONS
    const locations = [
      { code: "germany", nameEn: "Germany", nameDe: "Deutschland", nameRu: "Германия", nameEs: "Alemania", sortOrder: 1 },
      { code: "eu", nameEn: "European Union (not Germany)", nameDe: "Europäische Union (nicht Deutschland)", nameRu: "Евросоюз (не Германия)", nameEs: "Unión Europea (no Alemania)", sortOrder: 2 },
      { code: "other", nameEn: "Other country", nameDe: "Anderes Land", nameRu: "Другая страна", nameEs: "Otro país", sortOrder: 3 },
    ];

    for (const loc of locations) {
      await client.query(
        `INSERT INTO "Location" (id, code, "nameEn", "nameDe", "nameRu", "nameEs", "sortOrder", "isActive", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, true, NOW(), NOW())
         ON CONFLICT (code) DO UPDATE SET "nameEn" = $3, "nameDe" = $4, "nameRu" = $5, "nameEs" = $6, "sortOrder" = $7, "updatedAt" = NOW()`,
        [cuid(), loc.code, loc.nameEn, loc.nameDe, loc.nameRu, loc.nameEs, loc.sortOrder]
      );
    }
    console.log("✅ Locations seeded");

    // SERVICES
    const services = [
      { code: "charter", nameEn: "Charter Flight", nameDe: "Charterflug", nameRu: "Чартерный рейс", nameEs: "Vuelo chárter", descEn: "Private flight without queues and layovers", descDe: "Privatflug ohne Warteschlangen und Zwischenstopps", descRu: "Частный перелёт без очередей и пересадок", descEs: "Vuelo privado sin colas ni escalas", icon: "Plane", sortOrder: 1 },
      { code: "transport", nameEn: "Personal Transport", nameDe: "Persönlicher Transport", nameRu: "Личный транспорт", nameEs: "Transporte personal", descEn: "Premium car with driver", descDe: "Premiumfahrzeug mit Fahrer", descRu: "Премиальный автомобиль с водителем", descEs: "Coche premium con conductor", icon: "Car", sortOrder: 2 },
      { code: "visa", nameEn: "Visa Support", nameDe: "Visa-Unterstützung", nameRu: "Визовая поддержка", nameEs: "Apoyo de visa", descEn: "Visas, invitations, document processing", descDe: "Visa, Einladungen, Dokumentenbearbeitung", descRu: "Визы, приглашения, оформление документов", descEs: "Visas, invitaciones, tramitación de documentos", icon: "FileCheck", sortOrder: 3 },
      { code: "translator", nameEn: "Personal Interpreter", nameDe: "Persönlicher Dolmetscher", nameRu: "Личный переводчик", nameEs: "Intérprete personal", descEn: "Accompaniment at all meetings and consultations", descDe: "Begleitung bei allen Treffen und Beratungen", descRu: "Сопровождение на всех встречах и консультациях", descEs: "Acompañamiento en todas las reuniones y consultas", icon: "Languages", sortOrder: 4 },
      { code: "hotel", nameEn: "Hotel Booking", nameDe: "Hotelbuchung", nameRu: "Бронирование отеля", nameEs: "Reserva de hotel", descEn: "We will find accommodation near the clinic", descDe: "Wir finden eine Unterkunft in der Nähe der Klinik", descRu: "Подберём размещение рядом с клиникой", descEs: "Encontraremos alojamiento cerca de la clínica", icon: "Hotel", sortOrder: 5 },
    ];

    for (const svc of services) {
      await client.query(
        `INSERT INTO "Service" (id, code, "nameEn", "nameDe", "nameRu", "nameEs", "descEn", "descDe", "descRu", "descEs", icon, "sortOrder", "isActive", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true, NOW(), NOW())
         ON CONFLICT (code) DO UPDATE SET "nameEn" = $3, "nameDe" = $4, "nameRu" = $5, "nameEs" = $6, "descEn" = $7, "descDe" = $8, "descRu" = $9, "descEs" = $10, icon = $11, "sortOrder" = $12, "updatedAt" = NOW()`,
        [cuid(), svc.code, svc.nameEn, svc.nameDe, svc.nameRu, svc.nameEs, svc.descEn, svc.descDe, svc.descRu, svc.descEs, svc.icon, svc.sortOrder]
      );
    }
    console.log("✅ Services seeded");

    // INSURANCE STATUSES
    const insuranceStatuses = [
      { code: "yes", nameEn: "Yes, I have insurance", nameDe: "Ja, ich habe eine Versicherung", nameRu: "Да, есть страховка", nameEs: "Sí, tengo seguro", sortOrder: 1 },
      { code: "no", nameEn: "No insurance", nameDe: "Keine Versicherung", nameRu: "Нет страховки", nameEs: "Sin seguro", sortOrder: 2 },
    ];

    for (const ins of insuranceStatuses) {
      await client.query(
        `INSERT INTO "InsuranceStatus" (id, code, "nameEn", "nameDe", "nameRu", "nameEs", "sortOrder", "isActive", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, true, NOW(), NOW())
         ON CONFLICT (code) DO UPDATE SET "nameEn" = $3, "nameDe" = $4, "nameRu" = $5, "nameEs" = $6, "sortOrder" = $7, "updatedAt" = NOW()`,
        [cuid(), ins.code, ins.nameEn, ins.nameDe, ins.nameRu, ins.nameEs, ins.sortOrder]
      );
    }
    console.log("✅ Insurance statuses seeded");

    // TRAVEL ABILITIES
    const travelAbilities = [
      { code: "yes", nameEn: "Yes", nameDe: "Ja", nameRu: "Да", nameEs: "Sí", sortOrder: 1 },
      { code: "no", nameEn: "No", nameDe: "Nein", nameRu: "Нет", nameEs: "No", sortOrder: 2 },
      { code: "need_help", nameEn: "I need help organizing the trip", nameDe: "Ich brauche Hilfe bei der Organisation der Reise", nameRu: "Нужна помощь с организацией поездки", nameEs: "Necesito ayuda para organizar el viaje", sortOrder: 3 },
    ];

    for (const ta of travelAbilities) {
      await client.query(
        `INSERT INTO "TravelAbility" (id, code, "nameEn", "nameDe", "nameRu", "nameEs", "sortOrder", "isActive", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, true, NOW(), NOW())
         ON CONFLICT (code) DO UPDATE SET "nameEn" = $3, "nameDe" = $4, "nameRu" = $5, "nameEs" = $6, "sortOrder" = $7, "updatedAt" = NOW()`,
        [cuid(), ta.code, ta.nameEn, ta.nameDe, ta.nameRu, ta.nameEs, ta.sortOrder]
      );
    }
    console.log("✅ Travel abilities seeded");

    console.log("🎉 Database seeding completed!");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((e) => {
  console.error("❌ Seeding error:", e);
  process.exit(1);
});
