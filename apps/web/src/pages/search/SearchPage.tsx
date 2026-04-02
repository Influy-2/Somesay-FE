import { useState } from 'react';

import {
  SearchBeforeSection,
  SearchHeader,
  useRecentSearch,
  SearchFilterGroupType,
  useSearchQuery,
  SelectedFiltersType,
  FilterOptionType,
} from '@/features/search';

export const SearchPage = () => {
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

  // 바텀시트에서 필터 선택 후 '적용' 버튼 누르기
  const handleFilterApply = (
    key: SearchFilterGroupType,
    value: FilterOptionType
  ) => {
    setSelectedFilters((prev) => {
      const list = prev[key] as FilterOptionType[];
      return {
        ...prev,
        [key]: list.includes(value)
          ? prev[key].filter((v) => v !== value)
          : [...prev[key], value],
      };
    });
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
        onFilterApply={handleFilterApply}
      />
      {!isSearched && (
        <SearchBeforeSection
          recentSearches={items}
          onSelect={handleSelectRecentSearch}
          onRemove={removeItem}
          onClearAll={clearAll}
        />
      )}
      {/* TODO: 8.2 isSearched && <SearchResultsSection activeTab={activeTab} filterState={filterState} /> */}
    </div>
  );
};
