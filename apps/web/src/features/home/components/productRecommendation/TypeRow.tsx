import { ChipLarge } from '@/shared/components';
import { MainArrowIcon } from '@/shared/icons';
import type { GuestPreviewChip } from './useGuestPreviewChips';

interface TypeRowProps {
  rowTitle: string;
  selectedFilters: string[];
  previewChips?: GuestPreviewChip[];
  onPress: () => void;
}

export const TypeRow = ({
  rowTitle,
  selectedFilters,
  previewChips = [],
  onPress,
}: TypeRowProps) => {
  const hasSelection = selectedFilters.length > 0;
  const visiblePreviewChips = hasSelection ? [] : previewChips;
  const selectionText = hasSelection
    ? selectedFilters.join(', ')
    : '선택 안 됨';

  return (
    <div
      aria-label={`${rowTitle}: ${selectionText}`}
      className="flex w-full flex-wrap items-center justify-between px-3 py-5 first:pt-0 last:pb-0"
    >
      <span
        aria-hidden="true"
        className="body1-sb whitespace-nowrap text-black"
      >
        {rowTitle}
      </span>
      <div className="flex flex-1 items-center gap-3">
        <div className="flex h-7.25 flex-1 flex-wrap items-center justify-end gap-2">
          {/* 칩 미선택시 */}
          <div
            aria-hidden="true"
            className="flex items-center justify-end gap-2"
          >
            {visiblePreviewChips.map(({ id, label, color }) => (
              <div key={id} className="guest-preview-chip">
                <ChipLarge label={label} color={color} />
              </div>
            ))}
          </div>

          {/* 칩 선택시 */}
          {selectedFilters.map((item) => (
            <ChipLarge key={item} label={item} color={'gray02'} />
          ))}
        </div>

        <button
          type="button"
          onClick={onPress}
          aria-expanded={false}
          aria-haspopup="dialog"
          className="cursor-pointer"
          aria-label={`${rowTitle} 선택하기`}
        >
          <MainArrowIcon />
        </button>
      </div>
    </div>
  );
};
