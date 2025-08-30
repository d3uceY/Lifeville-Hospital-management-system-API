import express from "express";
import * as statsController from "../controllers/statsController.js";

const router = express.Router();

router.get("/stats/patient-status-distribution", statsController.getPatientStatusDistribution);
router.get("/stats/staff-roles-distribution", statsController.getStaffRolesDistribution);
router.get("/stats/appointment-status-distribution", statsController.getAppointmentStatusDistribution);
router.get("/stats/appointments-today", statsController.getAppointmensToday);
router.get("/stats/lab-test-pending", statsController.getLabTestPending);

export default router;

