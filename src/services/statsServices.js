import { db } from "../../drizzle-db.js";
import { appointments, patients, users, labTests } from "../../drizzle/migrations/schema.js";
import { eq, ilike, desc, asc, count, or, sql } from "drizzle-orm";

export const getPatientStatusDistribution = async () => {
    const patientData = []

    const admittedCount = await db.select({ count: sql`count(*)` }).from(patients).where(eq(patients.patient_type, "INPATIENT"));
    patientData.push({ name: "Admitted", count: Number(admittedCount[0].count) });
    const dischargedCount = await db.select({ count: sql`count(*)` }).from(patients).where(eq(patients.patient_type, "OUTPATIENT"));
    patientData.push({ name: "Discharged", count: Number(dischargedCount[0].count) });

    return patientData
}

export const getStaffRolesDistribution = async () => {
    const staffRolesData = []

    const doctorCount = await db.select({ count: sql`count(*)` }).from(users).where(eq(users.role, "doctor"));
    staffRolesData.push({ name: "Doctors", count: Number(doctorCount[0].count) });

    const nurseCount = await db.select({ count: sql`count(*)` }).from(users).where(eq(users.role, "nurse"));
    staffRolesData.push({ name: "Nurses", count: Number(nurseCount[0].count) });

    const receptionistCount = await db.select({ count: sql`count(*)` }).from(users).where(eq(users.role, "receptionist"));
    staffRolesData.push({ name: "Receptionist", count: Number(receptionistCount[0].count) });

    const labTechnicianCount = await db.select({ count: sql`count(*)` }).from(users).where(eq(users.role, "lab"));
    staffRolesData.push({ name: "Lab Technician", count: Number(labTechnicianCount[0].count) });

    const accountantCount = await db.select({ count: sql`count(*)` }).from(users).where(eq(users.role, "accountant"));
    staffRolesData.push({ name: "Accountant", count: Number(accountantCount[0].count) });

    const superadminCount = await db.select({ count: sql`count(*)` }).from(users).where(eq(users.role, "superadmin"));
    staffRolesData.push({ name: "Super Admin", count: Number(superadminCount[0].count) });

    return staffRolesData
}


export const getAppointmentStatusDistribution = async () => {
    const appointmentData = []

    const scheduledCount = await db.select({ count: sql`count(*)` }).from(appointments).where(eq(appointments.status, "scheduled"));
    appointmentData.push({ name: "Scheduled", count: Number(scheduledCount[0].count) });

    const completedCount = await db.select({ count: sql`count(*)` }).from(appointments).where(eq(appointments.status, "completed"));
    appointmentData.push({ name: "Completed", count: Number(completedCount[0].count) });

    const cancelledCount = await db.select({ count: sql`count(*)` }).from(appointments).where(eq(appointments.status, "canceled"));
    appointmentData.push({ name: "Cancelled", count: Number(cancelledCount[0].count) });

    const confirmedCount = await db.select({ count: sql`count(*)` }).from(appointments).where(eq(appointments.status, "confirmed"));
    appointmentData.push({ name: "Confirmed", count: Number(confirmedCount[0].count) });

    const pendingCount = await db.select({ count: sql`count(*)` }).from(appointments).where(eq(appointments.status, "pending"));
    appointmentData.push({ name: "Pending", count: Number(pendingCount[0].count) });

    return appointmentData
}

export const getAppointmensToday = async () => {
    const [{ count: todayCount }] = await db
        .select({ count: sql`count(*)`.mapWith(Number) })
        .from(appointments)
        .where(
            sql`${appointments.appointment_date} >= CURRENT_DATE
        AND ${appointments.appointment_date} < CURRENT_DATE + INTERVAL '1 day'`
        );

    return todayCount;
}

export const getLabTestPending = async () => {
    const labTestPendingData = []

    const pendingCount = await db.select({ count: sql`count(*)` }).from(labTests).where(eq(labTests.status, "to do"));
    labTestPendingData.push({ name: "to do", count: Number(pendingCount[0].count) });

    return labTestPendingData
}