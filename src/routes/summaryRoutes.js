import express from "express";
import * as summaryController from "../controllers/summaryController.js";

const router = express.Router();

router.get("/admissions-summary/:patientId", summaryController.getAdmissionSummaryByPatientId);
router.get("/diagnosis-summary/:patientId", summaryController.getDiagnosisSummaryByPatientId);
router.get("/lab-test-summary/:patientId", summaryController.getLabTestSummaryByPatientId);
router.get("/vital-sign-summary/:patientId", summaryController.getVitalSignSummaryByPatientId);

export default router;
