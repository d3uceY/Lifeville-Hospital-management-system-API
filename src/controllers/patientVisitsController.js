import * as patientVisitsServices from "../services/patientVisitsServices.js";

export const createPatientVisit = async (req, res) => {
    try {
        const patientVisit = await patientVisitsServices.createPatientVisit(req.body);
        res.status(201).json(patientVisit);
    } catch (error) {
        console.error("Error creating patient visit:", error);
        res.status(500).json({ error: "Failed to create patient visit" });
    }
};

export const getPaginatedPatientVisits = async (req, res) => {
    try {
        const { page, pageSize, firstName, surname, phoneNumber, hospitalNumber, startDate, endDate } = req.query;
        const patientVisits = await patientVisitsServices.getPaginatedPatientVisits(page, pageSize, { firstName, surname, phoneNumber, hospitalNumber, startDate, endDate });
        res.status(200).json(patientVisits);
    } catch (error) {
        console.error("Error fetching patient visits:", error);
        res.status(500).json({ error: "Failed to fetch patient visits" });
    }
};

export const getPatientVisitsByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
        const patientVisits = await patientVisitsServices.getPatientVisitsByPatientId(patientId);
        res.status(200).json(patientVisits);
    } catch (error) {
        console.error("Error fetching patient visits:", error);
        res.status(500).json({ error: "Failed to fetch patient visits" });
    }
};