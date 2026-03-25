import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import cn from '@/utils/cn';

const FADE_OUT_DURATION = 300;

interface SnackbarProps {
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose: () => void;
  duration?: number;
}

export const Snackbar = ({
  message,
  action,
  onClose,
  duration = 3000,
}: SnackbarProps) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => setIsClosing(true),
      duration - FADE_OUT_DURATION
    );
    return () => clearTimeout(timer);
  }, [duration]);

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'z-toast absolute bottom-[5.5rem] left-1/2 flex w-[22.375rem] -translate-x-1/2 items-center px-3.5 py-3.5',
        'bg-[rgba(22,22,22,0.74)] backdrop-blur-[.1875rem]',
        action ? 'justify-between' : 'justify-start',
        isClosing && 'animate-snackbar-out'
      )}
      onAnimationEnd={() => isClosing && onClose()}
    >
      <p className="body2-m text-white">{message}</p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="body2-m ml-4 shrink-0 text-white underline underline-offset-2"
        >
          {action.label}
        </button>
      )}
    </div>,
    document.body
  );
};
