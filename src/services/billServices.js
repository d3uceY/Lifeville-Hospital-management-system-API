import { query } from "../db.js";

// export const getBills = async () => {
//     const { rows } = await query(`SELECT * FROM bills`);
//     return rows;
// };

export const createBill = async (billData) => {
    const {
        billNumber,
        patientId,
        issuedBy,
        billDate,
        subtotal,
        discount,
        tax,
        totalAmount,
        status,
        paymentMethod,
        amountPaid,
        paymentDate,
        billItems,
        notes
    } = billData;

    const { rows } = await query(
        `INSERT INTO bills (patient_id, bill_number, issued_by, bill_date, subtotal, status, discount, tax, total_amount, payment_method, amount_paid, payment_date, notes)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         RETURNING *`,
        [
            patientId, billNumber, issuedBy, billDate, subtotal,
            status, discount, tax, totalAmount, paymentMethod,
            amountPaid, paymentDate, notes
        ]
    );

    const bill_id = rows[0].id;

    await Promise.all(
        billItems.map(billItem =>
            query(
                `INSERT INTO bill_items (bill_id, description, unit_price, quantity)
                 VALUES ($1, $2, $3, $4) RETURNING *`,
                [bill_id, billItem.description, billItem.unitPrice, billItem.quantity]
            )
        )
    );

    return rows;
};
