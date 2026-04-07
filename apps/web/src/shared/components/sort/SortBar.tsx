import { useState } from 'react';
import { ToggleDownIcon } from '@/shared/icons';
import { BottomSheet } from '@/shared/components';
import cn from '@/utils/cn';
//이 수 넘기면 9999+로 표현
const COUNT_OVERFLOW_THRESHOLD = 9999;

interface SortOption {
  value: string;
  label: string;
}

interface SortBarProps {
  count: number;
  sortOptions: SortOption[];
  currentSortValue: string;
  onSelectSort: (value: string) => void;
}

export const SortBar = ({
  count,
  sortOptions,
  currentSortValue,
  onSelectSort,
}: SortBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === currentSortValue)?.label ??
    sortOptions[0]?.label;

  const handleSelect = (value: string) => {
    onSelectSort(value);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex h-4 items-center justify-between">
        {/* 좌측 개수 */}
        <span className="body2-m text-grey08" aria-live="polite">
          {count >= COUNT_OVERFLOW_THRESHOLD
            ? `${COUNT_OVERFLOW_THRESHOLD.toLocaleString()}+개`
            : `${count.toLocaleString()}개`}
        </span>

        {/* 우측 정렬 드롭다운 */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label={`정렬 옵션 열기, 현재 ${currentSortLabel}`}
          className="flex cursor-pointer items-center justify-center gap-1"
        >
          <span className="body2-m" aria-hidden="true">
            {currentSortLabel}
          </span>
          <ToggleDownIcon aria-hidden="true" />
        </button>
      </div>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        ariaLabel="정렬 선택"
        height="min-h-[30vh]"
      >
        <ul className="divide-grey03 flex flex-col gap-5 divide-y px-4 pb-8">
          {sortOptions.map((option) => (
            <li key={option.value}>
              <button
                className={cn(
                  'body1-sb w-full cursor-pointer pb-5 text-left',
                  currentSortValue === option.value
                    ? 'text-black'
                    : 'text-grey05'
                )}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </BottomSheet>
    </>
  );
};
