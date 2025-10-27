import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const cartService = {
  async getCart() {
    const response = await axios.get(`${API_URL}/cart`);
    return response.data;
  },

  async addToCart(product) {
    const response = await axios.post(`${API_URL}/cart/add`, {
      product_id: product.id,
      quantity: 1,
      price: parseFloat(product.price.replace(/[₦,]/g, ''))
    });
    return response.data;
  },

  async updateQuantity(itemId, quantity) {
    const response = await axios.put(`${API_URL}/cart/update/${itemId}`, {
      quantity
    });
    return response.data;
  },

  async removeItem(itemId) {
    const response = await axios.delete(`${API_URL}/cart/remove/${itemId}`);
    return response.data;
  },

  async checkout(orderData) {
    const response = await axios.post(`${API_URL}/checkout`, orderData);
    return response.data;
  },

  async getOrders() {
    return this.request('/orders');
  },

  async getOrderDetails(orderId) {
    return this.request(`/orders/${orderId}`);
  },


};