// Product 관련 타입 정의
export interface Product {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

// 제품 요약 정보 타입
export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

// API 응답 타입
export interface ProductRankingResponse {
  data: Product[];
}

export interface ProductSummaryResponse {
  data: ProductSummary;
}
