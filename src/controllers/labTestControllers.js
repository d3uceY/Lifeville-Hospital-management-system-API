import * as labTestServices from "../services/labTestServices.js";

export async function getLabTests(req, res) {
    try {
        const labTests = await labTestServices.getLabTests();
        res.json(labTests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve lab tests" });
    }
}

export async function getLabTestById(req, res) {
    try {
        const labTest = await labTestServices.getLabTestById(req.params.id);
        res.json(labTest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve lab test" });
    }
}







export async function getLabTestTypes(req, res) {
    try {
        const labTestTypes = await labTestServices.getLabTestTypes();
        res.json(labTestTypes);
    } catch (error) {
        console.error("this is the errror", error);
        res.status(500).json({ error: "Failed to retrieve lab test types" });
    }
}

export async function deleteLabTestType(req, res) {
    try {
        const labTestType = await labTestServices.deleteLabTestType(req.params.id);
        res.json(labTestType);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete lab test type" });
    }
}

export const createLabTestType = async (req, res) => {
    try {
        const labTestType = await labTestServices.createLabTestType(req.body);
        res.json(labTestType);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create lab test type" });
    }
}

export const updateLabTestType = async (req, res) => {
    try {
        const labTestType = await labTestServices.updateLabTestType(req.params.id, req.body);
        res.json(labTestType);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update lab test type" });
    }
}
