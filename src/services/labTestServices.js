import { db } from "../../drizzle-db.js";
import { labTests, labTestTypes, patients } from "../../drizzle/migrations/schema.js";
import { eq, ilike, desc, asc, count } from "drizzle-orm";

export const getLabTests = async () => {
  return db.select().from(labTests);
};

export const getLabTestsByPatientId = async (patientId) => {
  return db
    .select({
      ...labTests,
      first_name: patients.first_name,
      surname: patients.surname,
    })
    .from(labTests)
    .innerJoin(patients, eq(patients.patient_id, labTests.patient_id))
    .where(eq(labTests.patient_id, patientId))
    .orderBy(desc(labTests.created_at));
};

export const getLabTestById = async (id) => {
  return db
    .select()
    .from(labTests)
    .where(eq(labTests.id, id))
    .then(res => res[0]);
};

export const createLabTest = async (labTest) => {
  const [newTest] = await db.insert(labTests).values({
    patient_id: labTest.patient_id,
    test_type: labTest.test_type,
    comments: labTest.comments,
    prescribed_by: labTest.prescribed_by,
    status: 'to do',
  }).returning();

  return newTest;
};

export const updateLabTest = async (id, status, results) => {
  console.log(id, status, results);
  const [updated] = await db.update(labTests)
    .set({ status, results, updated_at: new Date() })
    .where(eq(labTests.id, id))
    .returning();

  return updated;
};

export const getPaginatedLabTests = async (page = 1, pageSize = 10, searchTerm = "") => {
  const offset = (page - 1) * pageSize;

  let queryBuilder = db
    .select({
      ...labTests,
      lab_test_id: labTests.id,
      first_name: patients.first_name,
      surname: patients.surname,
      hospital_number: patients.hospital_number,
    })
    .from(labTests)
    .innerJoin(patients, eq(patients.patient_id, labTests.patient_id))
    .orderBy(desc(labTests.created_at))
    .limit(pageSize)
    .offset(offset);

  if (searchTerm) {
    queryBuilder = queryBuilder.where(
      ilike(patients.first_name, `%${searchTerm}%`)
        .or(ilike(patients.surname, `%${searchTerm}%`))
        .or(ilike(patients.hospital_number, `%${searchTerm}%`))
        .or(ilike(labTests.test_type, `%${searchTerm}%`))
        .or(ilike(labTests.status, `%${searchTerm}%`))
        .or(ilike(labTests.prescribed_by, `%${searchTerm}%`))
        .or(ilike(labTests.comments, `%${searchTerm}%`))
        .or(ilike(labTests.results, `%${searchTerm}%`))
    );
  }

  const [data, totalResult] = await Promise.all([
    queryBuilder,
    db
      .select({ total: count() })
      .from(labTests)
      .innerJoin(patients, eq(patients.patient_id, labTests.patient_id))
      .where(searchTerm ? ilike(patients.first_name, `%${searchTerm}%`) : undefined)
  ]);

  const totalItems = parseInt(totalResult[0]?.total || 0, 10);
  const totalPages = Math.ceil(totalItems / pageSize);

  return { totalItems, totalPages, currentPage: page, pageSize, skipped: offset, data };
};

// Lab Test Types
export const getLabTestTypes = async () => db.select().from(labTestTypes);

export const createLabTestType = async (labTestType) => {
  const [newType] = await db.insert(labTestTypes).values(labTestType).returning();
  return newType;
};

export const updateLabTestType = async (id, labTestType) => {
  const [updated] = await db.update(labTestTypes)
    .set(labTestType)
    .where(eq(labTestTypes.id, id))
    .returning();

  return updated;
};

export const deleteLabTestType = async (id) => {
  const [deleted] = await db.delete(labTestTypes)
    .where(eq(labTestTypes.id, id))
    .returning();

  return deleted;
};
