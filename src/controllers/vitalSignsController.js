import * as vitalSignServices from '../services/vitalSignServices.js';

export const createVitalSign = async (req, res) => {
  try {
    const vitalSignData = req.body;
    const createdVitalSign = await vitalSignServices.createVitalSign(
      vitalSignData
    );
    res
      .status(200)
      .json({ createdVitalSign, message: "Submitted Successfully" });
  } catch (err) {
    console.error("error creating vital sign:", err);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const getVitalSignsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const vitalSigns = await vitalSignServices.getVitalSignsByPatientId(
      patientId
    );
    res.status(200).json({ vitalSigns });
  } catch (err) {
    console.error("error getting vital signs:", err);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const updateVitalSign = async (req, res) => {
  try {
    const { vitalSignId } = req.params;
    const response = await vitalSignServices.updateVitalSign(req.body, vitalSignId)
    res.status(200).json({ response })
  } catch (err) {
    console.error("error updating vital sign:", err);
    res.status(500).json({
      message: "internal server error",
    });
  }
}