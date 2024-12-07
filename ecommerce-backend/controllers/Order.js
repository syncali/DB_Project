const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const CartItem = require('../models/CartItem');
const { findById } = require('../models/Product');
const Payment = require('../models/Payment');
const { getLoyaltyPoints } = require('../models/User');

const placeOrder = async(req,res) => {
    const { user_id, shipping_address_id } = req.body;

    try {
        if (!user_id || !shipping_address_id) {
            return res.status(400).json({
                success: false,
                message: 'user_id or shipping_address_id is empty',
            });
        }

        const cartItems = await CartItem.getCartItems(user_id);
        if (cartItems.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        // Check stock availability and calculate total amount
        let totalAmount = 0;
        for (const item of cartItems) {
            const product = await findById(item.product_id);
        if (product.stock_quantity >= item.quantity) { // Threshold
                totalAmount += item.quantity * product.product_price;
            } else {
                return res.status(400).json({
                    success: false,
                    message: `Product ${product.product_name} has limited quantity in stock`,
                });
            }
        }
        const loyalty_points = await getLoyaltyPoints(user_id);
        let availedPoints = Math.floor(loyalty_points * 0.7);

        // Calculate payment based on loyalty points
        let amountToPay = totalAmount;
        if (availedPoints >= totalAmount) {
            amountToPay = Math.ceil(totalAmount / 2); // User pays half in cash
            availedPoints -= amountToPay;
            
        } else {
            amountToPay -= availedPoints; // Use all availed points
            availedPoints = 0;
        }

        const order = await Order.placeOrder(user_id, totalAmount, shipping_address_id);
        const payment = await Payment.createPayment(order.order_id, amountToPay, 'Pending', 'Cash on Delivery');

        const updatedLoyaltyPoints = loyalty_points - Math.ceil(loyalty_points * 0.7) + availedPoints;
        await updateLoyaltyPoints(user_id, updatedLoyaltyPoints);

        
        for (const item of cartItems) {
            await OrderItem.addOrderItem(order.order_id, item.product_id, item.quantity);
        }

        await CartItem.clearCart(user_id);

        res.status(200).json({ success: true, message: 'Order placed successfully', order, payment});
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to place order', error: err.message });
    }
};

const updateOrderStatus = async (req, res) => {
    const { order_id, order_status } = req.body;
    try {
        if(!order_id || !order_status){
            res.status(400).json({success: false, message: 'Fields are required'});
        }
        const order = await Order.updateOrderStatus(order_id, order_status);
        res.status(200).json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update order status', error: err.message });
    }
};

const cancelOrder = async (req, res) => {
    const { order_id } = req.body;

    try {
        if(!order_id){
            res.status(400).json({success: false, message: 'Fields are required'});
        }
        const order = await Order.getOrderById(order_id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        if (order.order_status === 'Cancelled' || order.order_status === 'Delivered') {
            return res.status(400).json({ success: false, message: 'This order is either Delivered or already been cancelled' });
        }

        const cancelledOrder = await Order.updateOrderStatus(order_id, "Cancelled");

        // Restore stock levels for each product in the order
        //Handled by Triggers

        res.status(200).json({
            success: true,
            message: 'Order cancelled successfully',
            data: cancelledOrder,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to cancel order', error: err.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.getAllOrders();

        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No orders found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Orders retrieved successfully',
            data: orders,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders',
            error: err.message,
        });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const orders = await Order.getOrderByUserId(user_id);

        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No orders found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Orders retrieved successfully',
            data: orders,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders',
            error: err.message,
        });
    }
};

module.exports = {placeOrder, updateOrderStatus, cancelOrder, getAllOrders, getMyOrders};