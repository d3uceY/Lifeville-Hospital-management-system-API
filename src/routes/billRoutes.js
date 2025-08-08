// routes/bedRoutes.js

import express from "express";
import * as billControllers from "../controllers/billController.js";

const router = express.Router();

// Bed Types
// router.get("/bills", bedControllers.getBedTypes);   
router.post("/bills", billControllers.createBill);
// router.put("/bills/:id", bedControllers.updateBedType);
// router.delete("/bills/:id", bedControllers.deleteBedType);


export default router;
