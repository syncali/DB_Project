import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const orderService = {
  placeOrder: async (shippingAddressId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/orders/place`,
        { shipping_address_id: shippingAddressId },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to place order");
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/orders/updatestatus`,
        { order_id: orderId, order_status: status },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  },

  cancelOrder: async (orderId) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/orders/cancel`,
        { order_id: orderId },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to cancel order"
      );
    }
  },

  getAllOrders: async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/orders/getAllOrders`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch all orders"
      );
    }
  },

  getMyOrders: async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/orders/getMyOrders`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch your orders"
      );
    }
  },
};
