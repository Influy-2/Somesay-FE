import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { SortBottomSheet, SORT_OPTIONS } from './SortBottomSheet';
import ToggleDownIcon from '@/shared/icons/ToggleDownIcon.svg?react';

interface SubCategorySortBarProps {
  productCount: number;
}

export function SubCategorySortBar({ productCount }: SubCategorySortBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentSortValue = searchParams.get('sort') || 'rating';
  const currentSortLabel =
    SORT_OPTIONS.find((opt) => opt.value === currentSortValue)?.label ||
    '평점순';

  const handleSelectSort = (value: string) => {
    searchParams.set('sort', value);
    setSearchParams(searchParams);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex h-4 items-center justify-between px-4">
        <span className="body-2m text-grey08" aria-live="polite">
          {productCount.toLocaleString()}개
        </span>
        <div className="flex items-center gap-1">
          <span className="body-2m" aria-hidden="true">
            {currentSortLabel}
          </span>
          <button
            onClick={() => setIsModalOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isModalOpen}
            aria-label={`정렬 옵션 열기, 현재 ${currentSortLabel}`}
            className="flex items-center justify-center p-1"
          >
            <ToggleDownIcon aria-hidden="true" />
          </button>
        </div>
      </div>

      <SortBottomSheet
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentSortValue={currentSortValue}
        onSelectSort={handleSelectSort}
      />
    </>
  );
}
