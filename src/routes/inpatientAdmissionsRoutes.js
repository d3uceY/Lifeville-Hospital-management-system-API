// routes/inpatientAdmissionsRoutes.js

import express from "express";
import * as inpatientControllers from "../controllers/inpatientAdmissionsController.js";

const router = express.Router();

/**
 * GET   /inpatients      → list all admissions
 * POST  /inpatients      → create a new admission
 * GET   /inpatients/:id  → view one admission
 * PUT   /inpatients/:id  → update an admission
 * DELETE /inpatients/:id → delete an admission
 */
router.get("/inpatients", inpatientControllers.getInpatientAdmissions);
router.post("/inpatients", inpatientControllers.createInpatientAdmission);
router.get("/inpatients/:id", inpatientControllers.viewInpatientAdmission);
router.put("/inpatients/:id", inpatientControllers.updateInpatientAdmission);
router.delete("/inpatients/:id", inpatientControllers.deleteInpatientAdmission);

export default router;
