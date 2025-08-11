import express from "express";

import * as vitalSignsController from "../controllers/vitalSignsController.js";

const router = express.Router();


router.get("/vital-signs/patient/:patientId", vitalSignsController.getVitalSignsByPatientId);
router.post("/vital-signs", vitalSignsController.createVitalSign);

// router.put("/vital-signs/:id", vitalSignsController.updateVitalSign);

// router.delete("/patients/:id", patientController.deletePatients);

export default router;
