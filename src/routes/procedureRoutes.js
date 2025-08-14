import * as procedureController from "../controllers/procedureController.js";
import express from "express";

const router = express.Router();

router.post("/procedures", procedureController.addProcedureController);
router.get("/procedures/:patient_id", procedureController.getProceduresByPatientIdController);

export default router;
