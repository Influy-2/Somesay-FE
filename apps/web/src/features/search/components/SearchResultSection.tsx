import type {
  ProductSearchResultType,
  ReviewSearchResultType,
} from '@somesay/shared';

import { SearchProductSection } from './SearchProductSection';
import { SearchReviewSection } from './SearchReviewSection';
import { NoResultMessage } from './NoResultMessage';
import type {
  SearchTabType,
  ProductSearchSortOptionType,
  ReviewSearchSortOptionType,
} from '../types/search.types';

interface SearchResultSectionProps {
  activeTab: SearchTabType;
  products: ProductSearchResultType[];
  reviews: ReviewSearchResultType[];
  onHeartToggle: (productId: number) => void;
  productSortBy: ProductSearchSortOptionType;
  onProductSortChange: (value: ProductSearchSortOptionType) => void;
  reviewSortBy: ReviewSearchSortOptionType;
  onReviewSortChange: (value: ReviewSearchSortOptionType) => void;
}

export const SearchResultSection = ({
  activeTab,
  products,
  reviews,
  onHeartToggle,
  productSortBy,
  onProductSortChange,
  reviewSortBy,
  onReviewSortChange,
}: SearchResultSectionProps) => {
  return (
    <section className="scrollbar-hide flex h-full flex-col overflow-auto pb-[3.375rem]">
      {activeTab === 'product' && products.length > 0 && (
        <SearchProductSection
          products={products}
          onHeartToggle={onHeartToggle}
          sortBy={productSortBy}
          onSortChange={onProductSortChange}
        />
      )}
      {activeTab === 'review' && reviews.length > 0 && (
        <SearchReviewSection
          reviews={reviews}
          sortBy={reviewSortBy}
          onSortChange={onReviewSortChange}
        />
      )}
      {reviews.length === 0 && products.length === 0 && <NoResultMessage />}
    </section>
  );
};
