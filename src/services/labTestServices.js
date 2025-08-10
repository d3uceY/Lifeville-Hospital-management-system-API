import { query } from "../db.js";

export const getLabTests = async () => {
    const { rows } = await query("SELECT * FROM lab_tests");
    return rows;
};

export const createLabTest = async (labTest) => {
    const { rows } = await query("INSERT INTO lab_tests (test_type, comments, patient_id, prescribed_by, created_at, status ) VALUES ($1, $2, $3, $4, NOW(), 'to_do') RETURNING *", [labTest.testType, labTest.comments, labTest.patientId, labTest.prescribedBy]);
    return rows[0];
};


export const getLabTestById = async (id) => {
    const { rows } = await query("SELECT * FROM lab_tests WHERE id = $1", [id]);
    return rows[0];
};


export const getLabTestTypes = async () => {
    const { rows } = await query("SELECT * FROM lab_test_types");
    return rows;
};

export const deleteLabTestType = async (id) => {
    const { rows } = await query("DELETE FROM lab_test_types WHERE id = $1", [id]);
    return rows[0];
};

export const createLabTestType = async (labTestType) => {
    const { rows } = await query("INSERT INTO lab_test_types (name, description) VALUES ($1, $2) RETURNING *", [labTestType.name, labTestType.description]);
    return rows[0];
};

export const updateLabTestType = async (id, labTestType) => {
    const { rows } = await query("UPDATE lab_test_types SET name = $1, description = $2 WHERE id = $3 RETURNING *", [labTestType.name, labTestType.description, id]);
    return rows[0];
};