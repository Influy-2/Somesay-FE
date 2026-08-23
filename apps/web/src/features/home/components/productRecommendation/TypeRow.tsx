import { ChipLarge, getPastelChipColor } from '@/shared/components';
import { MainArrowIcon } from '@/shared/icons';

// 위 행부터 차례로, 한 행 안에서도 왼쪽 칩부터 튀어오르도록 시간차를 둡니다.
// Tailwind는 클래스 문자열을 정적으로 수집하므로 조합을 미리 적어 둡니다.
const CHIP_POP_DELAY_CLASSES = [
  ['[animation-delay:0ms]', '[animation-delay:60ms]'],
  ['[animation-delay:140ms]', '[animation-delay:200ms]'],
  ['[animation-delay:280ms]', '[animation-delay:340ms]'],
];

interface TypeRowProps {
  rowTitle: string;
  selectedFilters: string[];
  onPress: () => void;
  /** 파스텔 팔레트 순환의 시작 인덱스 (행을 넘어 이어지는 색 순서) */
  paletteStartIndex?: number;
  /** 등장 애니메이션 시간차를 정하는 행 순서 */
  rowIndex?: number;
}

export const TypeRow = ({
  rowTitle,
  selectedFilters,
  onPress,
  paletteStartIndex = 0,
  rowIndex = 0,
}: TypeRowProps) => {
  const hasSelection = selectedFilters.length > 0;
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
          {selectedFilters.map((item, index) => (
            <div
              key={item}
              className={`animate-chip-pop ${CHIP_POP_DELAY_CLASSES[rowIndex]?.[index] ?? ''}`}
            >
              <ChipLarge
                label={item}
                color={getPastelChipColor(paletteStartIndex + index)}
              />
            </div>
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
