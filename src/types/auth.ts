// 로그인 관련 타입 정의
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    email: string;
    name: string;
    authToken: string;
  };
}

export interface User {
  email: string;
  name: string;
  authToken: string;
}
