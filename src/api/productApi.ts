import { toast } from 'react-toastify';
import type { Product, ProductRankingResponse, ProductSummary, ProductSummaryResponse } from '../types/product';


export const fetchProductRanking = async (
  targetType: string = 'ALL',
  rankType: string = 'MANY_WISH'
): Promise<Product[]> => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/ranking?targetType=${targetType}&rankType=${rankType}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch product ranking');
    }
    
    const result: ProductRankingResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching product ranking:', error);
    throw error;
  }
};

export const fetchProductSummary = async (productId: number): Promise<ProductSummary> => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${productId}/summary`
    );
    
    if (!response.ok) {
      if (response.status >= 400 && response.status < 500) {
        // 4XX 에러의 경우 서버에서 온 에러 메시지를 사용하고 toast 표시
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || '상품에 대한 정보가 없습니다';
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
      throw new Error('제품 정보를 가져오는데 실패했습니다.');
    }
    
    const result: ProductSummaryResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching product summary:', error);
    throw error;
  }
};
