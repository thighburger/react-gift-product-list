import { apiRequest } from './apiClient';
import type { LoginRequest, LoginResponse } from '../types/auth';

export const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
  return apiRequest<LoginResponse>('/login', {
    method: 'POST',
    body: loginData,
    showSuccessToast: true,
    successMessage: '로그인이 완료되었습니다!',
    showErrorToast: true,
  });
};
