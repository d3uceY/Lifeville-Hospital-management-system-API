import * as deathServices from "../services/deathServices.js";

export const getDeaths = async (req, res) => {
  try {
    const deaths = await deathServices.getDeaths();
    res.status(200).json(deaths);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
