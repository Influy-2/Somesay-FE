import { RecentSearchIcon, X16Icon } from '@/shared/icons';

import type { RecentSearchItemType } from '../search.types';

interface RecentSearchItemProps {
  item: RecentSearchItemType;
  onSelect: (query: string) => void;
  onRemove: (id: string) => void;
}

export const RecentSearchItem = ({
  item,
  onSelect,
  onRemove,
}: RecentSearchItemProps) => {
  return (
    <li className="flex items-center justify-between">
      <button
        type="button"
        className="flex items-center gap-2 text-left"
        onClick={() => onSelect(item.query)}
      >
        <RecentSearchIcon aria-hidden="true" className="shrink-0" />
        <span className="body2-m wrap-break-words max-w-75.5 text-black">
          {item.query}
        </span>
      </button>
      <button
        type="button"
        aria-label={`${item.query} 검색어 삭제`}
        onClick={() => onRemove(item.id)}
        className="shrink-0"
      >
        <X16Icon aria-hidden="true" />
      </button>
    </li>
  );
};
