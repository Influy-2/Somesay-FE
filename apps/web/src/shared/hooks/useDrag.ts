import { useRef, useState, useCallback, useEffect } from 'react';

interface UseDragOptions {
  onClose: () => void;
  /** deltaY 임계값 (px). 이 값 이상 내리면 닫힘 */
  threshold?: number;
  /** velocity 임계값 (px/ms). 이 값 이상이면 거리 무관하게 닫힘 */
  velocityThreshold?: number;
  /** touchmove를 등록할 DOM 요소 refs */
  targetRefs: React.RefObject<HTMLElement | null>[];
  /** 스크롤 위치를 체크할 콘텐츠 영역 ref — scrollTop > 0이면 드래그 비활성화 */
  scrollRef: React.RefObject<HTMLElement | null>;
}

interface UseDragReturn {
  dragY: number;
  isDragging: boolean;
  handleTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  handleTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
}

export const useDrag = ({
  onClose,
  threshold = 200,
  velocityThreshold = 0.7,
  targetRefs,
  scrollRef,
}: UseDragOptions): UseDragReturn => {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startY = useRef(0);
  const startTime = useRef(0);
  const isDraggingRef = useRef(false);
  // 터치 시작이 핸들([data-drag-handle])에서 비롯됐는지 여부
  const isFromHandleRef = useRef(false);
  // 터치 시작 시점의 scrollTop — 제스처 중 0이 되더라도 드래그 방지
  const startScrollTopRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;

    startY.current = touch.clientY;
    startTime.current = Date.now();
    isDraggingRef.current = true;
    setIsDragging(true);
    isFromHandleRef.current = !!(e.target as Element).closest(
      '[data-drag-handle]'
    );
    startScrollTopRef.current = scrollRef.current?.scrollTop ?? 0;
  };

  // passive: false로 직접 등록해야 preventDefault()가 동작함
  // React의 onTouchMove는 passive listener라 e.preventDefault() 불가
  useEffect(() => {
    const els = targetRefs
      .map((ref) => ref.current)
      .filter(Boolean) as HTMLElement[];

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;

      const touch = e.touches[0];
      if (!touch) return;

      const deltaY = touch.clientY - startY.current;
      if (deltaY < 0) return; // 위로 드래그 무시

      // 터치 시작 시점에 스크롤이 최상단이 아니었으면 드래그 비활성화
      // (제스처 도중 scrollTop이 0이 되더라도 드래그 시작 불가)
      if (!isFromHandleRef.current && startScrollTopRef.current > 0) return;

      e.preventDefault(); // 페이지 스크롤 방지
      setDragY(deltaY);
    };

    els.forEach((el) =>
      el.addEventListener('touchmove', handleTouchMove, { passive: false })
    );
    return () =>
      els.forEach((el) => el.removeEventListener('touchmove', handleTouchMove));
  }, [targetRefs, scrollRef]);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.changedTouches[0];
      if (!touch) return;

      const endY = touch.clientY;
      const deltaY = endY - startY.current;
      const deltaTime = Date.now() - startTime.current;
      const velocity = deltaY / deltaTime; // px/ms

      // 터치 시작 시점에 스크롤이 최상단이 아니었으면 닫기 동작 무시
      if (!isFromHandleRef.current && startScrollTopRef.current > 0) {
        isDraggingRef.current = false;
        setIsDragging(false);
        setDragY(0);
        return;
      }

      const shouldClose = velocity > velocityThreshold || deltaY > threshold;

      isDraggingRef.current = false;
      setIsDragging(false);
      setDragY(0);

      if (shouldClose) onClose();
    },
    [onClose, threshold, velocityThreshold]
  );

  return {
    dragY,
    isDragging,
    handleTouchStart,
    handleTouchEnd,
  };
};
