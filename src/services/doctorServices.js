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
  const { first_name, last_name, speciality } = doctorData;

  const { rows } = await query(
    `INSERT INTO doctors (
       first_name, last_name, speciality
     ) VALUES ($1, $2, $3)
     RETURNING *;`,
    [first_name, last_name, speciality]
  );

  return rows[0];
};

export const updateDoctor = async (doctorData) => {
  const { first_name, last_name, speciality, doctorId } = doctorData;

  const { rows } = await query(
    `UPDATE doctors SET (
       first_name, last_name, speciality
     ) VALUES ($1, $2, $3)
     WHERE doctor_id = $4
     RETURNING *;`,
    [first_name, last_name, speciality, doctorId]
  );

  return rows[0];
};
