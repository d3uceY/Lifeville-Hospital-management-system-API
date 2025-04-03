// import query connection
import { query } from "../db.js";

// Get all appointments
export const getAppointments = async () => {
  const { rows } = await query("SELECT * FROM appointments");
  return rows;
};

// View a specific appointment
export const viewAppointment = async (appointmentId) => {
  const { rows } = await query(
    "SELECT * FROM appointments WHERE appointment_id = $1",
    [appointmentId]
  );
  return rows[0];
};

// Create a new appointment
export const createAppointment = async (appointmentData) => {
  const { patientId, doctorId, appointmentDate, notes } = appointmentData;
  
  const { rows } = await query(
    `INSERT INTO appointments (
       patient_id, doctor_id, appointment_date, notes, status
     ) VALUES ($1, $2, $3, $4, 'scheduled')
     RETURNING *;`,
    [patientId, doctorId, appointmentDate, notes]
  );

  return rows[0];
};

// Update an existing appointment
export const updateAppointment = async (appointmentData) => {
  const { appointmentId, patientId, doctorId, appointmentDate, notes, status } =
    appointmentData;

  const { rows } = await query(
    `UPDATE appointments 
       SET patient_id = $1, doctor_id = $2, appointment_date = $3, notes = $4, status = $5, updated_at = NOW()
       WHERE appointment_id = $6
       RETURNING *;`,
    [patientId, doctorId, appointmentDate, notes, status, appointmentId]
  );

  return rows[0];
};

// Delete an appointment
export const deleteAppointment = async (appointmentId) => {
  const { rowCount } = await query(
    "DELETE FROM appointments WHERE appointment_id = $1",
    [appointmentId]
  );
  return rowCount > 0;
};
