import * as doctorNoteController from "../controllers/doctorNoteController.js";
import express from "express";

const router = express.Router();

router.get("/doctor-notes/patient/:patientId", doctorNoteController.getDoctorNotesByPatientId);
router.post("/doctor-notes", doctorNoteController.createDoctorNote);
router.put("/doctor-notes/:id", doctorNoteController.updateDoctorNote);
router.delete("/doctor-notes/:id", doctorNoteController.deleteDoctorNote);

export default router;