import express from "express";

import * as birthControllers from "../controllers/birthControllers.js";

const router = express.Router();

router.get("/births", birthControllers.getBirthRecords);
router.post("/births", birthControllers.createBirthRecord);
router.put("/births/:id", birthControllers.updateBirthRecord);
router.delete("/births/:id", birthControllers.deleteBirthRecord);

export default router;
