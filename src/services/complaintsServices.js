import { query } from "../db.js";

export const getComplaints = async () => {
    const { rows } = await query("SELECT * FROM complaints");
    return rows;
};

export const getComplaintsByPatientId = async (patientId) => {
    const { rows } = await query(
        "SELECT c.*, p.first_name, p.surname FROM complaints c INNER JOIN patients p ON c.patient_id = p.patient_id WHERE c.patient_id = $1 ORDER BY c.created_at DESC",
        [patientId]
    );
    return rows;
};

export const createComplaint = async (complaint) => {
    const { rows } = await query("INSERT INTO complaints (patient_id, complaint, created_at, recorded_by) VALUES ($1, $2, NOW(), $3) RETURNING *", [complaint.patientId, complaint.complaint, complaint.recordedBy]);
    return rows[0];
};
