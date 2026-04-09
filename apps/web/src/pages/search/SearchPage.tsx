import { useState } from 'react';

import {
  SearchBeforeSection,
  SearchHeader,
  SearchResultSection,
  useRecentSearch,
  useSearchInput,
  useSearchResults,
} from '@/features/search';
import type {
  SelectedFiltersType,
  ProductSearchSortOptionType,
  ReviewSearchSortOptionType,
} from '@/features/search';

export const SearchPage = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersType>({
    skinType: [],
    effect: [],
    category: [],
  });
  const [productSortBy, setProductSortBy] =
    useState<ProductSearchSortOptionType>('rating');
  const [reviewSortBy, setReviewSortBy] =
    useState<ReviewSearchSortOptionType>('latest');
  const [heartedIds, setHeartedIds] = useState<Set<number>>(new Set());

  const { items, addItem, removeItem, clearAll } = useRecentSearch();
  const {
    query,
    inputValue,
    isSearched,
    activeTab,
    setInputValue,
    handleQuerySubmit,
    handleQueryClear,
    handleTabChange,
    handleSelectRecentSearch,
  } = useSearchInput({ addItem });

  const { products, reviews } = useSearchResults(
    query,
    selectedFilters,
    productSortBy,
    reviewSortBy
  );

  const productsWithHeart = products.map((p) => ({
    ...p,
    isHearted: heartedIds.has(p.productId) ? !p.isHearted : p.isHearted,
  }));

  const handleHeartToggle = (productId: number) => {
    setHeartedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const handleFilterSubmit = (filters: SelectedFiltersType) => {
    setSelectedFilters(filters);
  };

  const handleFilterReset = () => {
    setSelectedFilters({ skinType: [], effect: [], category: [] });
  };

  return (
    <div className="flex h-dvh flex-col bg-white">
      <SearchHeader
        value={inputValue}
        onQueryChange={(e) => setInputValue(e.target.value)}
        onQuerySubmit={handleQuerySubmit}
        onQueryClear={handleQueryClear}
        isSearched={isSearched}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        selectedFilters={selectedFilters}
        onFilterSubmit={handleFilterSubmit}
        onFilterReset={handleFilterReset}
      />
      {!isSearched && (
        <SearchBeforeSection
          recentSearches={items}
          onSelect={handleSelectRecentSearch}
          onRemove={removeItem}
          onClearAll={clearAll}
        />
      )}
      {isSearched && (
        <SearchResultSection
          activeTab={activeTab}
          products={productsWithHeart}
          reviews={reviews}
          onHeartToggle={handleHeartToggle}
          productSortBy={productSortBy}
          onProductSortChange={setProductSortBy}
          reviewSortBy={reviewSortBy}
          onReviewSortChange={setReviewSortBy}
        />
      )}
    </div>
  );
};
