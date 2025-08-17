import * as nurseNoteServices from "../services/nurseNoteServices.js"; 

// Get nurse's notes by patient ID
export const getNurseNotesByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const notes = await nurseNoteServices.getNurseNotesByPatientId(patientId);

    res.json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.error("Error fetching nurse notes:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create a new nurse's note
export const createNurseNote = async (req, res) => {
  try {
    const { patientId, note, recordedBy } = req.body;
    const newNote = await nurseNoteServices.createNurseNote({
      patientId,
      note,
      recordedBy,
    });

    res.json({
      success: true,
      data: newNote,
    });
  } catch (error) {
    console.error("Error creating nurse note:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update a nurse's note
export const updateNurseNote = async (req, res) => {
  try {
    const { id } = req.params; // note ID
    const { updatedBy, note } = req.body;

    const updatedNote = await nurseNoteServices.updateNurseNote(
      id,
      updatedBy,
      note
    );

    res.json({
      success: true,
      data: updatedNote,
    });
  } catch (error) {
    console.error("Error updating nurse note:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a nurse's note
export const deleteNurseNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await nurseNoteServices.deleteNurseNote(id);

    res.json({
      success: true,
      data: deletedNote,
    });
  } catch (error) {
    console.error("Error deleting nurse note:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
