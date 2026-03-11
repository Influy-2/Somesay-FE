// 1.5 상품 목록의 카테고리 탭 컴포넌트
import cn from '@/utils/cn';

export type CategoryType = {
  id: string;
  label: string;
};

interface HorizontalCategoryTabProps {
  categories: CategoryType[];
  selectedId: string;
  onSelect: (id: string) => void;
  ariaLabel: string;
}

export const HorizontalCategoryTab = ({
  categories,
  selectedId,
  onSelect,
  ariaLabel,
}: HorizontalCategoryTabProps) => {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="scrollbar-hide flex items-center gap-2 self-stretch overflow-x-auto"
    >
      {categories.map((category) => (
        <button
          key={category.id}
          role="tab"
          type="button"
          aria-selected={selectedId === category.id}
          onClick={() => onSelect(category.id)}
          className={cn(
            'flex shrink-0 items-center justify-center border border-solid px-3 py-1.5 whitespace-nowrap transition-colors',
            selectedId === category.id
              ? 'border-black text-black'
              : 'border-grey02 text-grey06'
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};
