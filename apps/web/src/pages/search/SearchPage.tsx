import { useState } from 'react';

import {
  SearchBeforeSection,
  SearchHeader,
  useRecentSearch,
  useSearchQuery,
  SelectedFiltersType,
  SearchResultSection,
} from '@/features/search';
import { MOCK_SUBCATEGORY_PRODUCTS } from '@/features/subcategory';
import type { SubcategoryProductType } from '@/features/subcategory';

export const SearchPage = () => {
  const [products, setProducts] = useState<SubcategoryProductType[]>(
    MOCK_SUBCATEGORY_PRODUCTS
  );

  const handleHeartToggle = (productId: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.productId === productId ? { ...p, isHearted: !p.isHearted } : p
      )
    );
  };

  //선택한 필터 상태
  const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersType>({
    skinType: [],
    effect: [],
    category: [],
  });

  const { items, addItem, removeItem, clearAll } = useRecentSearch();
  const {
    inputValue,
    isSearched,
    activeTab,
    setInputValue,
    handleQuerySubmit,
    handleQueryClear,
    handleTabChange,
    handleSelectRecentSearch,
  } = useSearchQuery({ addItem });

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
      {isSearched && activeTab === 'product' && (
        <SearchResultSection
          products={products}
          onHeartToggle={handleHeartToggle}
        />
      )}
    </div>
  );
};
