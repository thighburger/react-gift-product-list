import { toast } from 'react-toastify';
import type { OrderRequest, OrderResponse } from '../types/order';

export const createOrder = async (orderData: OrderRequest, authToken: string): Promise<OrderResponse> => {
  try {
    const response = await fetch('http://localhost:3000/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      if (response.status === 401) {
        // 401 에러의 경우 로그인이 필요하다는 메시지와 함께 에러 던지기
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || '로그인이 필요합니다';
        toast.error(errorMessage);
        throw new Error('UNAUTHORIZED');
      }
      
      throw new Error('주문 처리 중 서버 오류가 발생했습니다');
    }

    const result: OrderResponse = await response.json();
    toast.success('주문이 성공적으로 완료되었습니다!');
    return result;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
