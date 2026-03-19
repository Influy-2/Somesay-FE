import cn from '@/utils/cn';

interface FilterChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const FilterChip = ({ label, selected, onClick }: FilterChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'body2-m flex shrink-0 items-center justify-center rounded-[1.25rem] border px-3 py-[.375rem]',
        selected
          ? 'border-black bg-black text-white'
          : 'border-grey03 text-grey08 bg-white'
      )}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
};
