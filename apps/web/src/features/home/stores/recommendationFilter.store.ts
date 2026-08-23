import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { INITIAL_FILTERS } from '../components/productRecommendation/filter.constants';
import type { SelectedFiltersType } from '../components/productRecommendation/filter.types';

interface RecommendationFilterStore {
  filters: SelectedFiltersType;
  setFilters: (filters: SelectedFiltersType) => void;
}

/**
 * 홈에서 확정한 추천 조건을 상품 추천 화면으로 넘깁니다.
 *
 * 추천 결과는 조건이 있어야만 다시 조회할 수 있어서, 새로고침이나 뒤로가기 후에도
 * 화면이 비지 않도록 세션에 저장합니다. (탭을 닫으면 함께 사라집니다)
 */
export const useRecommendationFilterStore = create<RecommendationFilterStore>()(
  persist(
    (set) => ({
      filters: INITIAL_FILTERS,
      setFilters: (filters) => set({ filters }),
    }),
    {
      name: 'somesay_recommendation_filters',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
