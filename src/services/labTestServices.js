import { query } from "../db.js";

export const getLabTests = async () => {
    const { rows } = await query("SELECT * FROM lab_tests");
    return rows;
};


export const getPaginatedLabTests = async (
    page = 1,
    pageSize = 10,
    searchTerm = ""
) => {
    const offset = (page - 1) * pageSize;
    const values = [];
    let paramIndex = 1;
    let whereSQL = "";

    // If search term is provided, search across multiple columns
    if (searchTerm) {
        whereSQL = `
            WHERE 
                p.first_name ILIKE $${paramIndex} OR
                p.surname ILIKE $${paramIndex} OR
                p.hospital_number ILIKE $${paramIndex} OR
                lt.test_type ILIKE $${paramIndex} OR
                lt.status ILIKE $${paramIndex} OR
                lt.prescribed_by ILIKE $${paramIndex} OR
                lt.comments ILIKE $${paramIndex} OR
                lt.results ILIKE $${paramIndex}
        `;
        values.push(`%${searchTerm}%`);
        paramIndex++;
    }

    // 1️⃣ Get total count
    const countResult = await query(
        `SELECT COUNT(*) AS total
         FROM lab_tests lt
         INNER JOIN patients p ON lt.patient_id = p.patient_id
         ${whereSQL}`,
        values
    );
    const totalItems = parseInt(countResult.rows[0].total, 10);
    const totalPages = Math.ceil(totalItems / pageSize);

    // 2️⃣ Get paginated results
    const { rows } = await query(
        `SELECT 
            lt.id AS lab_test_id,
            lt.patient_id,
            lt.prescribed_by,
            lt.test_type,
            lt.status,
            lt.comments,
            lt.results,
            lt.created_at,
            lt.updated_at,
            p.first_name,
            p.surname,
            p.hospital_number
         FROM lab_tests lt
         INNER JOIN patients p ON lt.patient_id = p.patient_id
         ${whereSQL}
         ORDER BY lt.created_at DESC
         LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
        [...values, pageSize, offset]
    );

    return {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize,
        skipped: offset,
        data: rows
    };
};


export const updateLabTest = async (id, status, results) => {
    const { rows } = await query(
        `UPDATE lab_tests
         SET 
            status = $1,
            results = $2,
            updated_at = NOW()
         WHERE id = $3
         RETURNING *`,
        [status, results, id]
    );
    return rows[0];
};


export const getLabTestsByPatientId = async (patientId) => {
    const { rows } = await query(
        `SELECT lt.*, p.surname, p.first_name
         FROM lab_tests lt
         INNER JOIN patients p ON lt.patient_id = p.patient_id
         WHERE lt.patient_id = $1
         ORDER BY lt.created_at DESC`, 
        [patientId]
    );
    return rows;
};

export const createLabTest = async (labTest) => {
    const { rows } = await query("INSERT INTO lab_tests (test_type, comments, patient_id, prescribed_by, created_at, status ) VALUES ($1, $2, $3, $4, NOW(), 'to do') RETURNING *", [labTest.testType, labTest.comments, labTest.patientId, labTest.prescribedBy]);
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