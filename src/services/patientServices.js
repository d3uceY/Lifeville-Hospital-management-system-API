// import query connection
import { query } from "../db.js";

export const getPatients = async () => {
  const { rows } = await query("SELECT * FROM patients");
  return rows;
};

export const createPatient = async (patientData) => {
  const {
    date,
    hospitalNumber, // corresponds to hospital_number
    surname,
    firstName, // corresponds to first_name
    otherNames, // corresponds to other_names
    sex,
    maritalStatus, // corresponds to marital_status
    dateOfBirth, // corresponds to date_of_birth
    phoneNumber, // corresponds to phone_number
    address,
    occupation,
    placeOfWorkAddress, // corresponds to place_of_work_address
    religion,
    nationality,
    nextOfKin, // corresponds to next_of_kin
    relationship,
    nextOfKinPhoneNumber, // corresponds to next_of_kin_phone
    addressOfNextOfKin, // corresponds to next_of_kin_address
    pastMedicalHistory, // corresponds to past_medical_history
    pastSurgicalHistory, // corresponds to past_surgical_history
    familyHistory, // corresponds to family_history
    socialHistory, // corresponds to social_history
    drugHistory, // corresponds to drug_history
    allergies,
    dietaryRestrictions, // corresponds to dietary_restrictions
    dietAllergies, // corresponds to diet_allergies_to_drugs
  } = patientData;

  const { rows } = await query(
    `INSERT INTO patients (
        date,
        hospital_number,
        surname,
        first_name,
        other_names,
        sex,
        marital_status,
        date_of_birth,
        phone_number,
        address,
        occupation,
        place_of_work_address,
        religion,
        nationality,
        next_of_kin,
        relationship,
        next_of_kin_phone,
        next_of_kin_address,
        past_medical_history,
        past_surgical_history,
        family_history,
        social_history,
        drug_history,
        allergies,
        dietary_restrictions,
        diet_allergies_to_drugs
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19,
        $20, $21, $22, $23, $24, $25, $26
    ) RETURNING *`,
    [
      date,
      hospitalNumber,
      surname,
      firstName,
      otherNames,
      sex,
      maritalStatus,
      dateOfBirth,
      phoneNumber,
      address,
      occupation,
      placeOfWorkAddress,
      religion,
      nationality,
      nextOfKin,
      relationship,
      nextOfKinPhoneNumber,
      addressOfNextOfKin,
      pastMedicalHistory,
      pastSurgicalHistory,
      familyHistory,
      socialHistory,
      drugHistory,
      allergies,
      dietaryRestrictions,
      dietAllergies,
    ]
  );

  return rows[0];
};

export const viewPatient = async (patientId) => {
  const { rows } = await query(`SELECT * FROM patients WHERE patient_id = $1`, [
    patientId,
  ]);
  return rows[0];
};


