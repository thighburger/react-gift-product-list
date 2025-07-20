// 주문 관련 타입 정의

export interface OrderReceiver {
  name: string;
  phoneNumber: string;
  quantity: number;
}

export interface OrderRequest {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: OrderReceiver[];
}

export interface OrderResponse {
  data: {
    success: boolean;
  };
}
