import { SortBar, SearchResultProductCard } from '@/shared/components';
import type { ProductSearchResultType } from '@somesay/shared';

import type { ProductSearchSortOptionType } from '../types/search.types';
import { NoResultMessage } from './NoResultMessage';

const PRODUCT_SORT_OPTIONS: {
  value: ProductSearchSortOptionType;
  label: string;
}[] = [
  { value: 'rating', label: '평점순' },
  { value: 'price_asc', label: '가격 낮은순' },
  { value: 'price_desc', label: '가격 높은순' },
];

interface SearchProductSectionProps {
  products: ProductSearchResultType[];
  onHeartToggle: (productId: number) => void;
  sortBy: ProductSearchSortOptionType;
  onSortChange: (value: ProductSearchSortOptionType) => void;
}

export const SearchProductSection = ({
  products,
  onHeartToggle,
  sortBy,
  onSortChange,
}: SearchProductSectionProps) => {
  if (products.length === 0) {
    return <NoResultMessage />;
  }

  return (
    <>
      <SortBar
        count={products.length}
        sortOptions={PRODUCT_SORT_OPTIONS}
        currentSortValue={sortBy}
        onSelectSort={(value) =>
          onSortChange(value as ProductSearchSortOptionType)
        }
      />
      <ul
        className="mt-6 flex flex-col gap-6"
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
  );
};
