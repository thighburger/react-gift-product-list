import type { CategoryItem, CategoryResponse, ThemeInfo, ThemeInfoResponse } from '../types/category';
import type { Product } from '../types/product';
import { apiRequest } from './apiClient';

// 카테고리 데이터 가져오기
export const fetchCategories = async (): Promise<CategoryItem[]> => {
  const result = await apiRequest<CategoryResponse>('/themes', {
    method: 'GET',
  });
  
  if (Array.isArray(result.data)) {
    return result.data;
  } else {
    throw new Error('API에서 올바른 데이터를 반환하지 않았습니다.');
  }
};

// 테마 상세 정보 가져오기
export const fetchThemeInfo = async (themeId: number): Promise<ThemeInfo> => {
  try {
    const response = await fetch(`http://localhost:3000/api/themes/${themeId}/info`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('THEME_NOT_FOUND');
      }
      throw new Error('데이터를 가져오는 데 실패했습니다.');
    }
    
    const result: ThemeInfoResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching theme info:', error);
    throw error;
  }
};


// 테마별 상품 목록 데이터 타입
export interface ThemeProductList {
  list: Product[];
  cursor: number;
  hasMoreList: boolean;
}

export interface ThemeProductListResponse {
  data: ThemeProductList;
}

export const fetchThemeProducts = async (
  themeId: number,
  cursor: number = 0,
  limit: number = 10
): Promise<ThemeProductList> => {
  try {
    const response = await fetch(`http://localhost:3000/api/themes/${themeId}/products?cursor=${cursor}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('상품 목록을 가져오는 데 실패했습니다.');
    }
    const result: ThemeProductListResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching theme products:', error);
    throw error;
  }
};


