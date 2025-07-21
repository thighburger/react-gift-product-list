import { apiRequest } from './apiClient';
import type { CategoryItem, CategoryResponse } from '../types/category';

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
