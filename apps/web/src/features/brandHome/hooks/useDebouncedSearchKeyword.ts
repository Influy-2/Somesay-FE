import { useCallback, useEffect, useRef } from 'react';

const DEFAULT_DEBOUNCE_DELAY = 300;

/**
 * 입력이 멈춘 뒤 검색 키워드를 커밋합니다.
 *
 * 커밋 위치(URL 등)는 호출자가 정하므로 값을 들고 있지 않고 콜백으로 넘깁니다.
 * 값을 여기서도 들고 있으면 URL과 두 벌이 되어 어느 쪽이 진짜인지 흐려집니다.
 */
export const useDebouncedSearchKeyword = (
  onCommit: (keyword: string) => void,
  delay = DEFAULT_DEBOUNCE_DELAY
) => {
  const timerRef = useRef<number | undefined>(undefined);
  // 최신 콜백을 참조해 호출자가 useCallback으로 감싸지 않아도 되게 합니다.
  const onCommitRef = useRef(onCommit);

  useEffect(() => {
    onCommitRef.current = onCommit;
  });

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  return useCallback(
    (value: string) => {
      const normalizedValue = value.trim();

      window.clearTimeout(timerRef.current);

      // 비우는 건 기다릴 이유가 없어 곧바로 반영합니다.
      if (normalizedValue.length === 0) {
        onCommitRef.current('');
        return;
      }

      timerRef.current = window.setTimeout(() => {
        onCommitRef.current(normalizedValue);
      }, delay);
    },
    [delay]
  );
};
