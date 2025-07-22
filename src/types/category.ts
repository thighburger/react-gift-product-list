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

// 테마 상세 정보 타입 정의
export interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

// 테마 상세 정보 API 응답 타입
export interface ThemeInfoResponse {
  data: ThemeInfo;
}