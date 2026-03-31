// 1.5 상품 목록의 카테고리 탭 컴포넌트
import cn from '@/utils/cn';
import { CategoryType } from '@somesay/shared';

interface HorizontalCategoriesTabProps {
  categories: CategoryType[];
  selectedId: number;
  onSelect: (id: number) => void;
  ariaLabel: string;
}

export const HorizontalCategoriesTab = ({
  categories,
  selectedId,
  onSelect,
  ariaLabel,
}: HorizontalCategoriesTabProps) => {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="scrollbar-hide flex items-center gap-2 self-stretch overflow-x-auto"
    >
      {categories.map((category) => (
        <button
          key={category.categoryId}
          role="tab"
          type="button"
          aria-selected={selectedId === category.categoryId}
          onClick={() => onSelect(category.categoryId)}
          className={cn(
            'body2-m flex shrink-0 cursor-pointer items-center justify-center border border-solid px-3 py-1.5',
            selectedId === category.categoryId
              ? 'border-black text-black'
              : 'border-grey02 text-grey06'
          )}
        >
          {category.categoryLabel}
        </button>
      ))}
    </div>
  );
};
