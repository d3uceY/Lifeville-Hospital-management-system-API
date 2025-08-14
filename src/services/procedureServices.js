import { query } from "../db.js";

export async function addProcedure({ patient_id, recorded_by, procedure_name, comments, performed_at }) {
    const { rows } = await query(
        `INSERT INTO procedures (patient_id, recorded_by, procedure_name, comments, performed_at)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [patient_id, recorded_by, procedure_name, comments, performed_at]
    );
    return rows[0];
}

export async function getProceduresByPatientId(patient_id) {
    const { rows } = await query(
        `SELECT pr.*, p.surname, p.first_name FROM procedures pr
         INNER JOIN patients p ON pr.patient_id = p.patient_id
         WHERE pr.patient_id = $1
         ORDER BY pr.created_at DESC`,
        [patient_id]
    );
    return rows;
}