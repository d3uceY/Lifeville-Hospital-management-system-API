import express from 'express';
import { createPrescriptionController, getPrescriptionsController, deletePrescriptionController, updatePrescriptionStatusController } from '../controllers/prescriptionController.js';

const router = express.Router();

router.post('/prescriptions', createPrescriptionController);
router.get('/prescriptions/:patient_id', getPrescriptionsController);
router.delete('/prescriptions/:id', deletePrescriptionController);
router.put('/prescriptions/:id', updatePrescriptionStatusController);

export default router;