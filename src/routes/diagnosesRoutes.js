import express from "express";
import { createDiagnosis, getDiagnosesByPatientId, getDiagnosisById, updateDiagnosis, deleteDiagnosis } from "../controllers/diagnosesController.js";

const router = express.Router();

router.post("/diagnoses", createDiagnosis);
router.get("/diagnoses/:patientId", getDiagnosesByPatientId);
router.get("/diagnoses/:diagnosisId", getDiagnosisById);
router.put("/diagnoses/:diagnosisId", updateDiagnosis);
router.delete("/diagnoses/:diagnosisId", deleteDiagnosis);

export default router;
