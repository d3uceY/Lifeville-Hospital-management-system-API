import * as doctorNoteServices from "../services/doctorNoteServices.js";

// Get doctor's notes by patient ID
export const getDoctorNotesByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const notes = await doctorNoteServices.getDoctorNotesByPatientId(patientId);

    res.json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.error("Error fetching doctor notes:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create a new doctor's note
export const createDoctorNote = async (req, res) => {
  try {
    const { patientId, note, recordedBy } = req.body;
    const newNote = await doctorNoteServices.createDoctorNote({
      patientId,
      note,
      recordedBy,
    });

    res.json({
      success: true,
      data: newNote,
    });
  } catch (error) {
    console.error("Error creating doctor note:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update a doctor's note
export const updateDoctorNote = async (req, res) => {
  try {
    const { id } = req.params; // note ID
    const { updatedBy, note } = req.body;

    const updatedNote = await doctorNoteServices.updateDoctorNote(
      id,
      updatedBy,
      note
    );

    res.json({
      success: true,
      data: updatedNote,
    });
  } catch (error) {
    console.error("Error updating doctor note:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a doctor's note
export const deleteDoctorNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await doctorNoteServices.deleteDoctorNote(id);

    res.json({
      success: true,
      data: deletedNote,
    });
  } catch (error) {
    console.error("Error deleting doctor note:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
