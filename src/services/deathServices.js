// import query connection
import { query } from "../db.js";

export const getDeaths = async () => {
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

