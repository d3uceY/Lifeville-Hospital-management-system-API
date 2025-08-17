import { query } from "../db.js";

// Get all nurse's notes for a patient
export const getNurseNotesByPatientId = async (patientId) => {
    const { rows } = await query(
        `SELECT id, note, recorded_by, updated_by, created_at, updated_at
     FROM nurses_notes
     WHERE patient_id = $1
     ORDER BY created_at DESC`,
        [patientId]
    );
    return rows;
};


export const createNurseNote = async (noteData) => {
    const { patientId, note, recordedBy } = noteData;

    const result = await query(
        `INSERT INTO nurses_notes (patient_id, note, recorded_by, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING *;`,
        [patientId, note, recordedBy]
    );

    return result.rows[0];
};



export const updateNurseNote = async (noteId, updatedBy, newNote) => {
    const result = await query(
        `UPDATE nurses_notes
       SET note = $1,
           updated_by = $2,
           updated_at = NOW()
       WHERE id = $3
       RETURNING *;`,
        [newNote, updatedBy, noteId]
    );

    return result.rows[0];
};



export const deleteNurseNote = async (noteId) => {
    const result = await query(
        `DELETE FROM nurses_notes
       WHERE id = $1
       RETURNING *;`,
        [noteId]
    );
    return result.rows[0]; // returns deleted note if you want confirmation
};
