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

    if (!newPatient) {
      return res.status(400).json({
        message: "Failed to create patient",
      });
    }
    
    // emit notification
    const io = req.app.get("socketio");
    io.emit("notification", {
      message: "New Patient Added",
      description: `${newPatient.first_name} ${newPatient.surname}`
    });

    res.status(200).json({ newPatient, message: "Submitted Successfully" });
  } catch (err) {
  
    if (err.code === "DUPLICATE_HOSPITAL_NUMBER") {
      return res.status(400).json({
        message: err.message, 
      });
    }

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
      err,
    });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patientData = req.body;
    const updatedPatient = await patientServices.updatePatient(
      patientId,
      patientData
    );
    res.status(200).json({ updatedPatient, message: "Updated Successfully" });
  } catch (err) {
    console.error("this is za error", err.code);
    // Check if the error is related to duplicate id
    if (err.code === "PATIENT_NOT_FOUND") {
      return res.status(404).json({
        message: err.message, // Send custom error message to the frontend
      });
    }

    if (err?.code === "23505") {
      return res.status(404).json({
        message: err.detail,
      });
    }

    res.status(500).json({
      message: "internal server error",
      err,
    });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const deletedPatient = await patientServices.deletePatient(patientId);
    res.status(200).json({ deletedPatient, message: "Deleted Successfully" });
  } catch (err) {
    console.error("error deleting patient:", err);
    res.status(500).json({
      message: "internal server error",
      err,
    });
  }
};
