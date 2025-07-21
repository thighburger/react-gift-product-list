import { apiRequest } from './apiClient';
import type { OrderRequest, OrderResponse } from '../types/order';

export const createOrder = async (orderData: OrderRequest, authToken: string): Promise<OrderResponse> => {
  return apiRequest<OrderResponse>('/order', {
    method: 'POST',
    body: orderData,
    authToken,
  });
};
