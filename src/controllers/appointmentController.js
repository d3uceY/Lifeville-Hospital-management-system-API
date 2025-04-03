import * as appointmentService from "../services/appointmentServices.js";

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve appointments" });
  }
};

// View a single appointment
export const viewAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await appointmentService.viewAppointment(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve appointment" });
  }
};

// Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const appointmentData = req.body;
    const newAppointment = await appointmentService.createAppointment(appointmentData);
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create appointment" });
  }
};

// Update an appointment
export const updateAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const updateData = req.body;
    const updatedAppointment = await appointmentService.updateAppointment(appointmentId, updateData);

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update appointment" });
  }
};

// Delete an appointment
export const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const isDeleted = await appointmentService.deleteAppointment(appointmentId);

    if (!isDeleted) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete appointment" });
  }
};
