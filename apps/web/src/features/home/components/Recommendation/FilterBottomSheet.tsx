import cn from '@/utils/cn';
// import { ProductCategoryOptions } from './ProductCategoryOptions';
// import { SkinConcernOptions } from './SkinConcernOptions';
// import { SkinTypeOptions } from './SkinTypeOptions';
import { FILTER_CATEGORIES } from './filter.constants';
import { BottomSheet, FilterChip } from '@/shared/components';
import type { FilterCategoryType, SelectedFiltersType } from './filter.types';
import { FilterCategoryTab } from '@/shared/components/tab/FilterCategoryTab';
import {
  SKIN_CONCERN_OPTIONS,
  SKIN_TYPE_OPTIONS,
  PRODUCT_SUB_CATEGORY_GROUPS,
} from '@somesay/shared';

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: SelectedFiltersType;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFiltersType>>;
  activeCategory: FilterCategoryType;
  onCategoryChange: (category: FilterCategoryType) => void; // setter와 시그니처 일치
  onSubmit: () => void;
  onReset: () => void;
  isSubmitEnabled: boolean;
}

export const FilterBottomSheet = ({
  isOpen,
  onClose,
  selectedFilters,
  setSelectedFilters,
  activeCategory,
  onCategoryChange,
  onSubmit,
  onReset,
  isSubmitEnabled,
}: FilterBottomSheetProps) => {
  const handleToggleFilter = (
    item: SelectedFiltersType[FilterCategoryType][number]
  ) => {
    setSelectedFilters((prev) => {
      const current = prev[activeCategory];
      const exists = (current as unknown[]).includes(item);
      return {
        ...prev,
        [activeCategory]: exists
          ? current.filter((value) => value !== item)
          : [...current, item],
      };
    });
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="제품 옵션 선택 필터"
    >
      <div className="flex h-full w-full flex-col items-center justify-between">
        {/* 상단 콘텐츠 영역 */}
        <div className="flex w-full flex-col items-start gap-5">
          {/* 카테고리 탭 */}
          <FilterCategoryTab
            categories={FILTER_CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
          />

          {/* 옵션 선택 영역 */}
          <div className="w-full">
            {activeCategory === 'skinConcern' && (
              <div className="flex flex-col items-start gap-3 px-4">
                <p className="body2-m text-grey06">최대 2개 선택</p>
                <div
                  className="flex flex-wrap content-start items-start gap-x-2 gap-y-3 self-stretch"
                  role="group"
                  aria-label="피부 고민 선택"
                >
                  {SKIN_CONCERN_OPTIONS.map((filter) => (
                    <FilterChip
                      key={filter.skinConcernId}
                      label={filter.label}
                      selected={selectedFilters.skinConcern.includes(filter)}
                      onClick={() => handleToggleFilter(filter)}
                    />
                  ))}
                </div>
              </div>
            )}
            {activeCategory === 'skinType' && (
              <div className="flex flex-col items-start gap-3 px-4">
                <p className="body2-m text-grey06">최대 1개 선택</p>
                <div
                  className="flex flex-wrap content-start items-start gap-x-2 gap-y-3 self-stretch"
                  role="group"
                  aria-label="피부 타입 선택"
                >
                  {SKIN_TYPE_OPTIONS.map((filter) => (
                    <FilterChip
                      key={filter.skinTypeId}
                      label={filter.label}
                      selected={selectedFilters.skinType.includes(filter)}
                      onClick={() => handleToggleFilter(filter)}
                    />
                  ))}
                </div>
              </div>
            )}
            {activeCategory === 'productCategory' && (
              <div className="flex flex-col items-start gap-3 px-4">
                <p className="body2-m text-grey06">최대 1개 선택</p>
                <div
                  className="flex flex-wrap content-start items-start gap-x-2 gap-y-3 self-stretch"
                  role="group"
                  aria-label="제품군 선택"
                >
                  {PRODUCT_SUB_CATEGORY_GROUPS.map((subCategory) => {
                    const firstItem = subCategory.subcategories[0];
                    return subCategory.categoryLabel === '전체' && firstItem ? (
                      <FilterChip
                        key={firstItem.subCategoryId}
                        label={firstItem.label}
                        selected={selectedFilters.productCategory.includes(
                          firstItem
                        )}
                        onClick={() => handleToggleFilter(firstItem)}
                      />
                    ) : (
                      <div className="flex w-full flex-col items-start gap-3 self-stretch">
                        <p className="body2-sb text-black">
                          {subCategory.categoryLabel}
                        </p>
                        <div className="flex flex-wrap content-start items-start gap-x-2 gap-y-3 self-stretch">
                          {subCategory.subcategories.map((filter) => (
                            <FilterChip
                              key={filter.subCategoryId}
                              label={filter.label}
                              selected={selectedFilters.productCategory.includes(
                                filter
                              )}
                              onClick={() => handleToggleFilter(filter)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex w-full shrink-0 flex-col items-center justify-center border-t border-[#f0eeeb] bg-white px-4 pt-2 pb-[30px]">
          <div className="flex w-full items-start gap-2">
            <button
              type="button"
              onClick={onReset}
              className="flex h-12 w-[calc((100%-8px)/3)] shrink-0 items-center justify-center rounded-[4px] border border-[#d0cfcc] px-3 py-1"
              aria-label="필터 초기화"
            >
              <span className="text-[16px] leading-[1.5] font-semibold whitespace-nowrap text-[#161616]">
                초기화
              </span>
            </button>

            <button
              type="button"
              onClick={onSubmit}
              disabled={!isSubmitEnabled}
              className={cn(
                'flex h-12 flex-1 items-center justify-center rounded-[4px] px-3 py-1 transition-colors',
                isSubmitEnabled ? 'bg-black' : 'bg-grey04 cursor-not-allowed'
              )}
              aria-label="제품 추천받기"
              aria-disabled={!isSubmitEnabled}
            >
              <span className="text-[16px] leading-[1.5] font-semibold whitespace-nowrap text-white">
                제품 추천받기
              </span>
            </button>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
};
