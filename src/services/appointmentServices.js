// import query connection
import { db } from "../../drizzle-db.js";
import { appointments, patients, users } from "../../drizzle/migrations/schema.js";
import { eq, ilike, desc, asc, count, or, sql } from "drizzle-orm";


export const getPaginatedAppointments = async (
  page = 1,
  pageSize = 10,
  searchTerm = ""
) => {

  try {
    const offset = (page - 1) * pageSize;
    const q = searchTerm.trim();
    const term = `%${q}%`;

    // 1. Build the base query for fetching the paginated data
    let dataQuery = db
      .select({
        ...appointments, // selects all columns from appointments
        patient_first_name: patients.first_name,
        patient_surname: patients.surname,
        hospital_number: patients.hospital_number,
        patient_phone_number: patients.phone_number,
        doctor_name: users.name,
      })
      .from(appointments)
      .leftJoin(patients, eq(appointments.patient_id, patients.patient_id))
      .leftJoin(users, eq(appointments.doctor_id, users.id));

    // 2. Build the base query for counting the total items
    let countQuery = db
      .select({ count: sql`count(*)` })
      .from(appointments)
      .leftJoin(patients, eq(appointments.patient_id, patients.patient_id))
      .leftJoin(users, eq(appointments.doctor_id, users.id));

    // 3. Apply the search filter to BOTH queries if a search term exists
    if (q) {
      const whereClause = or(
        ilike(patients.first_name, term),
        ilike(patients.surname, term),
        ilike(patients.hospital_number, term),
        ilike(users.name, term), // Search by doctor's name
        ilike(appointments.status, term) // Search by appointment status
      );
      dataQuery.where(whereClause);
      countQuery.where(whereClause);
    }

    // 4. Execute both queries
    const data = await dataQuery
      .orderBy(desc(appointments.created_at))
      .limit(pageSize)
      .offset(offset);

    const totalCountResult = await countQuery;
    const totalItems = Number(totalCountResult[0].count);

    // 5. Calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    // 6. Return the data in the specified structured format
    return {
      data,
      totalItems,
      totalPages,
      currentPage: page,
      pageSize,
      skipped: offset,
    };
  } catch (error) {
    console.error("Error fetching paginated appointments:", error);
    // Return a default structure on error to prevent frontend crashes
    return {
      data: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: page,
      pageSize,
      skipped: offset,
    };
  }
};


export const getAppointmentsByPatientId = async (patientId) => {
  try {
    const rows = await db
      .select({
        ...appointments, // selects all columns from appointments
        patient_first_name: patients.first_name,
        patient_surname: patients.surname,
        hospital_number: patients.hospital_number,
        patient_phone_number: patients.phone_number,
        doctor_name: users.name,
      })
      .from(appointments)
      .innerJoin(patients, eq(appointments.patient_id, patients.patient_id))
      .innerJoin(users, eq(appointments.doctor_id, users.id))
      .where(eq(appointments.patient_id, patientId))
      .orderBy(desc(appointments.created_at));
    return rows;
  } catch (error) {
    console.error(error);
    return null;
  }
};



// View a specific appointment
export const viewAppointment = async (appointmentId) => {
  const rows = await db
    .select()
    .from(appointments)
    .where(eq(appointments.appointment_id, appointmentId));
  return rows[0];
};

// Create a new appointment
export const createAppointment = async (appointmentData) => {
  const { patientId, doctorId, appointmentDate, notes } = appointmentData;

  const rows = await db.insert(appointments).values({
    patient_id: patientId,
    doctor_id: doctorId,
    appointment_date: appointmentDate,
    notes,
    status: "scheduled",
  }).returning();

  const patient = await db.select({
    first_name: patients.first_name,
    surname: patients.surname,
  }).from(patients).where(eq(patients.patient_id, rows[0].patient_id));

  const doctor = await db.select({
    name: users.name,
  }).from(users).where(eq(users.id, rows[0].doctor_id));

  return {
    ...rows[0],
    first_name: patient[0].first_name,
    surname: patient[0].surname,
    doctor_name: doctor[0].name,
  };
};

// Update an existing appointment
export const updateAppointment = async (appointment_id, appointmentData) => {
  const { patientId, doctorId, appointmentDate, notes, status } =
    appointmentData;

  const rows = await db.update(appointments)
    .set({
      patient_id: patientId,
      doctor_id: doctorId,
      appointment_date: appointmentDate,
      notes,
      status,
      updated_at: new Date(),
    })
    .where(eq(appointments.appointment_id, appointment_id))
    .returning();

  return rows[0];
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  const rows = await db.update(appointments)
    .set({
      status,
      updated_at: new Date(),
    })
    .where(eq(appointments.appointment_id, appointmentId))
    .returning();

  return rows[0];
};


// Delete an appointment
export const deleteAppointment = async (appointmentId) => {
  const rows = await db.delete(appointments)
    .where(eq(appointments.appointment_id, appointmentId))
    .returning();

  return rows[0];
};
