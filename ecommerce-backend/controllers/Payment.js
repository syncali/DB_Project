const Payment = require('../models/Payment'); // Assuming the Payment model is in the models folder

// Controller for updating payment details
const updatePayment = async (req, res) => {
    const { payment_id } = req.body;
    const { status, payment_note = null } = req.body;
    try {
        if(!status || !payment_id){
            return res.status(404).json({ success: false, message: 'Payment id and status is required' });
        }
        const updatedPayment = await Payment.updatePaymentStatus(payment_id, status, payment_note);
        if (!updatedPayment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }
        res.status(200).json({ success: true, message: 'Payment updated successfully', data: updatedPayment });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update payment', error: err.message });
    }
};

// Controller to get a payment by ID
const getPaymentById = async (req, res) => {
    const { payment_id } = req.body;
    try {
        const payment = await Payment.getPaymentById(payment_id);
        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }
        res.status(200).json({ success: true, data: payment });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to retrieve payment', error: err.message });
    }
};

// Controller to get all payments for a specific order
const getPaymentsByOrderId = async (req, res) => {
    const { order_id } = req.body;
    try {
        const payments = await Payment.getPaymentsByOrderId(order_id);
        res.status(200).json({ success: true, data: payments });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to retrieve payments', error: err.message });
    }
};

module.exports = {
    updatePayment,
    getPaymentById,
    getPaymentsByOrderId,
};
