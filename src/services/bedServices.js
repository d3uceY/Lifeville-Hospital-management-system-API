// services/bedServices.js
import { query } from "../db.js";

//
// BED TYPES
//

/**
 * Fetch all bed types
 */
export const getBedTypes = async () => {
  const { rows } = await query(`
    SELECT id, type_name, created_at, updated_at
    FROM bed_types
    ORDER BY type_name;
  `);
  return rows;
};

/**
 * Create a new bed type
 */
export const createBedType = async (typeData) => {
  const { typeName } = typeData;
  const { rows } = await query(
    `
    INSERT INTO bed_types (type_name)
    VALUES ($1)
    RETURNING id, type_name, created_at, updated_at;
    `,
    [typeName]
  );
  return rows[0];
};

/**
 * Update an existing bed type
 */
export const updateBedType = async (typeId, typeData) => {
  const { typeName } = typeData;
  const { rows } = await query(
    `
    UPDATE bed_types
       SET type_name  = $1,
           updated_at = now()
     WHERE id = $2
     RETURNING id, type_name, created_at, updated_at;
    `,
    [typeName, typeId]
  );
  return rows[0] || null;
};

/**
 * Delete a bed type
 */
export const deleteBedType = async (typeId) => {
  const { rows } = await query(
    `
    DELETE FROM bed_types
     WHERE id = $1
     RETURNING id;
    `,
    [typeId]
  );
  return rows.length > 0;
};

//
// BED GROUPS
//

/**
 * Fetch all bed groups
 */
export const getBedGroups = async () => {
  const { rows } = await query(`
    SELECT id, group_name, created_at, updated_at
    FROM bed_groups
    ORDER BY group_name;
  `);
  return rows;
};



/**
 * Create a new bed group
 */
export const createBedGroup = async (groupData) => {
  const { groupName } = groupData;
  const { rows } = await query(
    `
    INSERT INTO bed_groups (group_name)
    VALUES ($1)
    RETURNING id, group_name, created_at, updated_at;
    `,
    [groupName]
  );
  return rows[0];
};

/**
 * Update an existing bed group
 */
export const updateBedGroup = async (groupId, groupData) => {
  const { groupName } = groupData;
  const { rows } = await query(
    `
    UPDATE bed_groups
       SET group_name = $1,
           updated_at = now()
     WHERE id = $2
     RETURNING id, group_name, created_at, updated_at;
    `,
    [groupName, groupId]
  );
  return rows[0] || null;
};

/**
 * Delete a bed group
 */
export const deleteBedGroup = async (groupId) => {
  const { rows } = await query(
    `
    DELETE FROM bed_groups
     WHERE id = $1
     RETURNING id;
    `,
    [groupId]
  );
  return rows.length > 0;
};

//
// BEDS
//

/**
 * Fetch all beds
 */
export const getBeds = async () => {
  const { rows } = await query(`
    SELECT
      b.id,
      b.bed_name,
      b.used,
      b.bed_type_id,
      bt.type_name AS bed_type,
      b.bed_group_id,
      bg.group_name AS bed_group,
      b.created_at,
      b.updated_at
    FROM beds b
    JOIN bed_types bt ON b.bed_type_id = bt.id
    JOIN bed_groups bg ON b.bed_group_id = bg.id
    ORDER BY bg.group_name, b.bed_name;
  `);
  return rows;
};

/**
 * Fetch one bed by ID
 */
export const viewBed = async (bedId) => {
  const { rows } = await query(
    `
    SELECT
      b.id,
      b.bed_name,
      b.used,
      b.bed_type_id,
      bt.type_name AS bed_type,
      b.bed_group_id,
      bg.group_name AS bed_group,
      b.created_at,
      b.updated_at
    FROM beds b
    JOIN bed_types bt ON b.bed_type_id = bt.id
    JOIN bed_groups bg ON b.bed_group_id = bg.id
    WHERE b.id = $1
    LIMIT 1;
    `,
    [bedId]
  );
  return rows[0] || null;
};

/**
 * Create a new bed
 */
export const createBed = async (bedData) => {
  const { bedName, used = false, bedTypeId, bedGroupId } = bedData;
  const { rows } = await query(
    `
    INSERT INTO beds (bed_name, used, bed_type_id, bed_group_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id, bed_name, used, bed_type_id, bed_group_id, created_at, updated_at;
    `,
    [bedName, used, bedTypeId, bedGroupId]
  );
  return rows[0];
};

/**
 * Update an existing bed
 */
export const updateBed = async (bedId, bedData) => {
  const { bedName, inUse, bedTypeId, bedGroupId } = bedData;
  const { rows } = await query(
    `
    UPDATE beds
       SET bed_name      = $1,
           used          = $2,
           bed_type_id   = $3,
           bed_group_id  = $4,
           updated_at    = now()
     WHERE id = $5
     RETURNING id, bed_name, used, bed_type_id, bed_group_id, created_at, updated_at;
    `,
    [bedName, inUse, bedTypeId, bedGroupId, bedId]
  );
  return rows[0] || null;
};

/**
 * Delete a bed
 */
export const deleteBed = async (bedId) => {
  const { rows } = await query(
    `
    DELETE FROM beds
     WHERE id = $1
     RETURNING id;
    `,
    [bedId]
  );
  return rows.length > 0;
};
