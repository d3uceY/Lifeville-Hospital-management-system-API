import express from "express";

import * as doctorControllers from "../controllers/doctorControllers.js";

const router = express.Router();

router.get("doctors/", doctorControllers.getDoctors);
router.get("doctors/:id", doctorControllers.viewDoctor);
router.post("doctors/", doctorControllers.createDoctor);
router.put("doctors/", doctorControllers.updateDoctor);
router.delete("doctors/:id", doctorControllers.deleteDoctor);

export default router;
