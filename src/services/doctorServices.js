// import query connection
import { query } from "../db.js";

export const getDoctors = async () => {
  const { rows } = await query("SELECT * FROM doctors");
  return rows;
};

export const viewDoctor = async (doctorId) => {
  const { rows } = await query(`SELECT * FROM doctors WHERE doctor_id = $1`, [
    doctorId,
  ]);
  return rows[0];
};

export const deleteDoctor = async (doctorId) => {
  const { rowCount } = await query("DELETE FROM doctors WHERE doctor_id = $1", [
    doctorId,
  ]);
  return rowCount > 0;
};

export const createDoctor = async (doctorData) => {
  const { firstName, lastName, specialty } = doctorData;

  const { rows } = await query(
    `INSERT INTO doctors (
       first_name, last_name, specialty
     ) VALUES ($1, $2, $3)
     RETURNING *;`,
    [firstName, lastName, specialty]
  );

  return rows[0];
};

export const updateDoctor = async (doctorData) => {
  const { firstName, lastName, specialty, doctorId } = doctorData;

  const { rows } = await query(
    `UPDATE doctors SET (
       first_name, last_name, specialty
     ) VALUES ($1, $2, $3)
     WHERE doctor_id = $4
     RETURNING *;`,
    [firstName, lastName, specialty, doctorId]
  );

  return rows[0];
};
