import { query } from "../db.js";

export const createVitalSign = async (vitalSignData) => {
  const {
    date,                      // to be stored in the "recorded_at" column
    patientId,                 // to be stored in the "patient_id" column
    temperature,               // to be stored in the "temperature" column (numeric)
    systolicBloodPressure,     // to be stored in the "blood_pressure_systolic" column (integer)
    diastolicBloodPressure,    // to be stored in the "blood_pressure_diastolic" column (integer)
    weight,                    // to be stored in the "weight" column (numeric)
    heartRate,                 // to be stored in the "pulse_rate" column (integer)
    spo2,     
    recordedBy,      // to be stored in the "recorded_by" column (integer)
  } = vitalSignData;

  const result = await query(
    `INSERT INTO vital_signs (
       patient_id, recorded_at, temperature, 
       blood_pressure_systolic, blood_pressure_diastolic, 
       weight, pulse_rate, spo2, recorded_by, created_at
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) 
     RETURNING *;`,
    [patientId, date, temperature, systolicBloodPressure, diastolicBloodPressure, weight, heartRate, spo2, recordedBy]
  );

  return result.rows[0];
};
