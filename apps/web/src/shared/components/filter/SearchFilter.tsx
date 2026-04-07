// filter/검색필터 컴포넌트
import ToggleDownIcon from '@/shared/icons/ToggleDownIcon.svg?react';
import cn from '@/utils/cn';

interface SearchFilterProps {
  placeholder: string;
  selectedLabel: string[];
  onClick: () => void;
}

export const SearchFilter = ({
  placeholder,
  selectedLabel,
  onClick,
}: SearchFilterProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'bg-grey02 body2-m inline-flex cursor-pointer items-center justify-center gap-1 rounded-[1.25rem] px-2.5 py-1 whitespace-nowrap',
        selectedLabel.length > 0 ? 'text-grey01 bg-black' : 'text-grey06'
      )}
    >
      <span className="body2-m whitespace-nowrap">
        {selectedLabel.length > 0 ? selectedLabel.join(', ') : placeholder}
      </span>
      <ToggleDownIcon className="size-[.625rem]" aria-hidden="true" />
    </button>
  );
};
