// 카테고리 아이템 타입 정의
export interface CategoryItem {
  themeId: number;
  name: string;
  image: string;
}

// API 응답 타입 정의
export interface CategoryResponse {
  data: CategoryItem[];
}
