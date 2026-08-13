import { useEffect, useMemo, useState } from 'react';

import type { SubcategoryType } from '@somesay/shared';

import { useFetchCategories } from '@/shared/hooks';

import { ALL_SUBCATEGORY_ID, INITIAL_FILTERS } from './filter.constants';
import {
  ROTATING_SUGGESTIONS,
  SUGGESTION_ROTATION_MS,
} from './suggestion.constants';
import type { SelectedFiltersType } from './filter.types';

interface UseRotatingSuggestionParams {
  /** 사용자가 필터를 건드리기 전에만 순환합니다. */
  isEnabled: boolean;
}

/**
 * 홈 히어로의 추천 조합을 일정 간격으로 순환시킵니다.
 *
 * 세 행(피부 고민/피부 타입/카테고리)이 한 조합으로 함께 바뀌어야 조건이 말이 되므로
 * 행마다 따로 굴리지 않고 조합 인덱스 하나만 움직입니다.
 * 카테고리는 상수의 이름을 카테고리 API 응답의 실제 id에 맞춰 해석합니다.
 */
export const useRotatingSuggestion = ({
  isEnabled,
}: UseRotatingSuggestionParams) => {
  const { data: categoryGroups = [] } = useFetchCategories();
  const [suggestionIndex, setSuggestionIndex] = useState(0);

  useEffect(() => {
    if (!isEnabled) return;

    const intervalId = window.setInterval(() => {
      setSuggestionIndex((prev) => (prev + 1) % ROTATING_SUGGESTIONS.length);
    }, SUGGESTION_ROTATION_MS);

    return () => window.clearInterval(intervalId);
  }, [isEnabled]);

  const subCategoryByName = useMemo(
    () =>
      new Map<string, SubcategoryType>(
        categoryGroups.flatMap(({ subCategories }) =>
          subCategories.map(
            (subCategory) => [subCategory.subCategoryName, subCategory] as const
          )
        )
      ),
    [categoryGroups]
  );

  const suggestion = useMemo<SelectedFiltersType>(() => {
    const current = ROTATING_SUGGESTIONS[suggestionIndex];

    if (!current) return INITIAL_FILTERS;

    const matchedSubCategory = subCategoryByName.get(current.subCategoryName);

    return {
      skinConcern: current.skinConcern,
      skinType: current.skinType,
      // 카테고리 목록에 없는 이름이면 예시 칩으로만 보여줍니다.
      // (순환 조합은 그대로 제출되지 않아 id가 비어도 요청에 영향이 없습니다)
      category: [
        matchedSubCategory ?? {
          subCategoryId: ALL_SUBCATEGORY_ID,
          subCategoryName: current.subCategoryName,
        },
      ],
    };
  }, [suggestionIndex, subCategoryByName]);

  return { suggestion, suggestionIndex };
};
