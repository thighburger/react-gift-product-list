import { apiRequest } from './apiClient';
import type { OrderRequest, OrderResponse } from '../types/order';

export const createOrder = async (orderData: OrderRequest, authToken: string): Promise<OrderResponse> => {
  return apiRequest<OrderResponse>('/order', {
    method: 'POST',
    body: orderData,
    authToken,
    showSuccessToast: true,
    successMessage: '주문이 성공적으로 완료되었습니다!',
    showErrorToast: true,
  });
};
