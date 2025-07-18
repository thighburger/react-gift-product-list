import type { Product, ProductRankingResponse } from '../types/product';

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
