interface SortBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentSortValue: string;
  onSelectSort: (value: string) => void;
}

export const SORT_OPTIONS = [
  { value: 'rating', label: '평점순' },
  { value: 'review', label: '리뷰 많은 순' },
  { value: 'price_low', label: '가격 낮은 순' },
];

export function SortBottomSheet({
  isOpen,
  onClose,
  currentSortValue,
  onSelectSort,
}: SortBottomSheetProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-y-0 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 items-end bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full rounded-t-2xl bg-white px-5 pt-3 pb-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-gray-300" />

        <ul className="flex flex-col">
          {SORT_OPTIONS.map((option, index) => {
            const isSelected = currentSortValue === option.value;
            return (
              <li key={option.value}>
                <button
                  className={`w-full py-4 text-left text-[15px] ${
                    isSelected
                      ? 'font-bold text-black'
                      : 'font-medium text-gray-400'
                  }`}
                  onClick={() => onSelectSort(option.value)}
                >
                  {option.label}
                </button>
                {index !== SORT_OPTIONS.length - 1 && (
                  <hr className="border-gray-100" />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
