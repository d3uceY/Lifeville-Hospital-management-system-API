// routes/billRoutes.js

import express from "express";
import * as billControllers from "../controllers/billController.js";

const router = express.Router();

router.post("/bills", billControllers.createBill);
router.get("/bills", billControllers.getPaginatedBills);
router.get("/bills/:id", billControllers.getBillById);
router.put("/bills/:id", billControllers.updateBillPayment);
router.delete("/bills/:id", billControllers.deleteBill);

export default router;
