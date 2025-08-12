import * as physicalExaminationsServices from "../services/physicalExaminationsServices.js";

export const createPhysicalExamination = async (req, res) => {
  try {
    const physicalExamination = await physicalExaminationsServices.createPhysicalExamination(req.body);
    res.status(200).json({ physicalExamination, message: "Submitted Successfully" });
  } catch (err) {
    console.error("error creating physical examination:", err);
    res.status(500).json({ message: "internal server error" });
  }
};

export const getPhysicalExaminationsByPatientId = async (req, res) => {
  try {
    const physicalExaminations = await physicalExaminationsServices.getPhysicalExaminationsByPatientId(req.params.patientId);
    res.status(200).json(physicalExaminations);
  } catch (err) {
    console.error("error fetching physical examinations:", err);
    res.status(500).json({ message: "internal server error" });
  }
};

