import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_DEBOUNCE_DELAY = 300;

// 입력이 멈춘 뒤 브랜드 상품 검색에 사용할 키워드를 갱신합니다.
export const useDebouncedSearchKeyword = (delay = DEFAULT_DEBOUNCE_DELAY) => {
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  const updateDebouncedKeyword = useCallback(
    (value: string) => {
      const normalizedValue = value.trim();

      window.clearTimeout(timerRef.current);

      if (normalizedValue.length === 0) {
        setDebouncedKeyword('');
        return;
      }

      timerRef.current = window.setTimeout(() => {
        setDebouncedKeyword(normalizedValue);
      }, delay);
    },
    [delay]
  );

  return { debouncedKeyword, updateDebouncedKeyword };
};
