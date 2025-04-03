import * as doctorServices from "../services/doctorServices.js";

export const createDoctor = async (req, res) => {
  try {
    const doctor = await doctorServices.createDoctor(req.body);
    res.status(201).json({ doctor, message: "Submitted Successfully" });
  } catch (error) {
    res.status(500).json({ message: `internal server error ${error.message}` });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const doctors = await doctorServices.getDoctors();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: `internal server error ${error.message}` });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await doctorServices.deleteDoctor(req.params.id);
    res.status(200).json(doctor, "Doctor deleted successfully");
  } catch (error) {
    res.status(500).json({ message: `internal server error ${error.message}` });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const doctor = await doctorServices.updateDoctor(req.body);
    res.status(200).json({ doctor, message: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: `internal server error ${error.message}` });
  }
};

export const viewDoctor = async (req, res) => {
  try {
    const doctor = await doctorServices.viewDoctor(req.params.id);
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: `internal server error ${error.message}` });
  }
};
