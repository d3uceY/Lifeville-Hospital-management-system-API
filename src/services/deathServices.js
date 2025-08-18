import { db } from "../../drizzle-db.js";
import { deathRecords, patients } from "../../drizzle/migrations/schema.js";
import { eq } from "drizzle-orm";

// Get all death records with patient info
export async function getDeathRecords() {
  return await db
    .select({
      id: deathRecords.id,
      patient_id: deathRecords.patient_id,
      death_date: deathRecords.death_date,
      guardian: deathRecords.guardian,
      report: deathRecords.report,
      patient_first_name: patients.first_name,
      patient_surname: patients.surname,
      hospital_number: patients.hospital_number,
      next_of_kin: patients.next_of_kin,
      relationship: patients.relationship,
      sex: patients.sex,
    })
    .from(deathRecords)
    .innerJoin(patients, eq(deathRecords.patient_id, patients.patient_id));
}

// Create a new death record
export async function createDeathRecord(deathData) {
  const { patientId, deathDate, guardian, report } = deathData;

  // Check for existing record
  const existing = await db
    .select()
    .from(deathRecords)
    .where(eq(deathRecords.patient_id, patientId));

  if (existing.length > 0) {
    const err = new Error("This death record already exists");
    err.code = "DUPLICATE_DEATH_RECORD";
    throw err;
  }

  const [newRecord] = await db
    .insert(deathRecords)
    .values({
      patient_id: patientId,
      death_date: deathDate,
      guardian,
      report,
    })
    .returning();

  return newRecord;
}

// Delete a death record
export async function deleteDeathRecord(id) {
  const [deleted] = await db
    .delete(deathRecords)
    .where(eq(deathRecords.id, id))
    .returning();

  return deleted;
}

// Update a death record
export async function updateDeathRecord(id, deathData) {
  const { patientId, deathDate, guardian, report } = deathData;

  const [updated] = await db
    .update(deathRecords)
    .set({
      patient_id: patientId,
      death_date: deathDate,
      guardian,
      report,
    })
    .where(eq(deathRecords.id, id))
    .returning();

  return updated;
}
