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
      onClick={() => onClick}
      className={cn(
        'bg-grey02 body2-m inline-flex items-center justify-center gap-1 rounded-[1.25rem] border px-2.5 py-1 whitespace-nowrap',
        selectedLabel.length > 0
          ? 'border-black text-black'
          : 'text-grey06 border-transparent'
      )}
    >
      {selectedLabel.length > 0 ? (
        <></>
      ) : (
        <span className="body2-m whitespace-nowrap">{placeholder}</span>
      )}
      <ToggleDownIcon className="size-[.625rem]" aria-hidden="true" />
    </button>
  );
};
