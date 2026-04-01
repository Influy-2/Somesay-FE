import { useState } from 'react';
import { useSearchParams } from 'react-router';

import {
  SearchBeforeSection,
  SearchHeader,
  useRecentSearch,
} from '@/features/search';

type SearchTab = 'product' | 'review';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q') ?? '';
  const activeTab = (searchParams.get('tab') ?? 'product') as SearchTab;
  const isSearched = q.length > 0;

  // 타이핑 중인 값 — 제출 전까지는 URL에 반영하지 않음
  const [inputValue, setInputValue] = useState(q);

  const [filterState, setFilterState] = useState({
    skinType: false,
    effect: false,
    category: false,
  });

  const { items, addItem, removeItem, clearAll } = useRecentSearch();

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    addItem(inputValue.trim());
    setSearchParams({ q: inputValue.trim(), tab: 'product' });
  };

  const handleClear = () => {
    setInputValue('');
    setSearchParams({});
  };

  const handleSelectRecentSearch = (query: string) => {
    setInputValue(query);
    addItem(query);
    setSearchParams({ q: query, tab: 'product' });
  };

  const handleTabChange = (tab: SearchTab) => {
    setSearchParams((prev) => {
      prev.set('tab', tab);
      return prev;
    });
  };

  const handleFilterChange = (filter: keyof typeof filterState) => {
    setFilterState((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  return (
    <div className="flex h-dvh flex-col bg-white">
      <SearchHeader
        value={inputValue}
        onQueryChange={(e) => setInputValue(e.target.value)}
        onQuerySubmit={handleSubmit}
        onQueryClear={handleClear}
        isSearched={isSearched}
        activeTab={activeTab}
        onTabChange={handleTabChange}
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
