// useSearchInput — URL/입력 상태 관리
// - q, tab 쿼리 파라미터 읽기/쓰기
// - inputValue (제출 전 타이핑 중인 값)
// - 제출·클리어·탭 변경·최근 검색 선택 핸들러

import { useSearchParams } from 'react-router';
import { useState } from 'react';
import { SearchTabType } from '../types/search.types';

export const useSearchInput = ({
  addItem,
}: {
  addItem: (query: string) => void;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') ?? '';

  // 타이핑 중인 값 — 제출 전까지는 URL에 반영하지 않음
  const [inputValue, setInputValue] = useState(query);

  const activeTab = (searchParams.get('tab') ?? 'product') as SearchTabType;
  const isSearched = query.length > 0;

  const handleQuerySubmit = () => {
    if (!inputValue.trim()) return;
    addItem(inputValue.trim());
    setSearchParams({ q: inputValue.trim(), tab: 'product' });
  };

  const handleQueryClear = () => {
    setInputValue('');
    setSearchParams({});
  };

  const handleTabChange = (tab: SearchTabType) => {
    setSearchParams(
      (prev) => {
        prev.set('tab', tab);
        return prev;
      },
      { replace: true }
    );
  };

  const clearTab = () => {
    setSearchParams(
      (prev) => {
        prev.delete('tab');
        return prev;
      },
      { replace: true }
    );
  };

  const handleSelectRecentSearch = (query: string) => {
    setInputValue(query);
    addItem(query);
    setSearchParams({ q: query, tab: 'product' });
  };

  return {
    query,
    inputValue,
    isSearched,
    activeTab,
    setInputValue,
    handleQuerySubmit,
    handleQueryClear,
    handleTabChange,
    clearTab,
    handleSelectRecentSearch,
  };
};
