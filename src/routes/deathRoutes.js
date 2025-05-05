import express from "express";

import * as deathControllers from "../controllers/deathControllers.js";

const router = express.Router();

router.get("/deaths", deathControllers.getDeathRecords);
router.post("/deaths", deathControllers.createDeathRecord);
router.delete("/deaths/:id", deathControllers.deleteDeathRecord);
router.put("/deaths/:id", deathControllers.updateDeathRecord);

export default router;
