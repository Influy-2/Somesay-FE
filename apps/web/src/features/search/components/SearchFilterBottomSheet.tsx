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

import { type CategoryGroupType, type SubcategoryType } from '@somesay/shared';
import { useFetchCategories } from '@/shared/hooks';

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

// TODO: 피부 타입 선택지 API가 생기면 백엔드 응답값으로 교체
const SKIN_TYPE_OPTIONS = [
  '건성',
  '지성',
  '복합성',
  '수부지',
  '민감성',
  '여드름성',
  '모르겠음',
];

// TODO: 기대 효과 선택지 API가 생기면 백엔드 응답값으로 교체
const EFFECT_OPTIONS = [
  '보습',
  '속건조',
  '진정',
  '여드름',
  '붉은기',
  '미백/잡티',
  '주름/탄력',
  '모공',
  '피부결',
  '각질',
  '피부 장벽',
  '흔적',
];

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
  const { data: categoryGroups = [] } = useFetchCategories();

  // 마운트 시점(바텀시트가 열릴 때)의 selectedFilters로 초기화
  const [draftFilters, setDraftFilters] =
    useState<SelectedFiltersType>(selectedFilters);

  //TODO: API 연결 및 전역 상태 관리 도입시 ID 로 비교?
  const handleToggleFilter = (item: string | SubcategoryType) => {
    setDraftFilters((prev) => {
      const current = prev[activeCategory];
      const exists = current.some((v) =>
        typeof v === 'string' || typeof item === 'string'
          ? v === item
          : v.subCategoryId === item.subCategoryId
      );
      return {
        ...prev,
        [activeCategory]: exists
          ? current.filter((v) =>
              typeof v === 'string' || typeof item === 'string'
                ? v !== item
                : v.subCategoryId !== item.subCategoryId
            )
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
                key={filter}
                label={filter}
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
                key={filter}
                label={filter}
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
            {categoryGroups.map((group: CategoryGroupType) => (
              <div
                className="flex w-full flex-col items-start gap-3 self-stretch"
                key={group.mainCategoryId}
              >
                <p className="body2-sb text-black">{group.mainName}</p>
                <div className="flex flex-wrap content-start items-start gap-x-2 gap-y-3 self-stretch">
                  {group.subCategories.map((filter) => (
                    <FilterChip
                      key={filter.subCategoryId}
                      label={filter.subName}
                      isSelected={draftFilters.category.some(
                        (selected) =>
                          selected.subCategoryId === filter.subCategoryId
                      )}
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
