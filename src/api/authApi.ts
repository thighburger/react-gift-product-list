import type { LoginRequest, LoginResponse } from '../types/auth';

export const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '로그인에 실패했습니다.');
    }

    const result: LoginResponse = await response.json();
    return result;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};
