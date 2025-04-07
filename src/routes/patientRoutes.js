import express from "express";

import * as patientController from "../controllers/patientControllers.js";

const router = express.Router();

router.get("/patients", patientController.getPatients);

router.get("/patients/:id", patientController.viewPatient);

// router.get("/patients/search", patientController.searchPatients);

router.post("/patients", patientController.createPatients);

router.put("/patients/:id", patientController.updatePatient);

// router.delete("/patients/:id", patientController.deletePatients);

export default router;
