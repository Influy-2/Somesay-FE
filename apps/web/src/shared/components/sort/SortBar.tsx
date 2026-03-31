import { useState } from 'react';
import { ToggleDownIcon } from '@/shared/icons';
import { BottomSheet } from '@/shared/components';

interface SortOption {
  value: string;
  label: string;
}

interface SortBarProps {
  productCount: number;
  sortOptions: SortOption[];
  currentSortValue: string;
  onSelectSort: (value: string) => void;
}

export const SortBar = ({
  productCount,
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
        <span className="body2-m text-grey08" aria-live="polite">
          {productCount.toLocaleString()}개
        </span>
        <div className="flex items-center gap-1">
          <span className="body2-m" aria-hidden="true">
            {currentSortLabel}
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-label={`정렬 옵션 열기, 현재 ${currentSortLabel}`}
            className="flex items-center justify-center p-1"
          >
            <ToggleDownIcon aria-hidden="true" />
          </button>
        </div>
      </div>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        ariaLabel="정렬 선택"
      >
        <ul className="flex flex-col px-5 pb-8">
          {sortOptions.map((option, index) => (
            <li key={option.value}>
              <button
                className={`w-full py-4 text-left text-[15px] ${
                  currentSortValue === option.value
                    ? 'font-bold text-black'
                    : 'font-medium text-gray-400'
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
              {index !== sortOptions.length - 1 && (
                <hr className="border-gray-100" />
              )}
            </li>
          ))}
        </ul>
      </BottomSheet>
    </>
  );
};
