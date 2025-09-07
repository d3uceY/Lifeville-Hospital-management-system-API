import express from "express";
import * as patientVisitsController from "../controllers/patientVisitsController.js";

const router = express.Router();

router.post("/patient-visits", patientVisitsController.createPatientVisit);
router.get("/patient-visits/paginated", patientVisitsController.getPaginatedPatientVisits);
router.get("/patient-visits/:patientId/patient", patientVisitsController.getPatientVisitsByPatientId);

export default router;
