import { RecentSearchIcon, X16Icon } from '@/shared/icons';

import type { RecentProductSearchItem } from '../types/productSelection.types';

// 통합 검색 feature(SearchBeforeSection·RecentSearchItem)를 import하지 않으려고
// 마크업을 이 파일에 복제했습니다. feature 간 의존을 만들지 않기 위함입니다.

// 목록과 사용자 동작 콜백을 받는 props입니다.
interface RecentProductSearchListProps {
  items: RecentProductSearchItem[];
  onSelect: (query: string) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export const RecentProductSearchList = ({
  items,
  onSelect,
  onRemove,
  onClearAll,
}: RecentProductSearchListProps) => {
  // 기록이 없으면 안내 문구만 보여줍니다.
  if (items.length === 0) {
    return (
      <p className="body2-m text-grey05 py-24 text-center">
        최근 검색어 내역이 없습니다.
      </p>
    );
  }

  return (
    <section aria-label="최근 검색어" className="flex flex-col gap-5 px-4 pt-3">
      {/* 상단 영역: 제목과 전체 삭제 버튼 */}
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

      {/* 검색어 목록: 항목마다 선택 버튼과 삭제 버튼 */}
      <ul className="flex flex-col gap-5">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-2">
            {/* 검색어를 눌러 바로 다시 검색합니다. */}
            <button
              type="button"
              className="flex min-w-0 items-center gap-2 text-left"
              onClick={() => onSelect(item.query)}
            >
              <RecentSearchIcon aria-hidden="true" className="shrink-0" />
              <span className="body2-m min-w-0 break-all text-black">
                {item.query}
              </span>
            </button>
            {/* 해당 검색어만 기록에서 지웁니다. */}
            <button
              type="button"
              aria-label={`${item.query} 검색어 삭제`}
              onClick={() => onRemove(item.id)}
              className="shrink-0"
            >
              <X16Icon aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
