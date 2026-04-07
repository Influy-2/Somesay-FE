import { useState } from 'react';

import { SortBar, SearchResultProductCard } from '@/shared/components';
import type { SubcategoryProductType } from '@/features/subcategory';

type SearchSortValue = 'rating' | 'price_asc' | 'price_desc';

const SEARCH_SORT_OPTIONS: { value: SearchSortValue; label: string }[] = [
  { value: 'rating', label: '평점순' },
  { value: 'price_asc', label: '가격 낮은순' },
  { value: 'price_desc', label: '가격 높은순' },
];

interface SearchResultSectionProps {
  products: SubcategoryProductType[];
  onHeartToggle: (productId: number) => void;
}

export const SearchResultSection = ({
  products,
  onHeartToggle,
}: SearchResultSectionProps) => {
  const [currentSortValue, setCurrentSortValue] =
    useState<SearchSortValue>('rating');

  return (
    <section className="scrollbar-hide flex h-full flex-col gap-6 overflow-hidden overflow-y-auto">
      {products.length < 0 ? (
        <>
          <SortBar
            count={products.length}
            sortOptions={SEARCH_SORT_OPTIONS}
            currentSortValue={currentSortValue}
            onSelectSort={(value) =>
              setCurrentSortValue(value as SearchSortValue)
            }
          />
          <ul
            className="flex flex-col gap-6"
            aria-label="일치하는 제품 검색 결과"
          >
            {products.map((product) => (
              <li key={product.productId}>
                <SearchResultProductCard
                  product={product}
                  onHeartToggle={onHeartToggle}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 pt-25">
          <p className="body2-sb text-grey08">일치하는 검색 결과가 없습니다.</p>
          <p className="body2-m text-grey05">
            다른 키워드로 다시 검색해 보세요.
          </p>
        </div>
      )}
    </section>
  );
};
