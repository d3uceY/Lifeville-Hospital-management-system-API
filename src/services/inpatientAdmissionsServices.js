import { eq, desc, and } from "drizzle-orm";
import { db } from "../../drizzle-db.js";
import { inpatientAdmissions, patients, users, discharge_summary } from "../../drizzle/migrations/schema.js";

/**
 * Fetch all inpatient admission records (joined with patient data)
 */
export const getInpatientAdmissions = async () => {
  return await db
    .select({
      // inpatient_admissions fields
      id: inpatientAdmissions.id,
      patient_id: inpatientAdmissions.patient_id,
      symptom_types: inpatientAdmissions.symptom_types,
      symptom_description: inpatientAdmissions.symptom_description,
      note: inpatientAdmissions.note,
      previous_medical_issue: inpatientAdmissions.previous_medical_issue,
      admission_date: inpatientAdmissions.admission_date,
      consultant_doctor_id: inpatientAdmissions.consultant_doctor_id,
      bed_group: inpatientAdmissions.bed_group,
      bed_number: inpatientAdmissions.bed_number,
      created_at: inpatientAdmissions.created_at,
      updated_at: inpatientAdmissions.updated_at,
      discharge_condition: inpatientAdmissions.discharge_condition,
      // patients fields
      hospital_number: patients.hospital_number,
      first_name: patients.first_name,
      other_names: patients.other_names,
      surname: patients.surname,
      sex: patients.sex,
      date_of_birth: patients.date_of_birth,
      phone_number: patients.phone_number,
      // users fields
      consultant_doctor_name: users.name,
    })
    .from(inpatientAdmissions)
    .innerJoin(patients, eq(inpatientAdmissions.patient_id, patients.patient_id))
    .leftJoin(users, eq(inpatientAdmissions.consultant_doctor_id, users.id))
    .orderBy(desc(inpatientAdmissions.admission_date));
};



export const getInpatientAdmissionsByPatientId = async (patientId) => {
  return await db
    .select({
      // inpatient_admissions fields
      id: inpatientAdmissions.id,
      patient_id: inpatientAdmissions.patient_id,
      symptom_types: inpatientAdmissions.symptom_types,
      symptom_description: inpatientAdmissions.symptom_description,
      note: inpatientAdmissions.note,
      previous_medical_issue: inpatientAdmissions.previous_medical_issue,
      admission_date: inpatientAdmissions.admission_date,
      consultant_doctor_id: inpatientAdmissions.consultant_doctor_id,
      bed_group: inpatientAdmissions.bed_group,
      bed_number: inpatientAdmissions.bed_number,
      created_at: inpatientAdmissions.created_at,
      updated_at: inpatientAdmissions.updated_at,
      discharge_condition: inpatientAdmissions.discharge_condition,
      // patients fields
      hospital_number: patients.hospital_number,
      first_name: patients.first_name,
      other_names: patients.other_names,
      surname: patients.surname,
      sex: patients.sex,
      date_of_birth: patients.date_of_birth,
      phone_number: patients.phone_number,
      // users fields
      consultant_doctor_name: users.name,
    })
    .from(inpatientAdmissions)
    .innerJoin(patients, eq(inpatientAdmissions.patient_id, patients.patient_id))
    .leftJoin(users, eq(inpatientAdmissions.consultant_doctor_id, users.id))
    .where(eq(inpatientAdmissions.patient_id, patientId))
    .orderBy(desc(inpatientAdmissions.admission_date));
};




/**
 * Fetch one inpatient admission by its ID (joined with patient data)
 */
export const viewInpatientAdmission = async (admissionId) => {
  const [admission] = await db
    .select({
      // inpatient_admissions fields
      id: inpatientAdmissions.id,
      patient_id: inpatientAdmissions.patient_id,
      symptom_types: inpatientAdmissions.symptom_types,
      symptom_description: inpatientAdmissions.symptom_description,
      note: inpatientAdmissions.note,
      previous_medical_issue: inpatientAdmissions.previous_medical_issue,
      admission_date: inpatientAdmissions.admission_date,
      consultant_doctor_id: inpatientAdmissions.consultant_doctor_id,
      bed_group: inpatientAdmissions.bed_group,
      bed_number: inpatientAdmissions.bed_number,
      created_at: inpatientAdmissions.created_at,
      updated_at: inpatientAdmissions.updated_at,
      // patients fields
      hospital_number: patients.hospital_number,
      first_name: patients.first_name,
      other_names: patients.other_names,
      surname: patients.surname,
      sex: patients.sex,
      marital_status: patients.marital_status,
      date_of_birth: patients.date_of_birth,
      phone_number: patients.phone_number,
      address: patients.address,
      occupation: patients.occupation,
      place_of_work_address: patients.place_of_work_address,
      religion: patients.religion,
      nationality: patients.nationality,
      next_of_kin: patients.next_of_kin,
      relationship: patients.relationship,
      next_of_kin_phone: patients.next_of_kin_phone,
      next_of_kin_address: patients.next_of_kin_address,
      past_surgical_history: patients.past_surgical_history,
      family_history: patients.family_history,
      social_history: patients.social_history,
      drug_history: patients.drug_history,
      allergies: patients.allergies,
      dietary_restrictions: patients.dietary_restrictions,
      diet_allergies_to_drugs: patients.diet_allergies_to_drugs,
      past_medical_history: patients.past_medical_history,
      patient_type: patients.patient_type,
      // users fields
      consultant_doctor_first_name: users.first_name,
      consultant_doctor_last_name: users.last_name,
      consultant_doctor_specialty: users.specialty,
    })
    .from(inpatientAdmissions)
    .innerJoin(patients, eq(inpatientAdmissions.patient_id, patients.patient_id))
    .leftJoin(users, eq(inpatientAdmissions.consultant_doctor_id, users.doctor_id))
    .where(eq(inpatientAdmissions.id, admissionId));

  return admission || null;
};

