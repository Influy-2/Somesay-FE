import { ChipLarge } from '@/shared/components';
import MainArrowIcon from '@/shared/icons/MainArrowIcon.svg?react';

interface TypeRowProps {
  rowTitle: string;
  selectedFilters: string[];
  onPress: () => void;
  category: string;
}

export const TypeRow = ({
  rowTitle,
  category,
  selectedFilters,
  onPress,
}: TypeRowProps) => {
  const hasSelection = selectedFilters.length > 0;
  const selectionText = hasSelection
    ? selectedFilters.join(', ')
    : '선택 안 됨';

  return (
    <div
      aria-label={`${rowTitle}: ${selectionText}`}
      className="flex w-full flex-wrap items-center justify-between px-3 py-5 first:pt-0 last:pb-0"
    >
      <span
        aria-hidden="true"
        className="body1-sb whitespace-nowrap text-black"
      >
        {rowTitle}
      </span>
      <div className="flex flex-1 items-center gap-3">
        <div className="flex h-7.25 flex-1 flex-wrap items-center justify-end gap-2">
          {selectedFilters.map((item) => (
            <ChipLarge
              key={item}
              label={item}
              bgColor={
                category === 'skinConcern'
                  ? 'bg-[#A9A9A9]'
                  : category === 'skinType'
                    ? 'bg-grey05'
                    : 'bg-[#D9D9D9]'
              }
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onPress}
          aria-expanded={false}
          aria-haspopup="dialog"
          className="cursor-pointer"
          aria-label={`${rowTitle} 선택하기`}
        >
          <MainArrowIcon />
        </button>
      </div>
    </div>
  );
};
