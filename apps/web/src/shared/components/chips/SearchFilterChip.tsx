import ToggleDownIcon from '@/shared/icons/ToggleDownIcon.svg?react';
import cn from '@/utils/cn';

interface SearchFilterChipProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const SearchFilterChip = ({
  label,
  isSelected = false,
  onClick,
}: SearchFilterChipProps) => {
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
      <ToggleDownIcon className="size-[.625rem]" aria-hidden="true" />
    </button>
  );
};
