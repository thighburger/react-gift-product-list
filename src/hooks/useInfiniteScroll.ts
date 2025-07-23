import { useRef, useEffect, useCallback } from 'react';
import type { RefObject } from 'react';

interface UseInfiniteScrollOptions {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

/**
 * 무한 스크롤 Intersection Observer 훅
 * @returns observer에 연결할 ref
 */
export function useInfiniteScroll<T extends HTMLElement = HTMLDivElement>({
  loading,
  hasMore,
  onLoadMore,
}: UseInfiniteScrollOptions): RefObject<T | null> {
  const observerRef = useRef<T | null>(null);
  const observerInstance = useRef<IntersectionObserver | null>(null);

  const observe = useCallback(() => {
    if (!hasMore || loading) return;
    if (observerInstance.current) observerInstance.current.disconnect();
    observerInstance.current = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onLoadMore();
        observerInstance.current?.disconnect();
      }
    }, { threshold: 0.1 });
    if (observerRef.current) {
      observerInstance.current.observe(observerRef.current);
    }
  }, [hasMore, loading, onLoadMore]);

  useEffect(() => {
    observe();
    return () => {
      observerInstance.current?.disconnect();
    };
  }, [observe]);

  useEffect(() => {
    if (!loading && hasMore && observerRef.current && observerInstance.current) {
      observerInstance.current.observe(observerRef.current);
    }
  }, [loading, hasMore]);

  return observerRef;
}
