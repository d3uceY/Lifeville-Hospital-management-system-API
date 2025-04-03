import express from "express";

import * as appointmentController from "../controllers/appointmentController.js";

const routes = express.Router();

routes.get("/appointments", appointmentController.getAppointments);
routes.get("/appointments/:id", appointmentController.viewAppointment);
routes.post("/appointments", appointmentController.createAppointment);
routes.put("/appointments/:id", appointmentController.updateAppointment);
routes.delete("/appointments/:id", appointmentController.deleteAppointment);

export default routes;