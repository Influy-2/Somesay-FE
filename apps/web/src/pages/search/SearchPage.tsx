import { useState } from 'react';
import { useNavigate } from 'react-router';

import { ArrowBackIcon } from '@/shared/icons';
import { SearchBar } from '@/shared/components';
import { SearchBeforeSection, useRecentSearch } from '@/features/search';

export const SearchPage = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { items, addItem, removeItem, clearAll } = useRecentSearch();

  const handleSubmit = () => {
    if (!searchValue.trim()) return;
    addItem(searchValue.trim());
    // TODO: 8.2 검색 결과 페이지로 이동
  };

  const handleSelectRecentSearch = (query: string) => {
    setSearchValue(query);
    addItem(query);
    // TODO: 8.2 검색 결과 페이지로 이동
  };

  return (
    <div className="flex h-dvh flex-col bg-white">
      <header className="z-header flex h-fit items-center gap-2 bg-white px-4 py-2.5">
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={() => navigate(-1)}
          className="shrink-0"
        >
          <ArrowBackIcon aria-hidden="true" />
        </button>
        <SearchBar
          placeholder="내돈내산 후기가 궁금한 상품을 검색해보세요"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={handleSubmit}
          onClear={() => setSearchValue('')}
          autoFocus
        />
      </header>
      <>
        <SearchBeforeSection
          recentSearches={items}
          onSelect={handleSelectRecentSearch}
          onRemove={removeItem}
          onClearAll={clearAll}
        />
      </>
    </div>
  );
};
