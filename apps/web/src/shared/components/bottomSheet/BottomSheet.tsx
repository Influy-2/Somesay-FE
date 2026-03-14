import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { BottomSheetProps } from './bottomSheet.types';
import { BottomSheetHandle } from './BottomSheetHandle';
import { BottomSheetOverlay } from './BottomSheetOverlay';
import { useDrag } from '../../hooks/useDrag';

export const BottomSheet = ({
  isOpen,
  onClose,
  children,
  title,
  height = 'h-[60vh]',
}: BottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { dragY, isDragging, handleTouchStart, handleTouchEnd } = useDrag({
    onClose,
    targetRefs: [sheetRef, contentRef],
    scrollRef: contentRef,
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
        aria-label={title ?? '바텀시트'}
        style={{
          // isOpen=false면 화면 밖으로, isOpen=true면 dragY만큼 내려감
          transform: isOpen ? `translateY(${dragY}px)` : 'translateY(100%)',
          // 드래그 중엔 transition 끔 → 손가락 따라 즉시 반응
          // 드래그 끝나면 transition 켬 → 원위치/닫기 애니메이션
          transition: isDragging
            ? 'none'
            : 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        className={`fixed bottom-0 left-1/2 z-50 max-h-[90vh] min-h-[35vh] w-full max-w-110 -translate-x-1/2 flex-col bg-white ${height} flex items-center gap-4 rounded-[12px_12px_0_0]`}
      >
        {/* 핸들 — scrollable 여부 무관하게 항상 드래그 가능 */}
        <BottomSheetHandle
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />

        <div
          ref={contentRef}
          className="h-0 w-full flex-1 overflow-y-auto overscroll-contain"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};
