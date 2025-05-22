// import query connection
import { query } from "../db.js";

/**
 * Fetch all inpatient admission records (joined with patient data)
 */
export const getInpatientAdmissions = async () => {
  const { rows } = await query(`
      SELECT
        ia.*, 
        p.patient_id,
        p.hospital_number,
        p.first_name,
        p.other_names,
        p.surname,
        p.sex,
        p.phone_number,
        d.first_name AS consultant_doctor_first_name,
        d.last_name AS consultant_doctor_last_name,
        d.specialty AS consultant_doctor_specialty
      FROM inpatient_admissions AS ia
      JOIN patients AS p
        ON ia.patient_id = p.patient_id
      LEFT JOIN doctors AS d
        ON ia.consultant_doctor_id = d.doctor_id
      ORDER BY ia.admission_date DESC;
    `);
  return rows;
};

/**
 * Fetch one inpatient admission by its ID (joined with patient data)
 */
export const viewInpatientAdmission = async (admissionId) => {
  const { rows } = await query(
    `
      SELECT
        ia.*,
        p.patient_id,
        p.hospital_number,
        p.first_name,
        p.other_names,
        p.surname,
        p.sex,
        p.marital_status,
        p.date_of_birth,
        p.phone_number,
        p.address,
        p.occupation,
        p.place_of_work_address,
        p.religion,
        p.nationality,
        p.next_of_kin,
        p.relationship,
        p.next_of_kin_phone,
        p.next_of_kin_address,
        p.past_surgical_history,
        p.family_history,
        p.social_history,
        p.drug_history,
        p.allergies,
        p.dietary_restrictions,
        p.diet_allergies_to_drugs,
        p.past_medical_history,
        d.first_name AS consultant_doctor_first_name,
        d.last_name AS consultant_doctor_last_name,
        d.specialty AS consultant_doctor_specialty
      FROM inpatient_admissions AS ia
      JOIN patients AS p
        ON ia.patient_id = p.patient_id
      LEFT JOIN doctors AS d
        ON ia.consultant_doctor_id = d.doctor_id
      WHERE ia.id = $1
      LIMIT 1;
      `,
    [admissionId]
  );

  // If no record found, return null (controller can handle 404)
  return rows[0] || null;
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

  const { rows } = await query(
    `INSERT INTO inpatient_admissions (
        patient_id,
        symptom_types,
        symptom_description,
        note,
        previous_medical_issue,
        admission_date,
        consultant_doctor_id,
        bed_group,
        bed_number
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      )
      RETURNING *;`,
    [
      patientId,
      symptomTypes,
      symptomsDescription,
      note,
      previousMedicalIssue,
      admissionDate,
      consultantDoctorId,
      bedGroup,
      bedNumber,
    ]
  );

  return rows[0];
};

/**
 * Update an existing inpatient admission by its ID
 */
export const updateInpatientAdmission = async (admissionId, admissionData) => {
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

  const { rows } = await query(
    `UPDATE inpatient_admissions
       SET
         patient_id            = $1,
         symptom_types         = $2,
         symptom_description   = $3,
         note                  = $4,
         previous_medical_issue= $5,
         admission_date        = $6,
         consultant_doctor_id  = $7,
         bed_group             = $8,
         bed_number            = $9,
         updated_at            = now()
       WHERE id = $10
       RETURNING *;`,
    [
      patientId,
      symptomTypes,
      symptomsDescription,
      note,
      previousMedicalIssue,
      admissionDate,
      consultantDoctorId,
      bedGroup,
      bedNumber,
      admissionId,
    ]
  );

  return rows[0];
};

/**
 * Delete an inpatient admission by its ID
 */
export const deleteInpatientAdmission = async (admissionId) => {
  const { rows } = await query(
    `DELETE FROM inpatient_admissions
       WHERE id = $1
       RETURNING *;`,
    [admissionId]
  );

  return rows.length > 0;
};
