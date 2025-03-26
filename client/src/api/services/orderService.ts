import apiClient from '../client';
import { Order } from '../../types';

export interface PlaceOrderData {
  items: {
    menuItemId: string;
    quantity: number;
  }[];
  paymentMethod: string;
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    instructions?: string;
  };
}

export const orderService = {
  getUserOrders: async () => {
    const response = await apiClient.get('/orders');
    return response.data;
  },

  getOrderById: async (id: string) => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  placeOrder: async (orderData: PlaceOrderData) => {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  },

  updateOrderStatus: async (id: string, status: Order['status']) => {
    const response = await apiClient.put(`/orders/${id}`, { status });
    return response.data;
  }
};

export default orderService; 