// import query connection
import { query } from "../db.js";

export const getBirthRecords = async () => {
  const { rows } = await query(`SELECT * FROM birth_records`);
  return rows;
};

export const updateBirthRecord = async (birthId, birthData) => {
  const {
    childName,
    gender,
    birthDate,
    motherName,
    fatherName,
    weight,
    phoneNumber,
    address,
    report,
  } = birthData;

  const { rows } = await query(
    `UPDATE birth_records
       SET
         child_name   = $1,
         gender       = $2,
         birth_date   = $3,
         mother_name  = $4,
         father_name  = $5,
         weight       = $6,
         phone_number = $7,
         address      = $8,
         report       = $9,
         updated_at   = now()
       WHERE birth_id = $10
       RETURNING *;`,
    [
      childName,
      gender,
      birthDate,
      motherName,
      fatherName,
      weight,
      phoneNumber,
      address,
      report,
      birthId,
    ]
  );

  return rows[0];
};

export const createBirthRecord = async (birthData) => {
  const {
    childName,
    gender,
    birthDate,
    motherName,
    fatherName,
    weight,
    phoneNumber,
    address,
    report,
  } = birthData;

  const { rows } = await query(
    `INSERT INTO birth_records (
          child_name,
          gender,
          birth_date,
          mother_name,
          father_name,
          weight,
          phone_number,
          address,
          report
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;`,
    [
      childName,
      gender,
      birthDate,
      motherName,
      fatherName,
      weight,
      phoneNumber,
      address,
      report,
    ]
  );

  return rows[0];
};

export const deleteBirthRecord = async (birthId) => {
  const { rows } = await query(
    `DELETE FROM birth_records
       WHERE birth_id = $1
       RETURNING *;`,
    [birthId]
  );

  return rows.length > 0;
};
