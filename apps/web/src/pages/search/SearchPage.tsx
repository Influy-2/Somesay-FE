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

  const handleHeartToggle = () => {};

  const handleFilterSubmit = (filters: SelectedFiltersType) => {
    setSelectedFilters(filters);
  };

  const handleFilterReset = () => {
    setSelectedFilters({ skinType: [], effect: [], category: [] });
  };

  return (
    <div className="flex h-dvh flex-col bg-white">
      {/* @spec 8.1.1, 8.1.3 */}
      <SearchHeader
        value={inputValue}
        onQueryChange={(e) => setInputValue(e.target.value)}
        onQuerySubmit={handleQuerySubmit}
        onQueryClear={handleQueryClear}
        isSearchResult={products.length > 0 || reviews.length > 0}
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
        /* @spec 8.2.1, 8.2.2, 8.2.3, 8.2.4, 8.2.5, 8.2.7 */
        <SearchResultSection
          activeTab={activeTab}
          products={products}
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
