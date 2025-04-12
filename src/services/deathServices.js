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
  const { patientId, deathDate, guardian, report } = deathData;
  const { rows: existing } = await query(
    `SELECT 1 from death_records where patient_id = $1`,
    [patientId]
  );

  if (existing.length > 0) {
    const err = new Error("This Death record already exists");
    err.code = "DUPLICATE_DEATH_RECORD";
    throw err;
  }

  const { rows } = await query(
    `
    INSERT INTO death_records (patient_id, death_date, guardian, report)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `,
    [patientId, deathDate, guardian, report]
  );
  return rows[0];
};

export const deleteDeathRecord = async (id) => {
  const { rows } = await query(
    `DELETE FROM death_records WHERE id = $1 RETURNING *`,
    [id]
  );
  return rows[0];
};
