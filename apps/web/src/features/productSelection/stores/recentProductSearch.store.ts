import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { MAX_RECENT_PRODUCT_SEARCHES } from '../constants/productSelection.constants';
import type { RecentProductSearchItem } from '../types/productSelection.types';

// 스토어가 들고 있는 상태와 액션입니다.
interface RecentProductSearchStore {
  // 최신 검색어가 앞에 오는 목록입니다.
  items: RecentProductSearchItem[];
  addItem: (query: string) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
}

/**
 * 상품 선택 화면의 최근 검색어입니다.
 *
 * 영속하는 이유
 * - 재방문해도 이전 검색어로 다시 찾을 수 있어야 해서 localStorage에 둡니다.
 * - 통합 검색(8.1) 기록과 섞이지 않도록 상품 선택 전용 키를 씁니다.
 * - 회원가입(온보딩)과 마이페이지 상품 추가 화면이 같은 기록을 공유합니다.
 */
export const useRecentProductSearchStore = create<RecentProductSearchStore>()(
  persist(
    (set) => ({
      // 초기에는 검색 기록이 없습니다.
      items: [],

      // 공백을 걷어내고, 같은 검색어는 맨 앞으로 옮기며, 최대 개수로 자릅니다.
      addItem: (query) => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;

        set((state) => ({
          items: [
            { id: Date.now().toString(), query: trimmedQuery },
            ...state.items.filter((item) => item.query !== trimmedQuery),
          ].slice(0, MAX_RECENT_PRODUCT_SEARCHES),
        }));
      },

      // 선택한 검색어 한 건만 지웁니다.
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      // 검색 기록을 모두 비웁니다.
      clearAll: () => set({ items: [] }),
    }),
    {
      name: 'somesay_recent_product_searches',
      storage: createJSONStorage(() => localStorage),
      // 액션은 저장하지 않고 검색어 목록만 저장합니다.
      partialize: ({ items }) => ({ items }),
    }
  )
);
