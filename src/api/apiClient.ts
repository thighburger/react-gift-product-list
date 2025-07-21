const BASE_URL = 'http://localhost:3000/api';

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  authToken?: string;
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  // 4XX 클라이언트 에러 처리
  if (response.status >= 400 && response.status < 500) {
    const errorData = await response.json();
    const errorMessage = errorData.message || '요청 처리 중 오류가 발생했습니다.';
    
    if (response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
    
    throw new Error(errorMessage);
  }

  // 5XX 서버 에러 처리
  if (response.status >= 500) {
    const errorMessage = '서버 오류가 발생했습니다.';
    throw new Error(errorMessage);
  }

  // 성공하지 않은 응답 처리
  if (!response.ok) {
    const errorMessage = '요청 처리에 실패했습니다.';
    throw new Error(errorMessage);
  }

  return response.json();
};

export const apiRequest = async <T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> => {
  const {
    method = 'GET',
    headers = {},
    body,
    authToken,
  } = options;

  const url = `${BASE_URL}${endpoint}`;
  
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (authToken) {
    requestHeaders['Authorization'] = authToken;
  }

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (body && method !== 'GET') {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, requestOptions);
    const result = await handleResponse<T>(response);
    
    return result;
  } catch (error) {
    console.error(`API Error [${method} ${url}]:`, error);
    throw error;
  }
};

// 타입 내보내기
export type { ApiRequestOptions };