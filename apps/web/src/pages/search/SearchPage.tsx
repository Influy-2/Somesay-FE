import { useState } from 'react';

import {
  SearchBeforeSection,
  SearchHeader,
  useRecentSearch,
} from '@/features/search';

type SearchTab = 'product' | 'review';

export const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<SearchTab>('product');
  const [filterState, setFilterState] = useState({
    skinType: false,
    effect: false,
    category: false,
  });

  const { items, addItem, removeItem, clearAll } = useRecentSearch();

  const handleSubmit = () => {
    if (!searchValue.trim()) return;
    addItem(searchValue.trim());
    setIsSearched(true);
    // TODO: 8.2 검색 결과 불러오기
  };

  const handleClear = () => {
    setSearchValue('');
    setIsSearched(false);
  };

  const handleSelectRecentSearch = (query: string) => {
    setSearchValue(query);
    addItem(query);
    setIsSearched(true);
    // TODO: 8.2 검색 결과 불러오기
  };

  const handleFilterChange = (filter: keyof typeof filterState) => {
    setFilterState((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  return (
    <div className="flex h-dvh flex-col bg-white">
      <SearchHeader
        value={searchValue}
        onQueryChange={(e) => setSearchValue(e.target.value)}
        onQuerySubmit={handleSubmit}
        onQueryClear={handleClear}
        isSearched={isSearched}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        filterState={filterState}
        onFilterChange={handleFilterChange}
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
