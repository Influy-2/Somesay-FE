import { useNavigate } from 'react-router';

import { ArrowBackIcon } from '@/shared/icons';
import { SearchBar, SearchFilterChip, TabBar } from '@/shared/components';

type SearchTab = 'product' | 'review';

interface SearchFilterState {
  skinType: boolean;
  effect: boolean;
  category: boolean;
}

interface SearchHeaderProps {
  value: string;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onQuerySubmit: () => void;
  onQueryClear: () => void;
  isSearched: boolean;
  activeTab: SearchTab;
  onTabChange: (tab: SearchTab) => void;
  filterState: SearchFilterState;
  onFilterChange: (filter: keyof SearchFilterState) => void;
}

export const SearchHeader = ({
  value,
  onQueryChange,
  onQuerySubmit,
  onQueryClear,
  isSearched,
  activeTab,
  onTabChange,
  filterState,
  onFilterChange,
}: SearchHeaderProps) => {
  const navigate = useNavigate();

  return (
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
            tabs={[
              {
                tabText: '일치하는 제품',
                isActive: activeTab === 'product',
                onClick: () => onTabChange('product'),
              },
              {
                tabText: '일치하는 리뷰',
                isActive: activeTab === 'review',
                onClick: () => onTabChange('review'),
              },
            ]}
          />
          {/* 필터 칩 */}
          <div
            role="group"
            aria-label="검색 결과 필터"
            className="flex gap-3 px-4 pt-4"
          >
            <SearchFilterChip
              label="피부 타입"
              isSelected={filterState.skinType}
              onClick={() => onFilterChange('skinType')}
            />
            <SearchFilterChip
              label="기대효과"
              isSelected={filterState.effect}
              onClick={() => onFilterChange('effect')}
            />
            <SearchFilterChip
              label="카테고리"
              isSelected={filterState.category}
              onClick={() => onFilterChange('category')}
            />
          </div>
          {/* 상단 최근 검색 글씨, 전체삭제 버튼 영역 */}
          <div className="body2-m flex items-center justify-between">
            <span className="text-grey08">최근 검색</span>
            전체 삭제
          </div>
        </>
      )}
    </header>
  );
};
