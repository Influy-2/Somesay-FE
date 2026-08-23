//Tooltip

import cn from '@/utils/cn';
import { X16Icon } from '@/shared/icons';

interface TooltipProps {
  id?: string;
  label: string;
  isVisible: boolean;
  variant?: 'default' | 'withClose';
  onClose?: () => void;
  className?: string;
  arrowClassName?: string;
  arrowPosition?: 'top' | 'bottom';
  arrowOffset?: number;
  size?: 'default' | 'compact';
}

export const Tooltip = ({
  id,
  label,
  isVisible,
  variant = 'default',
  onClose,
  className,
  arrowClassName,
  arrowPosition,
  arrowOffset,
  size = 'default',
}: TooltipProps) => {
  if (!isVisible) return null;

  return (
    <div
      id={id}
      role={variant === 'withClose' ? 'dialog' : 'tooltip'}
      {...(variant === 'withClose' ? { 'aria-label': label } : {})}
      className={cn(
        'absolute z-10 flex w-max items-center bg-black text-white',
        size === 'compact'
          ? 'caption1-m gap-1.5 px-2 py-1.5'
          : 'body2-m gap-2 px-2.5 py-2',
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
        {...(arrowOffset === undefined
          ? {}
          : { style: { left: `${arrowOffset}px` } })}
      />
      <div className="whitespace-pre-line">{label}</div>
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
