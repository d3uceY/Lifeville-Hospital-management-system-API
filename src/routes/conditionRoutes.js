import express from "express";
import { createCondition, getConditions, deleteCondition } from "../controllers/conditionController.js";

const router = express.Router();

router.post("/conditions", createCondition);
router.get("/conditions", getConditions);
router.delete("/conditions/:id", deleteCondition);

export default router;