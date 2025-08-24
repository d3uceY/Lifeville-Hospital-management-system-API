// drizzlePatients.js
import { db } from "../../drizzle-db.js";
import { patients } from "../../drizzle/migrations/schema.js";
import { desc, eq } from "drizzle-orm";

export const getPatients = async () => {
  return await db
    .select({
      surname: patients.surname,
      first_name: patients.first_name,
      patient_id: patients.patient_id,
      hospital_number: patients.hospital_number,
      sex: patients.sex,
      date_of_birth: patients.date_of_birth,
      phone_number: patients.phone_number,
    })
    .from(patients);
};

export const getPatientNameId = async () => {
  return await db
    .select({
      patient_id: patients.patient_id,
      first_name: patients.first_name,
      surname: patients.surname,
      hospital_number: patients.hospital_number,
    })
    .from(patients);
};

// alias but same as above
export const getPatientNameAndId = getPatientNameId;

export const createPatient = async (patientData) => {
  const {
    date,
    surname,
    firstName,
    otherNames,
    sex,
    maritalStatus,
    dateOfBirth,
    phoneNumber,
    address,
    occupation,
    placeOfWorkAddress,
    religion,
    nationality,
    nextOfKin,
    relationship,
    nextOfKinPhoneNumber,
    addressOfNextOfKin,
    pastMedicalHistory,
    pastSurgicalHistory,
    familyHistory,
    socialHistory,
    drugHistory,
    allergies,
    dietaryRestrictions,
    dietAllergies,
  } = patientData;

  // Get the last patient to determine the new hospital number
  const [lastPatient] = await db
    .select({ hospital_number: patients.hospital_number })
    .from(patients)
    .orderBy(desc(patients.patient_id)) // safest to use primary key id
    .limit(1);

  let newHospitalNumber = 1; // default starting number
  if (lastPatient) {
    // Ensure it's an integer before incrementing
    newHospitalNumber = Number(lastPatient.hospital_number) + 1;
  }

  // Insert new patient with the generated hospital number
  const [newPatient] = await db
    .insert(patients)
    .values({
      date,
      hospital_number: newHospitalNumber, // auto-incremented
      surname,
      first_name: firstName,
      other_names: otherNames,
      sex,
      marital_status: maritalStatus,
      date_of_birth: dateOfBirth,
      phone_number: phoneNumber,
      address,
      occupation,
      place_of_work_address: placeOfWorkAddress,
      religion,
      nationality,
      next_of_kin: nextOfKin,
      relationship,
      next_of_kin_phone: nextOfKinPhoneNumber,
      next_of_kin_address: addressOfNextOfKin,
      past_medical_history: pastMedicalHistory,
      past_surgical_history: pastSurgicalHistory,
      family_history: familyHistory,
      social_history: socialHistory,
      drug_history: drugHistory,
      allergies,
      dietary_restrictions: dietaryRestrictions,
      diet_allergies_to_drugs: dietAllergies,
    })
    .returning();

  return newPatient;
};


export const viewPatient = async (patientId) => {
  const [patient] = await db
    .select()
    .from(patients)
    .where(eq(patients.patient_id, patientId));

  return patient;
};

export const updatePatient = async (patientId, patientData) => {
  // Ensure patient exists
  const [existing] = await db
    .select()
    .from(patients)
    .where(eq(patients.patient_id, patientId));

  if (!existing) {
    const err = new Error("Patient not found");
    err.code = "PATIENT_NOT_FOUND";
    throw err;
  }

  // Destructure + map camelCase → snake_case
  const {
    date,
    // hospitalNumber,
    surname,
    firstName,
    otherNames,
    sex,
    maritalStatus,
    dateOfBirth,
    phoneNumber,
    address,
    occupation,
    placeOfWorkAddress,
    religion,
    nationality,
    nextOfKin,
    relationship,
    nextOfKinPhoneNumber,
    addressOfNextOfKin,
    pastMedicalHistory,
    pastSurgicalHistory,
    familyHistory,
    socialHistory,
    drugHistory,
    allergies,
    dietaryRestrictions,
    dietAllergies,
  } = patientData;

  const updateData = {
    ...(date !== undefined && { date }),
    // ...(hospitalNumber !== undefined && { hospital_number: hospitalNumber }),
    ...(surname !== undefined && { surname }),
    ...(firstName !== undefined && { first_name: firstName }),
    ...(otherNames !== undefined && { other_names: otherNames }),
    ...(sex !== undefined && { sex }),
    ...(maritalStatus !== undefined && { marital_status: maritalStatus }),
    ...(dateOfBirth !== undefined && { date_of_birth: dateOfBirth }),
    ...(phoneNumber !== undefined && { phone_number: phoneNumber }),
    ...(address !== undefined && { address }),
    ...(occupation !== undefined && { occupation }),
    ...(placeOfWorkAddress !== undefined && { place_of_work_address: placeOfWorkAddress }),
    ...(religion !== undefined && { religion }),
    ...(nationality !== undefined && { nationality }),
    ...(nextOfKin !== undefined && { next_of_kin: nextOfKin }),
    ...(relationship !== undefined && { relationship }),
    ...(nextOfKinPhoneNumber !== undefined && { next_of_kin_phone: nextOfKinPhoneNumber }),
    ...(addressOfNextOfKin !== undefined && { next_of_kin_address: addressOfNextOfKin }),
    ...(pastMedicalHistory !== undefined && { past_medical_history: pastMedicalHistory }),
    ...(pastSurgicalHistory !== undefined && { past_surgical_history: pastSurgicalHistory }),
    ...(familyHistory !== undefined && { family_history: familyHistory }),
    ...(socialHistory !== undefined && { social_history: socialHistory }),
    ...(drugHistory !== undefined && { drug_history: drugHistory }),
    ...(allergies !== undefined && { allergies }),
    ...(dietaryRestrictions !== undefined && { dietary_restrictions: dietaryRestrictions }),
    ...(dietAllergies !== undefined && { diet_allergies_to_drugs: dietAllergies }),
  };

  // Update
  const [updatedPatient] = await db
    .update(patients)
    .set(updateData)
    .where(eq(patients.patient_id, patientId))
    .returning();

  return updatedPatient;
};

export const deletePatient = async (patientId) => {
  const [deletedPatient] = await db
    .delete(patients)
    .where(eq(patients.patient_id, patientId))
    .returning();

  return deletedPatient;
};
