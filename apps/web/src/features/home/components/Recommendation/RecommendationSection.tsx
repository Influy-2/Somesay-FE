import { TypeRow } from './TypeRow';

import { useState } from 'react';
import { FilterBottomSheet } from './FilterBottomSheet';
import { FILTER_CATEGORIES, INITIAL_FILTERS } from './filter.constants';
import type { FilterCategoryType, SelectedFiltersType } from './filter.types';

export const RecommendationSection = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);

  // 현재 활성화된 필터 카테고리 (피부고민, 피부타입, 제품군 중 하나)
  const [activeCategory, setActiveCategory] =
    useState<FilterCategoryType>('skinConcern');

  // 필터별 선택한 옵션들
  const [selectedFilters, setSelectedFilters] =
    useState<SelectedFiltersType>(INITIAL_FILTERS);

  // (피부고민 피부타입 제품군) 중 하나 선택하면 해당 카테고리의 필터 시트 열기
  const handleOpenBottomSheet = (filter: FilterCategoryType) => {
    setActiveCategory(filter);
    setIsBottomSheetOpen(true);
  };

  //제품 추천받기 버튼 클릭
  const handleSubmit = () => {
    setIsBottomSheetOpen(false);
  };

  // 필터 초기화
  const handleReset = () => setSelectedFilters(INITIAL_FILTERS);

  // 선택한 옵션을 label 배열로 반환
  const getSelectedLabel = (category: FilterCategoryType): string[] =>
    selectedFilters[category].map((c) => c.label);

  // 제출 버튼 활성화 여부
  const isSubmitEnabled = Object.values(selectedFilters).some(
    (v) => v.length > 0
  );

  return (
    <>
      <section
        aria-labelledby="recommendation-title"
        className="flex w-full flex-col items-center justify-center gap-10 px-4"
      >
        <h2 className="headline4 text-center" id="recommendation-title">
          요즘 나의 피부 고민에
          <br />딱 맞는 제품을 추천해 드려요
        </h2>
        <div className="flex flex-col items-start gap-6 self-stretch">
          <div
            role="group"
            aria-label="나의 피부 정보"
            className="divide-grey03 flex flex-col items-start divide-y self-stretch"
          >
            {FILTER_CATEGORIES.map(({ category, label }) => (
              <TypeRow
                key={category}
                rowTitle={label}
                selectedFilters={getSelectedLabel(category)}
                onPress={() => handleOpenBottomSheet(category)}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="제품 추천받기"
            // aria-busy={isLoading}
            // disabled={isLoading}
            onClick={handleSubmit}
            disabled={!isSubmitEnabled}
            className="body2-sb flex h-12 w-full cursor-pointer items-center justify-center bg-black px-3 py-1 text-white"
          >
            제품 추천받기
          </button>
        </div>
      </section>
      <FilterBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        onCategoryChange={setActiveCategory}
        activeCategory={activeCategory}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        onSubmit={handleSubmit}
        onReset={handleReset}
        isSubmitEnabled={isSubmitEnabled}
      />
    </>
  );
};
