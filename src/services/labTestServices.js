import { db } from "../../drizzle-db.js";
import { labTests, labTestTypes, patients } from "../../drizzle/migrations/schema.js";
import { eq, ilike, desc, asc, count, or, sql } from "drizzle-orm";

export const getLabTests = async () => {
  return db.select().from(labTests);
};

export const getLabTestsByPatientId = async (patientId) => {
  return db
    .select({
      ...labTests,
      first_name: patients.first_name,
      surname: patients.surname,
      hospital_number: patients.hospital_number,
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
    patient_id: labTest.patientId,
    test_type: labTest.testType,
    comments: labTest.comments,
    prescribed_by: labTest.prescribedBy,
    status: 'to do',
  }).returning();

  // get patient details for notification
  const patient = await db.select({
    first_name: patients.first_name,
    surname: patients.surname,
  }).from(patients).where(eq(patients.patient_id, labTest.patientId));

  return {
    ...newTest,
    first_name: patient[0].first_name,
    surname: patient[0].surname,
  };
};

export const updateLabTest = async (id, status, results) => {
  const [updated] = await db.update(labTests)
    .set({ status, results, updated_at: new Date() })
    .where(eq(labTests.id, id))
    .returning();

  return updated;
};






export const getPaginatedLabTests = async (
  page = 1,
  pageSize = 10,
  searchTerm = ""
) => {
  const offset = (page - 1) * pageSize;
  const q = searchTerm.trim();
  const term = `%${q}%`;

  // 1. Build the base query for fetching the data
  let dataQuery = db
    .select({
      lab_test_id: labTests.id,
      first_name: patients.first_name,
      surname: patients.surname,
      hospital_number: patients.hospital_number,
      ...labTests,
    })
    .from(labTests)
    .innerJoin(patients, eq(patients.patient_id, labTests.patient_id))
    .orderBy(desc(labTests.created_at));

  // 2. Build the base query for counting total items (must have the same joins and where clauses)
  let countQuery = db
    .select({ count: sql`count(*)` })
    .from(labTests)
    .innerJoin(patients, eq(patients.patient_id, labTests.patient_id));

  // 3. Apply the search filter to BOTH queries if a search term exists
  if (q) {
    const whereClause = or(
      ilike(patients.first_name, term),
      ilike(patients.surname, term),
      ilike(patients.hospital_number, term),
      ilike(labTests.test_type, term),
      ilike(labTests.status, term),
      ilike(sql`${labTests.prescribed_by}::text`, term),
      ilike(labTests.comments, term),
      ilike(sql`${labTests.results}::text`, term)
    );
    dataQuery.where(whereClause);
    countQuery.where(whereClause);
  }

  // 4. Execute both queries
  const data = await dataQuery.limit(pageSize).offset(offset);
  const totalCountResult = await countQuery;
  
  const totalItems = Number(totalCountResult[0].count);

  // 5. Calculate total pages
  const totalPages = Math.ceil(totalItems / pageSize);

  // 6. Return the data in the specified format
  return {
    data,
    totalItems,
    totalPages,
    currentPage: page,
    pageSize,
    skipped: offset,
  };
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
