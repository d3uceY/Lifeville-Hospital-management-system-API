// import query connection
import { query } from "../db.js";
import { appointments, patients } from "../../drizzle/migrations/schema.js";
import { eq, ilike, desc, asc, count } from "drizzle-orm";


export const getAppointments = async () => {
  const rows = await db
    .select({
      ...appointments, // selects all columns from appointments
      patient_first_name: patients.first_name,
      patient_surname: patients.surname,
      hospital_number: patients.hospital_number,
      patient_phone_number: patients.phone_number,
      doctor_name: users.name,
    })
    .from(appointments)
    .innerJoin(patients, eq(appointments.patient_id, patients.patient_id))
    .innerJoin(users, eq(appointments.doctor_id, users.id))
    .orderBy(desc(appointments.created_at));

  return rows;
};

// View a specific appointment
export const viewAppointment = async (appointmentId) => {
  const rows = await db
    .select()
    .from(appointments)
    .where(eq(appointments.appointment_id, appointmentId));
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
export const updateAppointment = async (appointment_id, appointmentData) => {
  const { patientId, doctorId, appointmentDate, notes, status } =
    appointmentData;

  const { rows } = await query(
    `UPDATE appointments 
       SET patient_id = $1, doctor_id = $2, appointment_date = $3, notes = $4, status = $5, updated_at = NOW()
       WHERE appointment_id = $6
       RETURNING *;`,
    [patientId, doctorId, appointmentDate, notes, status, appointment_id]
  );

  return rows[0];
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  const { rows } = await query(
    `UPDATE appointments
     SET status = $1,
         updated_at = NOW()
     WHERE appointment_id = $2
     RETURNING *;`,
    [status, appointmentId]
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
