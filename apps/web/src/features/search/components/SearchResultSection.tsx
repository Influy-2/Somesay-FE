import { useState } from 'react';
import { SortBar } from '@/shared/components';

type SearchSortValue = 'rating' | 'price_asc' | 'price_desc';

const SEARCH_SORT_OPTIONS: { value: SearchSortValue; label: string }[] = [
  { value: 'rating', label: '평점순' },
  { value: 'price_asc', label: '가격 낮은순' },
  { value: 'price_desc', label: '가격 높은순' },
];

const MOCK_RESULT_COUNT = 9999;

export const SearchResultSection = () => {
  const [currentSortValue, setCurrentSortValue] =
    useState<SearchSortValue>('rating');

  return (
    <section className="flex h-full flex-col">
      <div className="bg-white px-4 py-3.5">
        <SortBar
          count={MOCK_RESULT_COUNT}
          sortOptions={SEARCH_SORT_OPTIONS}
          currentSortValue={currentSortValue}
          onSelectSort={(value) =>
            setCurrentSortValue(value as SearchSortValue)
          }
        />
      </div>
    </section>
  );
};
