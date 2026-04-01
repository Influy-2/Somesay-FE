import cn from '@/utils/cn';

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const FilterChip = ({ label, isSelected, onClick }: FilterChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'body2-m flex shrink-0 cursor-pointer items-center justify-center rounded-[1.25rem] border px-3 py-[.375rem]',
        isSelected
          ? 'border-black bg-black text-white'
          : 'border-grey03 text-grey08 bg-white'
      )}
      aria-pressed={isSelected}
    >
      {label}
    </button>
  );
};
