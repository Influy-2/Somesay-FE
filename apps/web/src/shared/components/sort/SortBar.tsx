import { ToggleDownIcon } from '@/shared/icons';

interface SortBarProps {
  productCount: number;
  sortLabel?: string;
}

export const SortBar = ({
  productCount,
  sortLabel = '인기순',
}: SortBarProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="body2-m text-grey08" aria-live="polite">
        {productCount.toLocaleString()}개
      </span>
      <button
        type="button"
        className="flex items-center gap-1"
        aria-label={`정렬 옵션 열기, 현재 ${sortLabel}`}
      >
        <span className="body2-m">{sortLabel}</span>
        <ToggleDownIcon aria-hidden="true" />
      </button>
    </div>
  );
};
