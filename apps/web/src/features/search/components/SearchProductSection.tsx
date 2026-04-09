import { useState } from 'react';

import { SortBar, SearchResultProductCard } from '@/shared/components';
import type { SubcategoryProductType } from '@/features/subcategory';

type SearchSortValue = 'rating' | 'price_asc' | 'price_desc';

const SEARCH_SORT_OPTIONS: { value: SearchSortValue; label: string }[] = [
  { value: 'rating', label: '평점순' },
  { value: 'price_asc', label: '가격 낮은순' },
  { value: 'price_desc', label: '가격 높은순' },
];

interface SearchProductSectionProps {
  products: SubcategoryProductType[];
  onHeartToggle: (productId: number) => void;
}

export const SearchProductSection = ({
  products,
  onHeartToggle,
}: SearchProductSectionProps) => {
  const [currentSortValue, setCurrentSortValue] =
    useState<SearchSortValue>('rating');

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 pt-25">
        <p className="body2-sb text-grey08">일치하는 검색 결과가 없습니다.</p>
        <p className="body2-m text-grey05">다른 키워드로 다시 검색해 보세요.</p>
      </div>
    );
  }

  return (
    <>
      <SortBar
        count={products.length}
        sortOptions={SEARCH_SORT_OPTIONS}
        currentSortValue={currentSortValue}
        onSelectSort={(value) => setCurrentSortValue(value as SearchSortValue)}
      />
      <ul className="flex flex-col" aria-label="일치하는 제품 검색 결과">
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
  );
};
