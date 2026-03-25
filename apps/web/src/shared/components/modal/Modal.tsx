import { type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalButton {
  label: string;
  onClick: () => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: ReactNode;
  leftButton: ModalButton;
  rightButton: ModalButton;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  leftButton,
  rightButton,
}: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-y-0 left-1/2 z-50 flex w-full max-w-110 min-w-[20rem] -translate-x-1/2 items-center justify-center bg-black/30"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="flex w-[17.9375rem] flex-col items-center gap-5 overflow-hidden bg-white px-4 pt-[1.875rem] pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 타이틀 설명 */}
        <div className="flex flex-col gap-2 text-center">
          <p className="body1-b text-black">{title}</p>
          <div className="body2-m text-grey08">{description}</div>
        </div>

        {/* 버튼 */}
        <div className="flex w-full gap-2">
          <button
            type="button"
            onClick={leftButton.onClick}
            className="body2-m flex h-10 flex-1 cursor-pointer items-center justify-center border border-black text-black"
          >
            {leftButton.label}
          </button>
          <button
            type="button"
            onClick={rightButton.onClick}
            className="body2-m flex h-10 flex-1 cursor-pointer items-center justify-center bg-black text-white"
          >
            {rightButton.label}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
