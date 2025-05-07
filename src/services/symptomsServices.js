// import query connection
import { query } from "../db.js";

export const getSymptomTypes = async () => {
  const { rows } = await query(`SELECT * FROM symptom_types`);
  return rows;
};

export const createSymptomType = async (symptomTypeData) => {
  const { symptomText } = symptomTypeData;

  const { rows } = await query(
    `INSERT INTO symptom_types (symptom_text) VALUES ($1) RETURNING *`,
    [symptomText]
  );
  return rows[0];
};

export const deleteSymptomType = async (symptomTypeId) => {
  const { rows } = await query(
    `DELETE FROM symptom_types WHERE symptom_type_id = $1 RETURNING *`,
    [symptomTypeId]
  );
  return rows.length > 0;
};

export const updateSymptomType = async (symptomTypeId, symptomTypeData) => {
  const { symptomText } = symptomTypeData;

  const { rows } = await query(
    `UPDATE symptom_types 
        SET symptom_text = $1
        WHERE symptom_type_id = $2
        RETURNING *`,
    [symptomText, symptomTypeId]
  );
  return rows[0];
};

export const getSymptomHeads = async () => {
  const { rows } = await query(`
    SELECT 
     sh.*, 
     symptom_types.symptom_text as symptom_type,
     symptom_types.symptom_type_id
     FROM symptom_heads sh
     JOIN symptom_types ON sh.symptom_type_id = symptom_types.symptom_type_id;
    `);
  return rows;
}; 

export const createSymptomHead = async (symptomHeadData) => {
  const { symptomHeadText, symptomTypeId, symptomDescription } =
    symptomHeadData;

  const { rows } = await query(
    `INSERT INTO symptom_heads (symptom_head, symptom_type_id, symptom_description)
       VALUES ($1, $2, $3)
       RETURNING *`,
    [symptomHeadText, symptomTypeId, symptomDescription]
  );

  return rows[0];
};

export const deleteSymptomHead = async (symptomHeadId) => {
  const { rows } = await query(
    `DELETE FROM symptom_heads WHERE symptom_head_id = $1 RETURNING *`,
    [symptomHeadId]
  );
  return rows.length > 0;
};

export const updateSymptomHead = async (symptomHeadId, symptomHeadData) => {
  const { symptomHeadText, symptomTypeId, symptomDescription } =
    symptomHeadData;

  const { rows } = await query(
    `UPDATE symptom_heads 
        SET symptom_head = $1, symptom_type_id = $2, symptom_description = $3
        WHERE symptom_head_id = $4
        RETURNING *`,
    [symptomHeadText, symptomTypeId, symptomDescription, symptomHeadId]
  );
  return rows[0];
};
