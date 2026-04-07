import { useState } from 'react';
import {
  SearchFilterGroupType,
  SelectedFiltersType,
} from '../types/search.types';
import {
  BottomSheet,
  FilterGroupTab,
  ResetButton,
  CTAButton,
  FilterChip,
} from '@/shared/components';

import {
  SKIN_TYPE_OPTIONS,
  CATEGORY_GROUPS,
  EFFECT_OPTIONS,
} from '@somesay/shared';

const FILTER_GROUP: {
  category: SearchFilterGroupType;
  label: string;
}[] = [
  { category: 'skinType', label: '피부 타입' },
  { category: 'effect', label: '기대효과' },
  { category: 'category', label: '카테고리' },
];

const EMPTY_FILTERS: SelectedFiltersType = {
  skinType: [],
  effect: [],
  category: [],
};

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: SelectedFiltersType;
  activeCategory: SearchFilterGroupType;
  onCategoryChange: (category: SearchFilterGroupType) => void;
  onSubmit: (filters: SelectedFiltersType) => void;
  onReset: () => void;
}

export const SearchFilterBottomSheet = ({
  isOpen,
  onClose,
  selectedFilters,
  activeCategory,
  onCategoryChange,
  onSubmit,
  onReset,
}: FilterBottomSheetProps) => {
  // 마운트 시점(바텀시트가 열릴 때)의 selectedFilters로 초기화
  const [draftFilters, setDraftFilters] =
    useState<SelectedFiltersType>(selectedFilters);

  const handleToggleFilter = (
    item: SelectedFiltersType[SearchFilterGroupType][number]
  ) => {
    setDraftFilters((prev) => {
      const current = prev[activeCategory];
      const exists = current.some((v) => v === item);
      return {
        ...prev,
        [activeCategory]: exists
          ? current.filter((v) => v !== item)
          : [...current, item],
      };
    });
  };

  const handleSubmit = () => {
    onSubmit(draftFilters);
    onClose();
  };

  const handleReset = () => {
    setDraftFilters(EMPTY_FILTERS);
    onReset();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="검색 옵션 선택 필터"
      header={
        <FilterGroupTab
          categories={FILTER_GROUP}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />
      }
      footer={
        <div className="border-grey02 flex w-full shrink-0 flex-col items-center justify-center border-t bg-white px-4 pt-2 pb-[1.875rem]">
          <div className="flex w-full items-start gap-2">
            <ResetButton onClick={handleReset} />
            <CTAButton label="적용하기" onClick={handleSubmit} />
          </div>
        </div>
      }
    >
      {/* 콘텐츠 영역 */}
      <div className="mt-5 flex w-full flex-1 flex-col items-start gap-5 overflow-y-visible pb-[3.3125rem]">
        {activeCategory === 'skinType' && (
          <div
            className="flex flex-wrap content-start items-start gap-x-2 gap-y-3 self-stretch px-4"
            role="group"
            aria-label="피부 타입 선택"
          >
            {SKIN_TYPE_OPTIONS.map((filter) => (
              <FilterChip
                key={filter.skinTypeId}
                label={filter.label}
                isSelected={draftFilters.skinType.includes(filter)}
                onClick={() => handleToggleFilter(filter)}
              />
            ))}
          </div>
        )}

        {activeCategory === 'effect' && (
          <div
            className="flex flex-wrap content-start items-start gap-x-2 gap-y-3 self-stretch px-4"
            role="group"
            aria-label="기대 효과 선택"
          >
            {EFFECT_OPTIONS.map((filter) => (
              <FilterChip
                key={filter.effectId}
                label={filter.label}
                isSelected={draftFilters.effect.includes(filter)}
                onClick={() => handleToggleFilter(filter)}
              />
            ))}
          </div>
        )}

        {activeCategory === 'category' && (
          <div
            className="flex flex-wrap content-start items-start gap-y-8 self-stretch px-4"
            role="group"
            aria-label="카테고리 선택"
          >
            {/* 스킨케어, 마스크/팩, 클렌징 등 카테고리 그룹과 하위 카테고리를 맵핑하여 렌더링 */}
            {CATEGORY_GROUPS.map((group) => (
              <div
                className="flex w-full flex-col items-start gap-3 self-stretch"
                key={group.categoryId}
              >
                <p className="body2-sb text-black">{group.categoryLabel}</p>
                <div className="flex flex-wrap content-start items-start gap-x-2 gap-y-3 self-stretch">
                  {group.subcategories.map((filter) => (
                    <FilterChip
                      key={filter.subCategoryId}
                      label={filter.label}
                      isSelected={draftFilters.category.includes(filter)}
                      onClick={() => handleToggleFilter(filter)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </BottomSheet>
  );
};
