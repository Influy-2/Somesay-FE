import { RecentSearchItem } from './RecentSearchItem';

import type { RecentSearchItemType } from '../search.types';

interface SearchBeforeSectionProps {
  recentSearches: RecentSearchItemType[];
  onSelect: (query: string) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export const SearchBeforeSection = ({
  recentSearches,
  onSelect,
  onRemove,
  onClearAll,
}: SearchBeforeSectionProps) => {
  // 최근 검색 내역이 없는 경우
  if (recentSearches.length === 0) {
    return (
      <div className="flex justify-center pt-[6.25rem]">
        <p className="body2-m text-grey05">최근 검색어 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <section
      aria-label="최근 검색어"
      className="scrollbar-hide flex h-full flex-col gap-5 overflow-auto px-4 pt-3"
    >
      {/* 상단 최근 검색 글씨, 전체삭제 버튼 영역 */}
      <div className="flex items-center justify-between">
        <span className="body2-m text-grey08">최근 검색</span>
        <button
          type="button"
          className="body2-m text-grey06"
          onClick={onClearAll}
        >
          전체 삭제
        </button>
      </div>

      {/* 최근 검색어 */}
      <ul className="flex flex-col gap-5">
        {recentSearches.map((item) => (
          <RecentSearchItem
            key={item.id}
            item={item}
            onSelect={onSelect}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </section>
  );
};
