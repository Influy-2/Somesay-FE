import ToggleDownIcon from '@/shared/icons/ToggleDownIcon.svg?react';
import cn from '@/utils/cn';

interface FilterChipProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const FilterChip = ({
  label,
  isSelected = false,
  onClick,
}: FilterChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'bg-grey02 inline-flex items-center justify-center gap-1 rounded-[1.25rem] px-2.5 py-1',
        isSelected ? 'border border-black' : ''
      )}
    >
      <span
        className={cn(
          'body2-m whitespace-nowrap',
          isSelected ? 'text-black' : 'text-grey06'
        )}
      >
        {label}
      </span>
      <ToggleDownIcon className="size-[10px]" aria-hidden="true" />
    </button>
  );
};
