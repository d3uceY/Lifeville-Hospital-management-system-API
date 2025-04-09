import * as deathServices from "../services/deathServices.js";

export const getDeathRecords = async (req, res) => {
  try {
    const deaths = await deathServices.getDeathRecords();
    res.status(200).json(deaths);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const createDeathRecord = async (req, res) => {
  try {
    const deathRecord = await deathServices.createDeathRecord(req.body);
    res.status(201).json({ deathRecord, message: "Submitted Successfully" });
  } catch (err) {
    if (err.code === "DUPLICATE_DEATH_RECORD") {
      return res.status(400).json({
        message: err.message, // Send custom error message to the frontend
      });
    }
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
