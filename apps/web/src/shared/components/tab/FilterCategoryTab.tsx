import cn from '@/utils/cn';

interface FilterCategoryTabItem {
  filterId: number;
  label: string;
}

interface FilterCategoryTabProps {
  categories: FilterCategoryTabItem[];
  activeCategory: number;
  onCategoryChange: (category: number) => void;
}

export const FilterCategoryTab = ({
  categories,
  activeCategory,
  onCategoryChange,
}: FilterCategoryTabProps) => {
  return (
    <div
      className={cn(
        'border-grey01 flex w-full shrink-0 items-center gap-2.5 border-b-2 pl-4'
      )}
    >
      {categories.map((category) => {
        const isActive = category.filterId === activeCategory;
        return (
          <button
            key={category.filterId}
            type="button"
            onClick={() => onCategoryChange(category.filterId)}
            className={cn(
              'body2-m -mb-[.125rem] flex shrink-0 items-center justify-center border-b-2 px-1 py-2',
              isActive
                ? 'border-black text-black'
                : 'text-grey06 border-transparent'
            )}
            aria-selected={isActive}
            role="tab"
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
};
