import cn from '@/utils/cn';

interface FilterGroupTabProps<T extends string> {
  categories: {
    category: T;
    label: string;
  }[];
  activeCategory: T;
  onCategoryChange: (category: T) => void;
}

export const FilterGroupTab = <T extends string>({
  categories,
  activeCategory,
  onCategoryChange,
}: FilterGroupTabProps<T>) => {
  return (
    <div
      className={cn(
        'border-grey01 flex w-full shrink-0 items-center gap-2.5 border-b-2 pl-4'
      )}
    >
      {categories.map((category) => {
        const isActive = category.category === activeCategory;
        return (
          <button
            key={category.category}
            type="button"
            onClick={() => onCategoryChange(category.category)}
            className={cn(
              'body2-m -mb-[.125rem] flex shrink-0 cursor-pointer items-center justify-center border-b-2 px-1 py-2',
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
