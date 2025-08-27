import { query } from "../../drizzle-db.js";

export const createPhysicalExamination = async (examData) => {
    const {
        patient_id,
        recorded_by,
        general_appearance,
        heent,
        cardiovascular,
        respiration,
        gastrointestinal,
        gynecology_obstetrics,
        musculoskeletal,
        neurological,
        skin,
        findings,
        genitourinary
    } = examData;

    const { rows } = await query(
        `INSERT INTO physical_examinations (
            patient_id,
            recorded_by,
            created_at,
            general_appearance,
            heent,
            cardiovascular,
            respiration,
            gastrointestinal,
            gynecology_obstetrics,
            musculoskeletal,
            neurological,
            skin,
            findings,
            genitourinary
        ) VALUES (
            $1, $2, NOW(), $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
        ) RETURNING *`,
        [
            patient_id,
            recorded_by,
            general_appearance,
            heent,
            cardiovascular,
            respiration,
            gastrointestinal,
            gynecology_obstetrics,
            musculoskeletal,
            neurological,
            skin,
            findings,
            genitourinary
        ]
    );

    return rows[0];
};


export const getPhysicalExaminationsByPatientId = async (patientId) => {
    const { rows } = await query(
        `SELECT pe.*, p.surname, p.first_name
         FROM physical_examinations pe
         INNER JOIN patients p ON pe.patient_id = p.patient_id
         WHERE pe.patient_id = $1
         ORDER BY pe.created_at DESC`,
        [patientId]
    );
    return rows;
};
