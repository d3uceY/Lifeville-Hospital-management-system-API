import { query } from "../db.js";


export async function createCondition(conditionData) {
    const { name } = conditionData;
    const { rows } = await query(
        `INSERT INTO conditions (name)
         VALUES ($1)
         RETURNING *`,
        [name]
    );
    return rows[0];
}

export async function getConditions() {
    const { rows } = await query("SELECT * FROM conditions");
    return rows;
}


export async function deleteCondition(conditionId) {
    const { rows } = await query("DELETE FROM conditions WHERE condition_id = $1", [conditionId]);
    return rows[0];
}