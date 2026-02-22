import { ChipLarge } from '@/shared/components';
import MainArrowIcon from '@/shared/icons/MainArrowIcon.svg?react';
interface TypeRowProps {
  label: string;
  selectedItems: string[];
  onPress: () => void;
}

export const TypeRow = ({ label, selectedItems, onPress }: TypeRowProps) => {
  const hasSelection = selectedItems.length > 0;
  const selectionText = hasSelection ? selectedItems.join(', ') : '선택 안 됨';

  return (
    <div
      aria-label={`${label}: ${selectionText}`}
      className="flex w-full items-center justify-between self-stretch px-3 py-5 first:pt-0 last:pb-0"
    >
      <span aria-hidden="true" className="body1-sb text-black">
        {label}
      </span>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {selectedItems.map((item) => (
            <ChipLarge key={item} label={item} />
          ))}
        </div>

        <button
          type="button"
          onClick={onPress}
          aria-expanded={false}
          aria-haspopup="dialog"
          className="cursor-pointer"
          aria-label={`${label} 선택하기`}
        >
          <MainArrowIcon />
        </button>
      </div>
    </div>
  );
};
