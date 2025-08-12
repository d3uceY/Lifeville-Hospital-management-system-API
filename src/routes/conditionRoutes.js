import express from "express";
import { createCondition, getConditions, deleteCondition, updateCondition } from "../controllers/conditionController.js";

const router = express.Router();

router.post("/conditions", createCondition);
router.get("/conditions", getConditions);
router.delete("/conditions/:id", deleteCondition);
router.put("/conditions/:id", updateCondition);

export default router;