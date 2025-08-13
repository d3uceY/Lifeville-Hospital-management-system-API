import express from 'express';
import { createPrescriptionController, getPrescriptionsController } from '../controllers/prescriptionController.js';

const router = express.Router();

router.post('/prescriptions', createPrescriptionController);
router.get('/prescriptions/:patient_id', getPrescriptionsController);

export default router;