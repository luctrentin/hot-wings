import apiClient from '../client';
import { MenuItem } from '../../types';

export const menuService = {
  getAllItems: async () => {
    const response = await apiClient.get('/menu');
    return response.data;
  },

  getItemById: async (id: string) => {
    const response = await apiClient.get(`/menu/${id}`);
    return response.data;
  },

  createItem: async (menuItem: Omit<MenuItem, 'id'>) => {
    const response = await apiClient.post('/menu', menuItem);
    return response.data;
  },

  updateItem: async (id: string, menuItem: Partial<MenuItem>) => {
    const response = await apiClient.put(`/menu/${id}`, menuItem);
    return response.data;
  },

  deleteItem: async (id: string) => {
    const response = await apiClient.delete(`/menu/${id}`);
    return response.data;
  }
};

export default menuService; 