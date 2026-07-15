//Tooltip

import cn from '@/utils/cn';
import { X16Icon } from '@/shared/icons';

interface TooltipProps {
  label: string;
  isVisible: boolean;
  variant?: 'default' | 'withClose';
  onClose?: () => void;
  className?: string;
  arrowClassName?: string;
  arrowPosition?: 'top' | 'bottom';
}

export const Tooltip = ({
  label,
  isVisible,
  variant = 'default',
  onClose,
  className,
  arrowClassName,
  arrowPosition,
}: TooltipProps) => {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'body2-m absolute z-10 flex w-max items-center gap-2 bg-black px-2.5 py-2 text-white',
        className
      )}
    >
      <div
        className={cn(
          'absolute border-[6px] border-transparent',
          arrowPosition === 'top'
            ? 'top-full border-t-[#222222]'
            : 'bottom-full border-b-[#222222]',
          arrowClassName
        )}
      />
      <div className="whitespace-pre-line">{label}</div>{' '}
      {variant === 'withClose' && onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="툴팁 닫기"
          className="shrink-0 text-white"
        >
          <X16Icon />
        </button>
      )}
    </div>
  );
};
