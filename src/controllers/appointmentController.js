import * as appointmentService from "../services/appointmentServices.js";

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const { page, pageSize, searchTerm } = req.query;
    const appointments = await appointmentService.getPaginatedAppointments(page, pageSize, searchTerm);
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
    const newAppointment = await appointmentService.createAppointment(
      appointmentData
    );

    // Grab the io instance and broadcast
    const io = req.app.get("socketio");
    io.emit("newAppointment", newAppointment);

    res
      .status(201)
      .json({ newAppointment, message: "Appointment created successfully" });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: "Failed to create appointment", error: error.message });
  }
};

export const getAppointmentsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await appointmentService.getAppointmentsByPatientId(patientId);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve appointments" });
  }
};

// Update an appointment
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedAppointment = await appointmentService.updateAppointment(
      id,
      updateData
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({
      updatedAppointment,
      message: "Appointment updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update appointment" });
  }
};

export const updateAppointmentStatusController = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const { status } = req.body;

    const updatedAppointment = await appointmentService.updateAppointmentStatus(
      appointment_id,
      status
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({
      updatedAppointment,
      message: "Appointment status updated successfully",
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({
      error: "Failed to update appointment status",
      message: error.message,
    });
  }
};

// Delete an appointment
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const isDeleted = await appointmentService.deleteAppointment(id);

    if (!isDeleted) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete appointment" });
  }
};
