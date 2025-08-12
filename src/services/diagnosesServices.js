import { query } from "../db.js";

// CREATE diagnosis
export const createDiagnosis = async (diagnosisData) => {
    const {
        patient_id,
        recorded_by,
        condition,
        notes
    } = diagnosisData;

    const { rows } = await query(
        `INSERT INTO diagnoses (
            patient_id,
            recorded_by,
            condition,
            notes
        ) VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [patient_id, recorded_by, condition, notes]
    );

    return rows[0];
};

// GET all diagnoses for a patient (joined with patient info)
export const getDiagnosesByPatientId = async (patientId) => {
    const { rows } = await query(
        `SELECT d.*, p.first_name, p.surname, p.hospital_number
         FROM diagnoses d
         INNER JOIN patients p ON d.patient_id = p.patient_id
         WHERE d.patient_id = $1
         ORDER BY d.diagnosis_date DESC`,
        [patientId]
    );
    return rows;
};

// GET single diagnosis by ID (joined with patient info)
export const getDiagnosisById = async (diagnosisId) => {
    const { rows } = await query(
        `SELECT d.*, p.first_name, p.surname, p.hospital_number
         FROM diagnoses d
         INNER JOIN patients p ON d.patient_id = p.patient_id
         WHERE d.diagnosis_id = $1`,
        [diagnosisId]
    );
    return rows[0];
};

// UPDATE diagnosis
export const updateDiagnosis = async (diagnosisId, updateData) => {
    const { condition, notes } = updateData;

    const { rows } = await query(
        `UPDATE diagnoses
         SET condition = $1,
             notes = $2
         WHERE diagnosis_id = $3
         RETURNING *`,
        [condition, notes, diagnosisId]
    );

    return rows[0];
};

// DELETE diagnosis
export const deleteDiagnosis = async (diagnosisId) => {
    const { rows } = await query(
        `DELETE FROM diagnoses
         WHERE diagnosis_id = $1
         RETURNING *`,
        [diagnosisId]
    );
    return rows[0];
};
