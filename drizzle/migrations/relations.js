import { relations } from "drizzle-orm/relations";
import { patients, deathRecords, bills, billItems, physicalExaminations, symptomTypes, symptomHeads, labTests, appointments, inpatientAdmissions, doctors, complaints, prescriptions, prescriptionItems, diagnoses, bedTypes, beds, bedGroups, users, procedures, doctorsNotes, nursesNotes } from "./schema";

export const deathRecordsRelations = relations(deathRecords, ({one}) => ({
	patient: one(patients, {
		fields: [deathRecords.patientId],
		references: [patients.patientId]
	}),
}));

export const patientsRelations = relations(patients, ({many}) => ({
	deathRecords: many(deathRecords),
	physicalExaminations: many(physicalExaminations),
	labTests: many(labTests),
	appointments: many(appointments),
	inpatientAdmissions: many(inpatientAdmissions),
	complaints: many(complaints),
	prescriptions: many(prescriptions),
	diagnoses: many(diagnoses),
	procedures: many(procedures),
	doctorsNotes: many(doctorsNotes),
	nursesNotes: many(nursesNotes),
}));

export const billItemsRelations = relations(billItems, ({one}) => ({
	bill: one(bills, {
		fields: [billItems.billId],
		references: [bills.id]
	}),
}));

export const billsRelations = relations(bills, ({many}) => ({
	billItems: many(billItems),
}));

export const physicalExaminationsRelations = relations(physicalExaminations, ({one}) => ({
	patient: one(patients, {
		fields: [physicalExaminations.patientId],
		references: [patients.patientId]
	}),
}));

export const symptomHeadsRelations = relations(symptomHeads, ({one}) => ({
	symptomType: one(symptomTypes, {
		fields: [symptomHeads.symptomTypeId],
		references: [symptomTypes.symptomTypeId]
	}),
}));

export const symptomTypesRelations = relations(symptomTypes, ({many}) => ({
	symptomHeads: many(symptomHeads),
}));

export const labTestsRelations = relations(labTests, ({one}) => ({
	patient: one(patients, {
		fields: [labTests.patientId],
		references: [patients.patientId]
	}),
}));

export const appointmentsRelations = relations(appointments, ({one}) => ({
	patient: one(patients, {
		fields: [appointments.patientId],
		references: [patients.patientId]
	}),
}));

export const inpatientAdmissionsRelations = relations(inpatientAdmissions, ({one}) => ({
	patient: one(patients, {
		fields: [inpatientAdmissions.patientId],
		references: [patients.patientId]
	}),
	doctor: one(doctors, {
		fields: [inpatientAdmissions.consultantDoctorId],
		references: [doctors.doctorId]
	}),
}));

export const doctorsRelations = relations(doctors, ({many}) => ({
	inpatientAdmissions: many(inpatientAdmissions),
}));

export const complaintsRelations = relations(complaints, ({one}) => ({
	patient: one(patients, {
		fields: [complaints.patientId],
		references: [patients.patientId]
	}),
}));

export const prescriptionsRelations = relations(prescriptions, ({one, many}) => ({
	patient: one(patients, {
		fields: [prescriptions.patientId],
		references: [patients.patientId]
	}),
	prescriptionItems: many(prescriptionItems),
}));

export const prescriptionItemsRelations = relations(prescriptionItems, ({one}) => ({
	prescription: one(prescriptions, {
		fields: [prescriptionItems.prescriptionId],
		references: [prescriptions.prescriptionId]
	}),
}));

export const diagnosesRelations = relations(diagnoses, ({one}) => ({
	patient: one(patients, {
		fields: [diagnoses.patientId],
		references: [patients.patientId]
	}),
}));

export const bedsRelations = relations(beds, ({one}) => ({
	bedType: one(bedTypes, {
		fields: [beds.bedTypeId],
		references: [bedTypes.id]
	}),
	bedGroup: one(bedGroups, {
		fields: [beds.bedGroupId],
		references: [bedGroups.id]
	}),
}));

export const bedTypesRelations = relations(bedTypes, ({many}) => ({
	beds: many(beds),
}));

export const bedGroupsRelations = relations(bedGroups, ({many}) => ({
	beds: many(beds),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	user: one(users, {
		fields: [users.createdBy],
		references: [users.id],
		relationName: "users_createdBy_users_id"
	}),
	users: many(users, {
		relationName: "users_createdBy_users_id"
	}),
}));

export const proceduresRelations = relations(procedures, ({one}) => ({
	patient: one(patients, {
		fields: [procedures.patientId],
		references: [patients.patientId]
	}),
}));

export const doctorsNotesRelations = relations(doctorsNotes, ({one}) => ({
	patient: one(patients, {
		fields: [doctorsNotes.patientId],
		references: [patients.patientId]
	}),
}));

export const nursesNotesRelations = relations(nursesNotes, ({one}) => ({
	patient: one(patients, {
		fields: [nursesNotes.patientId],
		references: [patients.patientId]
	}),
}));