import express from "express";

import * as deathControllers from "../controllers/deathControllers.js";

const router = express.Router();

router.get("/deaths", deathControllers.getDeathRecords);
// router.get("/deaths/:id", deathControllers.viewDeath);
router.post("/deaths", deathControllers.createDeathRecord);
// router.put("/deaths", deathControllers.updateDeath);
router.delete("/deaths/:id", deathControllers.deleteDeathRecord);

router.put("/deaths/:id", deathControllers.updateDeathRecord);

export default router;
