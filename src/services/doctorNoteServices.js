import { query } from "../db.js";


export const getDoctorNotesByPatientId = async (patientId) => {
    const { rows } = await query(
        `SELECT id, note, recorded_by, updated_by, created_at, updated_at
     FROM doctors_notes
     WHERE patient_id = $1
     ORDER BY created_at DESC`,
        [patientId]
    );
    return rows;
};

export const createDoctorNote = async (noteData) => {
    const { patientId, note, recordedBy } = noteData;

    const result = await query(
        `INSERT INTO doctors_notes (patient_id, note, recorded_by, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING *;`,
        [patientId, note, recordedBy]
    );

    return result.rows[0];
};


export const deleteDoctorNote = async (noteId) => {
    const result = await query(
        `DELETE FROM doctors_notes
       WHERE id = $1
       RETURNING *;`,
        [noteId]
    );
    return result.rows[0];
};
