import express from "express";
import { createComplaint, getComplaints, getComplaintsByPatientId } from "../controllers/complaintsController.js";

const router = express.Router();

router.get("/complaints", getComplaints);
router.get("/complaints/:patientId", getComplaintsByPatientId);
router.post("/complaints", createComplaint);

export default router;