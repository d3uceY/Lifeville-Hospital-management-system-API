// routes/inpatientAdmissionsRoutes.js

import express from "express";
import * as inpatientControllers from "../controllers/inpatientAdmissionsController.js";
import { authenticate } from "../middleware/auth.js";
const router = express.Router();

/**
 * GET   /inpatients      → list all admissions
 * POST  /inpatients      → create a new admission
 * GET   /inpatients/:id  → view one admission
 * PUT   /inpatients/:id  → update an admission
 * DELETE /inpatients/:id → delete an admission
 */

router.get("/inpatients", authenticate, inpatientControllers.getInpatientAdmissions);
router.post("/inpatients", inpatientControllers.createInpatientAdmission);
router.get("/inpatients/:id", inpatientControllers.viewInpatientAdmission);
router.put("/inpatients/:id", inpatientControllers.updateInpatientAdmission);
router.delete("/inpatients/:id", inpatientControllers.deleteInpatientAdmission);
router.get("/inpatients/:patientId/admissions", inpatientControllers.getInpatientAdmissionsByPatientId);
router.post("/inpatients/:id/discharge", inpatientControllers.dischargeInpatientAdmission);
router.get("/inpatients/:id/discharge-summary", inpatientControllers.getDischargeSummaryByAdmissionId);

export default router;
