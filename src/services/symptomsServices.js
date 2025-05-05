// import query connection
import { query } from "../db.js";

export const getSymptomTypes = async () => {
  const { rows } = await query(`SELECT * FROM symptom_types`);
  return rows;
};

export const createSymptomType = async (symptomTypeData) => {
  const { symptom_text } = symptomTypeData;

  const { rows } = await query(
    `INSERT INTO symptom_types (symptom_text) VALUES ($1) RETURNING *`,
    [symptom_text]
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
  const { symptom_text } = symptomTypeData;

  const { rows } = await query(
    `UPDATE symptom_types 
        SET symptom_text = $1
        WHERE symptom_type_id = $2
        RETURNING *`,
    [symptom_text, symptomTypeId]
  );
  return rows[0];
};




export const getSymptomHeads = async () => {
  const { rows } = await query(`SELECT * FROM symptom_heads`);
  return rows;
};

export const createSymptomHead = async (symptomHeadData) => {
  const { symptom_head_text, symptom_type_id, symptom_description } =
    symptomHeadData;

  const { rows } = await query(
    `INSERT INTO symptom_heads (symptom_head_text, symptom_type_id, symptom_description)
       VALUES ($1, $2, $3)
       RETURNING *`,
    [symptom_head_text, symptom_type_id, symptom_description]
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
  const { symptom_head, symptom_type_id, symptom_description } =
    symptomHeadData;

  const { rows } = await query(
    `UPDATE symptom_heads 
        SET symptom_head = $1, symptom_type_id = $2, symptom_description = $3
        WHERE symptom_head_id = $4
        RETURNING *`,
    [symptom_head, symptom_type_id, symptom_description, symptomHeadId]
  );
  return rows[0];
};
