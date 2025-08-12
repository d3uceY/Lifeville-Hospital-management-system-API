import express from "express";
import { createPhysicalExamination, getPhysicalExaminationsByPatientId } from "../controllers/physicalExaminationsControllers.js";

const router = express.Router();

router.post("/physical-examinations", createPhysicalExamination);
router.get("/physical-examinations/patient/:patientId", getPhysicalExaminationsByPatientId);


export default router;