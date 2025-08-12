import * as diagnosesServices from "../services/diagnosesServices.js";

export const createDiagnosis = async (req, res) => {
    try {
        const diagnosis = await diagnosesServices.createDiagnosis(req.body);
        res.status(201).json(diagnosis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDiagnosesByPatientId = async (req, res) => {
    try {
        const diagnoses = await diagnosesServices.getDiagnosesByPatientId(req.params.patientId);
        res.json(diagnoses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getDiagnosisById = async (req, res) => {
    try {
        const diagnosis = await diagnosesServices.getDiagnosisById(req.params.diagnosisId);
        res.json(diagnosis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateDiagnosis = async (req, res) => {
    try {
        const diagnosis = await diagnosesServices.updateDiagnosis(req.params.diagnosisId, req.body);
        res.json(diagnosis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteDiagnosis = async (req, res) => {
    try {
        const diagnosis = await diagnosesServices.deleteDiagnosis(req.params.diagnosisId);
        res.json(diagnosis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
