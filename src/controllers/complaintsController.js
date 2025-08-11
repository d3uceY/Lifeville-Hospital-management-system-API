import * as complaintsServices from "../services/complaintsServices.js";


export async function getComplaints(req, res) {
    try {
        const complaints = await complaintsServices.getComplaints();
        res.json(complaints);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve complaints" });
    }
}

export async function getComplaintsByPatientId(req, res) {
    try {
        const complaints = await complaintsServices.getComplaintsByPatientId(req.params.patientId);
        res.json(complaints);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve complaints" });
    }
}

export async function createComplaint(req, res) {
    try {
        const complaint = await complaintsServices.createComplaint(req.body);
        res.json(complaint);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create complaint" });
    }
}
