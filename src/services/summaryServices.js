import { db } from "../../drizzle-db.js";
import { diagnoses, labTests, vitalSigns, inpatientAdmissions, users } from "../../drizzle/migrations/schema.js";
import { eq, desc } from "drizzle-orm";


export const getAdmissionSummaryByPatientId = async (patientId) => {
    const result = await db.select({
        admission_date: inpatientAdmissions.created_at,
        consultant_doctor_name: users.name,
        discharge_condition: inpatientAdmissions.discharge_condition,
    }).from(inpatientAdmissions)
        .innerJoin(users, eq(inpatientAdmissions.consultant_doctor_id, users.id))
        .where(eq(inpatientAdmissions.patient_id, patientId))
        .orderBy(desc(inpatientAdmissions.created_at))
        .limit(8);

    return result;
}

export const getDiagnosisSummaryByPatientId = async (patientId) => {

    const result = await db.select({
        diagnosis_date: diagnoses.diagnosis_date,
        consultant_doctor_name: diagnoses.recorded_by,
        condition: diagnoses.condition,
    }).from(diagnoses)
        .where(eq(diagnoses.patient_id, patientId))
        .orderBy(desc(diagnoses.diagnosis_date))
        .limit(8);
    return result;
}

export const getLabTestSummaryByPatientId = async (patientId) => {
    const result = await db.select({
        test_date: labTests.created_at,
        consultant_doctor_name: labTests.prescribed_by,
        test_type: labTests.test_type,
        status: labTests.status,
    }).from(labTests)
        .where(eq(labTests.patient_id, patientId))
        .orderBy(desc(labTests.created_at))
        .limit(8);
    return result;
}

export const getVitalSignSummaryByPatientId = async (patientId) => {
    const result = await db.select({
        recorded_at: vitalSigns.recorded_at,
        recorded_by: vitalSigns.recorded_by,
    })
        .from(vitalSigns)
        .where(eq(vitalSigns.patient_id, patientId))
        .orderBy(desc(vitalSigns.created_at))
        .limit(3);

    return result;
}