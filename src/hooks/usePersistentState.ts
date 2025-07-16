import { useState, useEffect } from 'react';

/**
 * localStorage에 상태를 저장하고 복원하는 커스텀 훅
 * @param key - localStorage에 저장될 키
 * @param defaultValue - 기본값
 * @returns [state, setState] 튜플
 */
export function usePersistentState(key: string, defaultValue: string) {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? item : defaultValue;
    } catch (error) {
      console.warn(`localStorage에서 키 "${key}"를 읽는 중 오류가 발생했습니다:`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, state);
    } catch (error) {
      console.warn(`localStorage에 키 "${key}"를 저장하는 중 오류가 발생했습니다:`, error);
    }
  }, [key, state]);

  return [state, setState] as const;
}
