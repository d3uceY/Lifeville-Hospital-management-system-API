import * as billService from "../services/billServices.js";


export async function createBill(req, res) {
    try {
        const billData = req.body;
        const newBill = await billService.createBill(billData);
        res.status(201).json({ newBill, message: "Bill created" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
}