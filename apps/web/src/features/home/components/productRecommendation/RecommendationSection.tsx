import { useState } from 'react';

import { getConcernLabels, getSkinTypeLabels } from '@somesay/shared';

import { YoutubeIcon } from '@/shared/icons';
import { useFetchUserInfo } from '@/shared/hooks';

import { FilterBottomSheet } from './FilterBottomSheet';
import {
  FILTER_CATEGORIES,
  INITIAL_FILTERS,
  MAX_SELECTIONS,
} from './filter.constants';
import { hasAnySelection } from './recommendation.utils';
import { TypeRow } from './TypeRow';
import { useRequestRecommendations } from './useRequestRecommendations';
import { useRotatingSuggestion } from './useRotatingSuggestion';
import type {
  RecommendedFilterGroupType,
  SelectedFiltersType,
} from './filter.types';

export const RecommendationSection = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 현재 활성화된 필터 카테고리 (피부고민, 피부타입, 카테고리 중 하나)
  const [activeCategory, setActiveCategory] =
    useState<RecommendedFilterGroupType>('skinConcern');

  // null이면 사용자가 아직 필터를 건드리지 않아 추천 조합이 순환하는 상태입니다.
  const [userFilters, setUserFilters] = useState<SelectedFiltersType | null>(
    null
  );
  const isRotating = userFilters === null;

  const { suggestion, suggestionIndex } = useRotatingSuggestion({
    isEnabled: isRotating,
  });
  const { requestRecommendations, isRequesting } = useRequestRecommendations();

  // 회원가입에서 저장한 조건은 순환 중에도 내용을 고정합니다. (색과 등장 모션은 함께 순환)
  const { data: userInfo } = useFetchUserInfo();
  const savedFilters: SelectedFiltersType = {
    skinConcern: getConcernLabels(userInfo?.skinExpectationIds ?? []).slice(
      0,
      MAX_SELECTIONS.skinConcern
    ),
    skinType: getSkinTypeLabels(userInfo?.skinTypeIds ?? []).slice(
      0,
      MAX_SELECTIONS.skinType
    ),
    category: [],
  };

  const selectedFilters: SelectedFiltersType = userFilters ?? {
    ...suggestion,
    ...(savedFilters.skinConcern.length > 0
      ? { skinConcern: savedFilters.skinConcern }
      : {}),
    ...(savedFilters.skinType.length > 0
      ? { skinType: savedFilters.skinType }
      : {}),
  };

  // 순환 조합은 예시일 뿐이라 사용자가 필터에 접근하는 순간 실제 선택 상태로 바꿉니다.
  // (저장해 둔 조건이 있으면 그 값에서 시작하고, 없으면 빈 상태가 됩니다)
  const stopRotation = () => setUserFilters((prev) => prev ?? savedFilters);

  const setSelectedFilters: React.Dispatch<
    React.SetStateAction<SelectedFiltersType>
  > = (update) =>
    setUserFilters((prev) => {
      const current = prev ?? savedFilters;

      return typeof update === 'function' ? update(current) : update;
    });

  // (피부고민 피부타입 카테고리) 중 하나 선택하면 해당 카테고리의 필터 시트 열기
  const handleOpenBottomSheet = (filter: RecommendedFilterGroupType) => {
    stopRotation();
    setActiveCategory(filter);
    setIsBottomSheetOpen(true);
  };

  // 제품 추천받기 버튼 클릭 — 고른 조건이 없으면 먼저 조건을 고르게 합니다.
  const handleSubmit = () => {
    if (isRequesting) return;

    if (isRotating || !hasAnySelection(userFilters)) {
      handleOpenBottomSheet(activeCategory);
      return;
    }

    requestRecommendations(userFilters);
  };

  // 필터 초기화
  const handleReset = () => setUserFilters(INITIAL_FILTERS);

  // 선택한 옵션을 label 배열로 반환
  const getSelectedLabel = (category: RecommendedFilterGroupType): string[] =>
    selectedFilters[category].map((option) =>
      typeof option === 'string' ? option : option.subCategoryName
    );

  // 파스텔 칩 색이 행을 넘어 이어지도록 각 행의 팔레트 시작 인덱스를 누적 계산합니다.
  // 조합이 바뀔 때마다 팔레트를 밀어 칩 색도 함께 바뀌게 합니다.
  const paletteOffset = isRotating ? suggestionIndex * 2 : 0;
  const filterRows = FILTER_CATEGORIES.map(({ category, label }, rowIndex) => ({
    category,
    label,
    rowIndex,
    selected: getSelectedLabel(category),
    paletteStart:
      paletteOffset +
      FILTER_CATEGORIES.slice(0, rowIndex).reduce(
        (count, previous) => count + getSelectedLabel(previous.category).length,
        0
      ),
  }));

  // 순환 중인 조합은 사용자가 입력한 값이 아니므로 추천 문구로 바꾸지 않습니다.
  const hasMyFilters = !isRotating && hasAnySelection(userFilters);
  const isSubmitEnabled = !isRotating && hasAnySelection(userFilters);

  return (
    <>
      <section
        aria-labelledby="recommendation-title"
        className="flex w-full flex-col items-center justify-center gap-12 px-4"
      >
        <div className="flex flex-col items-center gap-3.5">
          {/* 데이터 규모 배지 — 좌에서 우로 옅어지는 파란 그라디언트 */}
          <span className="caption1-m text-grey06 flex items-center gap-[0.3125rem] bg-[linear-gradient(90deg,rgba(218,238,255,0.5)_0%,rgba(255,255,255,0.5)_142%)] px-2 py-1">
            <YoutubeIcon
              className="text-primary-200 size-3.5 shrink-0 [&>path:first-child]:fill-current"
              aria-hidden="true"
            />
            유튜브 내돈내산 리뷰 1만개 분석
          </span>
          <h2 className="headline4 text-center" id="recommendation-title">
            {hasMyFilters ? (
              <>
                나와 피부 상태가 같은 크리에이터가
                <br />
                만족한 제품을 추천해드려요
              </>
            ) : (
              <>
                뭐 살지 고민이라면,
                <br />내 피부에 맞는 제품을 찾아드려요
              </>
            )}
          </h2>
        </div>
        <div className="flex flex-col items-start gap-6 self-stretch">
          {/* 피부고민, 피부 타입, 카테고리 행 */}
          <div
            role="group"
            aria-label="나의 피부 정보"
            className="divide-grey03 flex flex-col items-start divide-y self-stretch"
          >
            {filterRows.map(
              ({ category, label, selected, paletteStart, rowIndex }) => (
                <TypeRow
                  // 순환할 때마다 칩이 다시 마운트되어 등장 애니메이션이 재생됩니다.
                  key={isRotating ? `${category}-${suggestionIndex}` : category}
                  rowTitle={label}
                  rowIndex={rowIndex}
                  selectedFilters={selected}
                  paletteStartIndex={paletteStart}
                  onPress={() => handleOpenBottomSheet(category)}
                />
              )
            )}
          </div>

          <button
            type="button"
            aria-busy={isRequesting}
            disabled={isRequesting}
            onClick={handleSubmit}
            className="body1-sb flex h-12 w-full cursor-pointer items-center justify-center bg-black px-3 py-1 text-white disabled:cursor-default disabled:opacity-60"
          >
            {isRequesting ? '추천 제품을 찾고 있어요' : '제품 추천받기'}
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
        isSubmitEnabled={isSubmitEnabled && !isRequesting}
      />
    </>
  );
};
