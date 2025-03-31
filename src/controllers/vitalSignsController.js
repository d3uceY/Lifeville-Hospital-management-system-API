import * as vitalSignsServices from "../services/vitalSignsServices.js";

export const createVitalSign = async (req, res) => {
  try {
    const vitalSignData = req.body;
    const createdVitalSign = await vitalSignsServices.createVitalSign(
      vitalSignData
    );
    res
      .status(200)
      .json({ createdVitalSign, message: "Submitted Successfully" });
    console.table(createdVitalSign);
  } catch (err) {
    console.error("error creating vital sign:", err);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
