import type { CategoryItem, CategoryResponse } from '../types/category';

// 카테고리 데이터 가져오기
export const fetchCategories = async (): Promise<CategoryItem[]> => {
  try {
    const response = await fetch('http://localhost:3000/api/themes');
    
    if (!response.ok) {
      throw new Error('데이터를 가져오는 데 실패했습니다.');
    }
    
    const result: CategoryResponse = await response.json();
    
    if (Array.isArray(result.data)) {
      return result.data;
    } else {
      throw new Error('API에서 올바른 데이터를 반환하지 않았습니다.');
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
