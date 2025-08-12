import * as conditionServices from "../services/conditionServices.js";


export const createCondition = async (req, res) => {
    try {
        const condition = await conditionServices.createCondition(req.body);
        res.status(201).json(condition);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getConditions = async (req, res) => {
    try {
        const conditions = await conditionServices.getConditions();
        res.json(conditions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCondition = async (req, res) => {
    try {
        const condition = await conditionServices.deleteCondition(req.params.id);
        res.json(condition);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCondition = async (req, res) => {
    try {
        const condition = await conditionServices.updateCondtion(req.params.id, req.body);
        res.json(condition);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

