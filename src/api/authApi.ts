import { apiRequest } from './apiClient';
import type { LoginRequest, LoginResponse } from '../types/auth';

export const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
  return apiRequest<LoginResponse>('/login', {
    method: 'POST',
    body: loginData,
  });
};
