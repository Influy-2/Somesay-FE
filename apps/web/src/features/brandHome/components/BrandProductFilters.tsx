import type { BrandProductSortType } from '@somesay/shared';
import {
  HorizontalCategoriesTab,
  SearchBar,
  SortBar,
} from '@/shared/components';

interface BrandCategoryOption {
  id: number;
  label: string;
}

interface BrandProductFiltersProps {
  brandName: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  categories: BrandCategoryOption[];
  selectedCategoryId: number;
  onSelectCategory: (id: number) => void;
  productCount: number;
  sortType: BrandProductSortType;
  onSelectSort: (sortType: BrandProductSortType) => void;
}

const SORT_OPTIONS: {
  value: BrandProductSortType;
  label: string;
}[] = [
  { value: 'RATING', label: '평점순' },
  { value: 'REVIEW', label: '리뷰 많은 순' },
  { value: 'PRICE', label: '가격 낮은 순' },
];

export const BrandProductFilters = ({
  brandName,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  categories,
  selectedCategoryId,
  onSelectCategory,
  productCount,
  sortType,
  onSelectSort,
}: BrandProductFiltersProps) => {
  return (
    <section
      className="flex flex-col gap-4 pt-4"
      aria-label={`${brandName} 상품 필터`}
    >
      <div className="px-4">
        <SearchBar
          placeholder={`${brandName}에서의 검색`}
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          onSubmit={onSearchSubmit}
          onClear={() => onSearchChange('')}
        />
      </div>
      <div className="px-4">
        <HorizontalCategoriesTab
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={onSelectCategory}
          ariaLabel={`${brandName} 상품 카테고리`}
        />
      </div>
      <SortBar
        count={productCount}
        sortOptions={SORT_OPTIONS}
        currentSortValue={sortType}
        onSelectSort={(value) => onSelectSort(value as BrandProductSortType)}
      />
    </section>
  );
};
