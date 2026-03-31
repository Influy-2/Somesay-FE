import { FILTER_CATEGORIES, MAX_SELECTIONS } from './filter.constants';
import { BottomSheet, FilterChip, ResetButton } from '@/shared/components';
import type { FilterCategoryType, SelectedFiltersType } from './filter.types';
import { FilterCategoryTab, CTAButton } from '@/shared/components';
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

const getItemId = (
  v: SelectedFiltersType[FilterCategoryType][number]
): number => {
  if ('skinConcernId' in v) return v.skinConcernId;
  if ('skinTypeId' in v) return v.skinTypeId;
  return v.subCategoryId;
};

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
    const itemId = getItemId(item);
    setSelectedFilters((prev) => {
      const current = prev[activeCategory];
      const exists = current.some((v) => getItemId(v) === itemId);
      const max = MAX_SELECTIONS[activeCategory];

      if (exists) {
        return {
          ...prev,
          [activeCategory]: current.filter((v) => getItemId(v) !== itemId),
        };
      }
      if (max === 1) {
        return { ...prev, [activeCategory]: [item] };
      }
      if (current.length >= max) {
        return prev;
      }
      return { ...prev, [activeCategory]: [...current, item] };
    });
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="제품 옵션 선택 필터"
      header={
        <FilterCategoryTab
          categories={FILTER_CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />
      }
      footer={
        <div className="border-grey02 flex w-full shrink-0 flex-col items-center justify-center border-t bg-white px-4 pt-2 pb-[1.875rem]">
          <div className="flex w-full items-start gap-2">
            <ResetButton onClick={onReset} />
            <CTAButton
              label="제품 추천받기"
              onClick={onSubmit}
              disabled={!isSubmitEnabled}
            />
          </div>
        </div>
      }
    >
      {/* 콘텐츠 영역 */}
      <div className="mt-5 flex w-full flex-1 flex-col items-start gap-5 overflow-y-visible pb-[3.3125rem]">
        {/* 옵션 선택 영역 */}
        {activeCategory === 'skinConcern' && (
          <div className="flex flex-col items-start gap-3 px-4">
            <p className="body2-m text-grey06">
              최대 {MAX_SELECTIONS.skinConcern}개 선택
            </p>
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
            <p className="body2-m text-grey06">
              최대 {MAX_SELECTIONS.skinType}개 선택
            </p>
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
        {activeCategory === 'category' && (
          <div className="flex flex-col items-start gap-3 px-4">
            <p className="body2-m text-grey06">
              최대 {MAX_SELECTIONS.category}개 선택
            </p>
            <div
              className="flex flex-wrap content-start items-start gap-y-8 self-stretch"
              role="group"
              aria-label="카테고리 선택"
            >
              {PRODUCT_SUB_CATEGORY_GROUPS.map((subCategory) => {
                const firstItem = subCategory.subcategories[0];
                return subCategory.categoryLabel === '전체' && firstItem ? (
                  <FilterChip
                    key={firstItem.subCategoryId}
                    label={firstItem.label}
                    selected={selectedFilters.category.includes(firstItem)}
                    onClick={() => handleToggleFilter(firstItem)}
                  />
                ) : (
                  <div
                    className="flex w-full flex-col items-start gap-3 self-stretch"
                    key={subCategory.categoryLabel}
                  >
                    <p className="body2-sb text-black">
                      {subCategory.categoryLabel}
                    </p>
                    <div className="flex flex-wrap content-start items-start gap-x-2 gap-y-3 self-stretch">
                      {subCategory.subcategories.map((filter) => (
                        <FilterChip
                          key={filter.subCategoryId}
                          label={filter.label}
                          selected={selectedFilters.category.includes(filter)}
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
      {/* 하단 버튼 영역 */}
    </BottomSheet>
  );
};
