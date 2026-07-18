import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  FLOATING_PLACEMENT_CLASS,
  type SnackbarPlacement,
} from '@/shared/constants/floating.constants';
import type {
  SnackbarAction,
  SnackbarVariant,
} from '@/shared/stores/snackbar.store';
import cn from '@/utils/cn';

const FADE_OUT_DURATION = 300;
const SNACKBAR_DURATION = 3000;

interface SnackbarProps {
  message: string;
  variant?: SnackbarVariant;
  placement?: SnackbarPlacement;
  action?: SnackbarAction;
  onClose: () => void;
  className?: string;
}

export const Snackbar = ({
  message,
  variant = 'default',
  placement = 'default',
  action,
  onClose,
  className,
}: SnackbarProps) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => setIsClosing(true),
      SNACKBAR_DURATION - FADE_OUT_DURATION
    );
    return () => clearTimeout(timer);
  }, []);

  return createPortal(
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      className={cn(
        'z-toast fixed left-1/2 flex w-[22.375rem] -translate-x-1/2 items-center px-3.5 py-3.5',
        variant === 'error'
          ? 'bg-error'
          : 'bg-[rgba(22,22,22,0.74)] backdrop-blur-[.1875rem]',
        FLOATING_PLACEMENT_CLASS[placement],
        action ? 'justify-between' : 'justify-start',
        isClosing && 'animate-snackbar-out',
        className
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
