import cn from '@/utils/cn';

interface FilterCategoryTabItem<T extends string> {
  key: T;
  label: string;
}

interface FilterCategoryTabProps<T extends string> {
  categories: FilterCategoryTabItem<T>[];
  activeCategory: T;
  onCategoryChange: (category: T) => void;
}

export const FilterCategoryTab = <T extends string>({
  categories,
  activeCategory,
  onCategoryChange,
}: FilterCategoryTabProps<T>) => {
  return (
    <div
      className={cn(
        'border-grey01 flex w-full shrink-0 items-center gap-[.625rem] border-b-2 pl-4'
      )}
    >
      {categories.map((category) => {
        const isActive = category.key === activeCategory;
        return (
          <button
            key={category.key}
            type="button"
            onClick={() => onCategoryChange(category.key)}
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
