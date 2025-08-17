import express from "express";
import * as nurseNoteController from "../controllers/nurseNoteControllers.js";

const router = express.Router();

router.get("/nurse-notes/patient/:patientId", nurseNoteController.getNurseNotesByPatientId);
router.post("/nurse-notes", nurseNoteController.createNurseNote);
router.put("/nurse-notes/:id", nurseNoteController.updateNurseNote);
router.delete("/nurse-notes/:id", nurseNoteController.deleteNurseNote);

export default router;
