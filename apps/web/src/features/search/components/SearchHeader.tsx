import { useNavigate } from 'react-router';
import { useState } from 'react';
import { ArrowBackIcon } from '@/shared/icons';
import { SearchBar, SearchFilter, TabBar } from '@/shared/components';
import type {
  SearchFilterGroupType,
  SelectedFiltersType,
  FilterOptionType,
  SearchTabType,
} from '../types/search.types';

const SEARCH_TABS = [
  { tabText: '일치하는 제품', value: 'product' },
  { tabText: '일치하는 리뷰', value: 'review' },
] as const;

const FILTER_GROUP_CONFIG: {
  key: SearchFilterGroupType;
  placeholder: string;
}[] = [
  { key: 'skinType', placeholder: '피부 타입' },
  { key: 'effect', placeholder: '기대효과' },
  { key: 'category', placeholder: '카테고리' },
];

interface SearchHeaderProps {
  value: string;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onQuerySubmit: () => void;
  onQueryClear: () => void;
  isSearched: boolean;
  activeTab: SearchTabType;
  onTabChange: (tab: SearchTabType) => void;
  selectedFilters: SelectedFiltersType;
  onFilterApply: (key: SearchFilterGroupType, value: FilterOptionType) => void;
}

export const SearchHeader = ({
  value,
  onQueryChange,
  onQuerySubmit,
  onQueryClear,
  isSearched,
  activeTab,
  onTabChange,
  selectedFilters,
  onFilterApply,
}: SearchHeaderProps) => {
  // 필터 바텀시트
  const [isFilterBottomSheetOpen, setIsFilterBottomSheetOpen] = useState(false);
  const [activeFilterGroup, setActiveFilterGroup] =
    useState<SearchFilterGroupType | null>(null);

  const navigate = useNavigate();

  const handleFilterGroupToggle = (filterGroup: SearchFilterGroupType) => {
    setActiveFilterGroup(filterGroup);
    setIsFilterBottomSheetOpen(true);
  };

  return (
    <>
      <header className="z-header flex h-fit flex-col bg-white">
        {/* 상단 검색창 */}
        <div className="flex items-center gap-2 px-4 py-2.5">
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
            value={value}
            onChange={onQueryChange}
            onSubmit={onQuerySubmit}
            onClear={onQueryClear}
            autoFocus
          />
        </div>

        {/* 검색 결과 있을 때 */}
        {isSearched && (
          <>
            <TabBar
              tabs={SEARCH_TABS.map((tab) => ({
                tabText: tab.tabText,
                isActive: activeTab === tab.value,
                onClick: () => onTabChange(tab.value),
              }))}
            />
            {/* 필터 칩 */}
            <div
              role="group"
              aria-label="검색 결과 필터"
              className="flex gap-3 px-4 pt-4"
            >
              {FILTER_GROUP_CONFIG.map(({ key, placeholder }) => (
                <SearchFilter
                  key={key}
                  placeholder={placeholder}
                  selectedLabel={selectedFilters[key].map((v) => v.label)}
                  onClick={() => handleFilterGroupToggle(key)}
                />
              ))}
            </div>
          </>
        )}
      </header>
      {isFilterBottomSheetOpen && (
        <div onClick={() => onFilterApply}>{activeFilterGroup}</div>
      )}
    </>
  );
};
