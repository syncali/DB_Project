// src/components/admin/OrderManagement.jsx

import React, { useState } from "react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  const updateOrderStatus = (orderId, status) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-header">
              <h3>Order #{order.id}</h3>
              <span className={`status ${order.status}`}>{order.status}</span>
            </div>
            <div className="order-details">
              <p>Customer: {order.customerName}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p>Total: Rs. {order.total}</p>
            </div>
            <select
              value={order.status}
              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
