// import query connection
import { query } from "../db.js";

export const getDeathRecords = async () => {
  const { rows } = await query(`
    SELECT
      d.*,
      p.first_name AS patient_first_name,
      p.surname AS patient_surname,
      p.hospital_number,
      p.next_of_kin,
      p.relationship, 
      p.sex
    FROM death_records d
    JOIN patients p ON d.patient_id = p.patient_id;
  `);
  return rows;
};

export const createDeathRecord = async (deathData) => {
  const { rows } = await query(`
    INSERT INTO death_records (patient_id, date_of_death, cause_of_death)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [
    deathData.patient_id,
    deathData.date_of_death,
    deathData.cause_of_death
  ]);
  return rows[0];
};

