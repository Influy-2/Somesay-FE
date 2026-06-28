import type { ReactNode } from 'react';
import cn from '@/utils/cn';

interface OnboardingSelectionButtonProps {
  children: ReactNode;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const OnboardingSelectionButton = ({
  children,
  isSelected,
  onClick,
  disabled = false,
}: OnboardingSelectionButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-pressed={isSelected}
    className={cn(
      'body1-m flex min-h-12 w-full items-center justify-center border px-4 py-3 transition-colors',
      isSelected
        ? 'border-black bg-black text-white'
        : 'border-grey03 bg-white text-black',
      disabled && 'cursor-not-allowed opacity-40'
    )}
  >
    {children}
  </button>
);
