import { useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { BottomSheetProps } from './bottomSheet.types';
import { BottomSheetHandle } from './BottomSheetHandle';
import { BottomSheetOverlay } from './BottomSheetOverlay';
import { useDrag } from '../../hooks/useDrag';
import {
  BOTTOM_SHEET_HEIGHT,
  BOTTOM_SHEET_TOP_GAP,
  EXPANDABLE_BOTTOM_SHEET_SIZES,
} from './bottomSheet.constants';

export const BottomSheet = ({
  isOpen,
  onClose,
  children,
  header,
  footer,
  ariaLabel,
  size = 'medium',
}: BottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const targetRefs = useMemo(() => [sheetRef, contentRef], []);
  const { dragY, sheetHeight, isDragging, handleTouchStart, handleTouchEnd } =
    useDrag({
      onClose,
      targetRefs,
      scrollRef: contentRef,
      baseHeight: BOTTOM_SHEET_HEIGHT[size],
      expandable: EXPANDABLE_BOTTOM_SHEET_SIZES.has(size),
      isOpen,
    });

  // 열릴 때 body 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC 키로 닫기 (모바일 키보드 등 대응)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return createPortal(
    <>
      <BottomSheetOverlay isOpen={isOpen} onClick={onClose} />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? '바텀시트'}
        style={{
          height: `${sheetHeight}px`,
          maxHeight: `calc(100dvh - ${BOTTOM_SHEET_TOP_GAP}px)`,
          // isOpen=false면 화면 밖으로, isOpen=true면 dragY만큼 내려감
          transform: isOpen ? `translateY(${dragY}px)` : 'translateY(100%)',
          // 드래그 중엔 transition 끔 → 손가락 따라 즉시 반응
          // 드래그 끝나면 transition 켬 → 원위치/닫기 애니메이션
          transition: isDragging
            ? 'none'
            : 'height 0.3s cubic-bezier(0.32, 0.72, 0, 1), transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-110 -translate-x-1/2 flex-col items-center overflow-hidden rounded-[.75rem_.75rem_0_0] bg-white"
      >
        {/* 핸들 — scrollable 여부 무관하게 항상 드래그 가능 */}
        <BottomSheetHandle
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />

        {/* 스크롤 영역 밖에 고정되는 헤더 슬롯 */}
        {header && <div className="w-full shrink-0">{header}</div>}

        <div
          id="bottom-sheet-content"
          ref={contentRef}
          className="scrollbar-hide relative h-0 w-full flex-1 overflow-y-auto overscroll-contain"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {children}
        </div>
        {/* 스크롤 영역 밖에 고정되는 footer 슬롯 */}
        {footer && <div className="w-full shrink-0">{footer}</div>}
      </div>
    </>,
    document.body
  );
};
