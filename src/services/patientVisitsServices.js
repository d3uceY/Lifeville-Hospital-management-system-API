import { db } from "../../drizzle-db.js";
import { patientVisits, patients, users } from "../../drizzle/migrations/schema.js";
import { eq, ilike, desc, asc, count, or, sql, and, between } from "drizzle-orm";

export const createPatientVisit = async (patientVisitData) => {
    const { patientId, doctorId, recordedBy, purpose } = patientVisitData;

    const [rows] = await db.insert(patientVisits).values({
        patient_id: patientId,
        doctor_id: doctorId,
        recorded_by: recordedBy,
        purpose,
        created_at: new Date(),
    }).returning();

    const patientData = await db.select({
        first_name: patients.first_name,
        surname: patients.surname,
    }).from(patients).where(eq(patients.patient_id, patientId));

    const [doctorData] = await db.select({
        name: users.name,
    }).from(users).where(eq(users.id, doctorId));
    return {
        ...rows,
        first_name: patientData[0].first_name,
        surname: patientData[0].surname,
        doctor_name: doctorData.name,
    };
};


export const getPaginatedPatientVisits = async (
    page = 1,
    pageSize = 10,
    { firstName, surname, phoneNumber, hospitalNumber, startDate, endDate } = {}
) => {
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);
    const offset = (pageNumber - 1) * pageSizeNumber;

    const normalize = (val) =>
        typeof val === "string" && val.trim() !== "" ? val.trim() : null;

    const filters = [];


    if (normalize(firstName)) {
        filters.push(ilike(patients.first_name, `%${normalize(firstName)}%`));
    }
    if (normalize(surname)) {
        filters.push(ilike(patients.surname, `%${normalize(surname)}%`));
    }
    if (normalize(phoneNumber)) {
        filters.push(ilike(patients.phone_number, `%${normalize(phoneNumber)}%`));
    }
    if (normalize(hospitalNumber)) {
        filters.push(ilike(patients.hospital_number, `%${normalize(hospitalNumber)}%`));
    }

    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (!isNaN(start) && !isNaN(end)) {
            filters.push(between(patientVisits.created_at, start, end));
        }
    }

    const where = filters.length > 0 ? and(...filters) : undefined;

    const [{ total }] = await db
        .select({ total: count() })
        .from(patientVisits)
        .leftJoin(patients, eq(patientVisits.patient_id, patients.patient_id))
        .where(where ?? sql`true`);

    const totalItems = Number(total);
    const totalPages = Math.ceil(totalItems / pageSizeNumber);

    const rows = await db
        .select({
            visitId: patientVisits.id,
            doctorId: patientVisits.doctor_id,
            patientId: patientVisits.patient_id,
            recordedBy: patientVisits.recorded_by,
            purpose: patientVisits.purpose,
            createdAt: patientVisits.created_at,
            firstName: patients.first_name,
            surname: patients.surname,
            otherNames: patients.other_names,
            phoneNumber: patients.phone_number,
            hospitalNumber: patients.hospital_number,
        })
        .from(patientVisits)
        .leftJoin(patients, eq(patientVisits.patient_id, patients.patient_id))
        .where(where ?? sql`true`)
        .orderBy(desc(patientVisits.created_at))
        .limit(pageSizeNumber)
        .offset(offset);

    const visits = rows.map((row) => ({
        id: row.visitId,
        doctor_id: row.doctorId,
        patient_id: row.patientId,
        surname: row.surname,
        first_name: row.firstName,
        other_names: row.otherNames,
        patient_name: `${row.firstName ?? ""} ${row.surname ?? ""}`.trim(),
        hospital_number: row.hospitalNumber,
        phone_number: row.phoneNumber,
        recorded_by: row.recordedBy,
        purpose: row.purpose,
        created_at: row.createdAt,
    }));

    return {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize,
        skipped: offset,
        data: visits,
    };
};


export const getPatientVisitsByPatientId = async (patientId) => {
    const rows = await db
        .select({
            ...patientVisits,
            patient_first_name: patients.first_name,
            patient_surname: patients.surname,
            hospital_number: patients.hospital_number,
            patient_phone_number: patients.phone_number,
            doctor_name: users.name,
        })
        .from(patientVisits)
        .innerJoin(patients, eq(patientVisits.patient_id, patients.patient_id))
        .leftJoin(users, eq(patientVisits.doctor_id, users.id))
        .where(eq(patientVisits.patient_id, patientId))
        .orderBy(desc(patientVisits.created_at));
    return rows;
};