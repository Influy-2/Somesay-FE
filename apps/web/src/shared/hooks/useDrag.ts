import { useRef, useState, useCallback, useEffect } from 'react';
import { BOTTOM_SHEET_TOP_GAP } from '../components/bottomSheet/bottomSheet.constants';

type GestureMode = 'idle' | 'resize' | 'close';

const getViewportHeight = () =>
  typeof window === 'undefined' ? 0 : window.innerHeight;

const getMaximumSheetHeight = () =>
  Math.max(0, getViewportHeight() - BOTTOM_SHEET_TOP_GAP);

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
  /** 바텀시트의 variant 기본 높이(px) */
  baseHeight: number;
  /** 핸들로 바텀시트를 확장할 수 있는지 여부 */
  expandable: boolean;
  /** 닫힐 때 확장 상태를 초기화하기 위한 열림 상태 */
  isOpen: boolean;
}

interface UseDragReturn {
  dragY: number;
  sheetHeight: number;
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
  baseHeight,
  expandable,
  isOpen,
}: UseDragOptions): UseDragReturn => {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [maximumHeight, setMaximumHeight] = useState(getMaximumSheetHeight);
  const [sheetHeight, setSheetHeight] = useState(() =>
    Math.min(baseHeight, getMaximumSheetHeight())
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [previousBaseHeight, setPreviousBaseHeight] = useState(baseHeight);
  const [previousIsOpen, setPreviousIsOpen] = useState(isOpen);

  const startY = useRef(0);
  const startTime = useRef(0);
  const isDraggingRef = useRef(false);
  const gestureModeRef = useRef<GestureMode>('idle');
  const startHeightRef = useRef(sheetHeight);
  const sheetHeightRef = useRef(sheetHeight);
  // 터치 시작이 핸들([data-drag-handle])에서 비롯됐는지 여부
  const isFromHandleRef = useRef(false);
  // 터치 시작 시점의 scrollTop — 제스처 중 0이 되더라도 드래그 방지
  const startScrollTopRef = useRef(0);

  const collapsedHeight = Math.min(baseHeight, maximumHeight);
  const canExpand = expandable && maximumHeight > collapsedHeight;

  if (previousIsOpen !== isOpen || previousBaseHeight !== baseHeight) {
    setPreviousIsOpen(isOpen);
    setPreviousBaseHeight(baseHeight);
    setIsExpanded(false);
    setIsDragging(false);
    setSheetHeight(collapsedHeight);
    setDragY(0);
  }

  const snapTo = useCallback(
    (expanded: boolean) => {
      const shouldExpand = expanded && canExpand;
      const nextHeight = shouldExpand ? maximumHeight : collapsedHeight;
      setIsExpanded(shouldExpand);
      sheetHeightRef.current = nextHeight;
    },
    [canExpand, collapsedHeight, maximumHeight]
  );

  useEffect(() => {
    const handleViewportResize = () => {
      setMaximumHeight(getMaximumSheetHeight());
    };

    window.addEventListener('resize', handleViewportResize);
    return () => window.removeEventListener('resize', handleViewportResize);
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;

    startY.current = touch.clientY;
    startTime.current = Date.now();
    const restingHeight = isExpanded ? maximumHeight : collapsedHeight;
    startHeightRef.current = restingHeight;
    sheetHeightRef.current = restingHeight;
    setSheetHeight(restingHeight);
    isDraggingRef.current = true;
    gestureModeRef.current = 'idle';
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

      // 터치 시작 시점에 스크롤이 최상단이 아니었으면 드래그 비활성화
      // (제스처 도중 scrollTop이 0이 되더라도 드래그 시작 불가)
      if (!isFromHandleRef.current && startScrollTopRef.current > 0) return;

      const startsResizeGesture =
        canExpand &&
        ((isExpanded && deltaY > 0) ||
          (!isExpanded && isFromHandleRef.current && deltaY < 0));

      if (
        gestureModeRef.current === 'resize' ||
        (gestureModeRef.current === 'idle' && startsResizeGesture)
      ) {
        gestureModeRef.current = 'resize';
        e.preventDefault();
        const nextHeight = Math.min(
          maximumHeight,
          Math.max(collapsedHeight, startHeightRef.current - deltaY)
        );
        sheetHeightRef.current = nextHeight;
        setSheetHeight(nextHeight);
        return;
      }

      if (deltaY <= 0) return;

      gestureModeRef.current = 'close';
      e.preventDefault(); // 페이지 스크롤 방지
      setDragY(deltaY);
    };

    els.forEach((el) =>
      el.addEventListener('touchmove', handleTouchMove, { passive: false })
    );
    return () =>
      els.forEach((el) => el.removeEventListener('touchmove', handleTouchMove));
  }, [canExpand, collapsedHeight, isExpanded, maximumHeight, targetRefs]);

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
        gestureModeRef.current = 'idle';
        return;
      }

      if (gestureModeRef.current === 'resize') {
        const middleHeight =
          collapsedHeight + (maximumHeight - collapsedHeight) / 2;
        const shouldExpand = isExpanded
          ? !(
              sheetHeightRef.current <= middleHeight ||
              velocity > velocityThreshold
            )
          : sheetHeightRef.current >= middleHeight ||
            velocity < -velocityThreshold;

        snapTo(shouldExpand);
        isDraggingRef.current = false;
        setIsDragging(false);
        setDragY(0);
        gestureModeRef.current = 'idle';
        return;
      }

      const shouldClose = velocity > velocityThreshold || deltaY > threshold;

      isDraggingRef.current = false;
      setIsDragging(false);
      setDragY(0);
      gestureModeRef.current = 'idle';

      if (shouldClose) onClose();
    },
    [
      collapsedHeight,
      isExpanded,
      maximumHeight,
      onClose,
      snapTo,
      threshold,
      velocityThreshold,
    ]
  );

  return {
    dragY,
    sheetHeight:
      isDragging && isOpen
        ? sheetHeight
        : isExpanded && canExpand
          ? maximumHeight
          : collapsedHeight,
    isDragging,
    handleTouchStart,
    handleTouchEnd,
  };
};
