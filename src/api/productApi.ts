import { apiRequest } from './apiClient';
import type { Product, ProductRankingResponse, ProductSummary, ProductSummaryResponse } from '../types/product';

export const fetchProductRanking = async (
  targetType: string = 'ALL',
  rankType: string = 'MANY_WISH'
): Promise<Product[]> => {
  const result = await apiRequest<ProductRankingResponse>(
    `/products/ranking?targetType=${targetType}&rankType=${rankType}`,
    { method: 'GET' }
  );
  return result.data;
};

export const fetchProductSummary = async (productId: number): Promise<ProductSummary> => {
  const result = await apiRequest<ProductSummaryResponse>(
    `/products/${productId}/summary`,
    { 
      method: 'GET',
      showErrorToast: true 
    }
  );
  return result.data;
};
