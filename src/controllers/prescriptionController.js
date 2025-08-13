import * as prescriptionServices from '../services/prescriptionServices'

export const createPrescriptionController = async (req, res) => {
    try {
        const prescription = await prescriptionServices.createPrescription(req.body);
        res.status(201).json(prescription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getPrescriptionsController = async (req, res) => {
    try {
        const prescriptions = await prescriptionServices.getPrescriptions(req.params.patient_id);
        res.json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
