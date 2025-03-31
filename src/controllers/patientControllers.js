import * as patientServices from "../services/patientServices.js";

export const getPatients = async (req, res) => {
  try {
    const patients = await patientServices.getPatients();
    res.status(200).json(patients);
  } catch (err) {
    console.error("error fetching patients:", err);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const createPatients = async (req, res) => {
  try {
    const patientData = req.body;
    const newPatient = await patientServices.createPatient(patientData);
    res.status(200).json({ newPatient, message: "Submitted Successfully" });
  } catch (err) {
    console.error("error fetching Patients:", err);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const viewPatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await patientServices.viewPatient(patientId);
    res.status(200).json(patient);
  } catch (err) {
    console.error("error fetching patient:", err);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