/**
 * Create a new inpatient admission
 */
export const createInpatientAdmission = async (admissionData) => {
  const {
    patientId,
    symptomTypes, // array of strings
    symptomsDescription,
    note,
    previousMedicalIssue,
    admissionDate, // JS Date or ISO string
    consultantDoctorId,
    bedGroup,
    bedNumber,
  } = admissionData;

  try {
    const admitted = await db
      .select()
      .from(inpatientAdmissions)
      .where(
        and(
          eq(inpatientAdmissions.patient_id, patientId),
          eq(inpatientAdmissions.discharge_condition, "on admission")
        )
      );

    if (admitted.length > 0) {
      throw new Error("Patient is already admitted");
    }
  } catch (err) {
    console.error("error fetching inpatient admissions:", err);
    throw err;
  }

  await db.update(patients).set({
    patient_type: "INPATIENT",
  }).where(eq(patients.patient_id, patientId));

  const [newAdmission] = await db
    .insert(inpatientAdmissions)
    .values({
      patient_id: patientId,
      symptom_types: symptomTypes,
      symptom_description: symptomsDescription,
      note,
      previous_medical_issue: previousMedicalIssue,
      admission_date: admissionDate,
      consultant_doctor_id: consultantDoctorId,
      bed_group: bedGroup,
      bed_number: bedNumber,
    })
    .returning();

  return newAdmission;
};

/**
 * Update an existing inpatient admission by its ID
 */
export const updateInpatientAdmission = async (admissionId, admissionData) => {
  // Ensure admission exists
  const [existing] = await db
    .select()
    .from(inpatientAdmissions)
    .where(eq(inpatientAdmissions.id, admissionId));

  if (!existing) {
    const err = new Error("Inpatient admission not found");
    err.code = "ADMISSION_NOT_FOUND";
    throw err;
  }

  const {
    patientId,
    symptomTypes,
    symptomsDescription,
    note,
    previousMedicalIssue,
    admissionDate,
    consultantDoctorId,
    bedGroup,
    bedNumber,
  } = admissionData;

  const updateData = {
    ...(patientId !== undefined && { patient_id: patientId }),
    ...(symptomTypes !== undefined && { symptom_types: symptomTypes }),
    ...(symptomsDescription !== undefined && { symptom_description: symptomsDescription }),
    ...(note !== undefined && { note }),
    ...(previousMedicalIssue !== undefined && { previous_medical_issue: previousMedicalIssue }),
    ...(admissionDate !== undefined && { admission_date: admissionDate }),
    ...(consultantDoctorId !== undefined && { consultant_doctor_id: consultantDoctorId }),
    ...(bedGroup !== undefined && { bed_group: bedGroup }),
    ...(bedNumber !== undefined && { bed_number: bedNumber }),
  };

  const [updatedAdmission] = await db
    .update(inpatientAdmissions)
    .set(updateData)
    .where(eq(inpatientAdmissions.id, admissionId))
    .returning();

  return updatedAdmission;
};

/**
 * Delete an inpatient admission by its ID
 */
export const deleteInpatientAdmission = async (admissionId) => {
  const [deletedAdmission] = await db
    .delete(inpatientAdmissions)
    .where(eq(inpatientAdmissions.id, admissionId))
    .returning();

  await db.update(patients).set({
    patient_type: "OUTPATIENT",
  }).where(eq(patients.patient_id, deletedAdmission.patient_id));


  return !!deletedAdmission;
};


/**
 * Discharge an inpatient admission by its ID
 */

export const dischargeInpatientAdmission = async (dischargeData) => {
  const {
    patient_id,
    admission_id,
    recorded_by,
    final_diagnosis,
    diagnosis_details,
    treatment_given,
    outcome,
    condition,
    discharge_date_time,
    follow_up,
    doctor_id } = dischargeData;


  const [newDischarge] = await db.insert(discharge_summary).values({
    patient_id,
    admission_id,
    recorded_by,
    final_diagnosis,
    diagnosis_details,
    treatment_given,
    outcome,
    condition,
    discharge_date_time,
    follow_up,
    doctor_id
  }).returning();

  if (!newDischarge) {
    const err = new Error("Discharge not created");
    err.code = "DISCHARGE_NOT_CREATED";
    throw err;
  }
  
    // update inpatient admission
    try {
      await db.update(inpatientAdmissions).set({
        discharge_condition: condition,
      }).where(eq(inpatientAdmissions.id, admission_id));
    } catch (err) {
      console.error("Error updating inpatient admission:", err);
      throw err;
    }

  // update patient type
  try {
    await db.update(patients).set({
      patient_type: "OUTPATIENT",
    }).where(eq(patients.patient_id, patient_id));
  } catch (err) {
    console.error("Error updating patient type:", err);
    throw err;
  }

}
