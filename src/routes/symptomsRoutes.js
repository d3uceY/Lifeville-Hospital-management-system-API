import express from "express";
import * as symptomsController from "../controllers/symptomsControllers.js";

const router = express.Router();

// Symptom Types
router.get("/symptom-types", symptomsController.getSymptomTypes);
router.post("/symptom-types", symptomsController.createSymptomType);
router.put("/symptom-types/:id", symptomsController.updateSymptomType);
router.delete("/symptom-types/:id", symptomsController.deleteSymptomType);

// Symptom Heads
router.get("/symptom-heads", symptomsController.getSymptomHeads);
router.post("/symptom-heads", symptomsController.createSymptomHead);
router.put("/symptom-heads/:id", symptomsController.updateSymptomHead);
router.delete("/symptom-heads/:id", symptomsController.deleteSymptomHead);

export default router;
