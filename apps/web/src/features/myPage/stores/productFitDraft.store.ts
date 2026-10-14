import { create } from 'zustand';

import type {
  UserProductDetailType,
  UserProductStatusType,
} from '@somesay/shared';

// 스토어가 들고 있는 상태와 액션입니다.
interface ProductFitDraftStore {
  // 어느 쪽(잘 맞았던/안 맞았던)에 추가하는 중인지입니다. 추가 흐름 밖에서는 null입니다.
  status: UserProductStatusType | null;
  // 목록·검색 화면에서 고른 상품입니다.
  selectedProducts: UserProductDetailType[];
  // status를 정하고 선택을 비웁니다.
  startDraft: (status: UserProductStatusType) => void;
  // 이미 골랐으면 빼고, 아니면 넣습니다.
  toggleProduct: (product: UserProductDetailType) => void;
  removeProduct: (productId: number) => void;
  // status는 두고 선택만 비웁니다.
  clearSelection: () => void;
}

/**
 * 상품 추가 흐름에서 고른 상품입니다.
 *
 * 스토어인 이유
 * - 목록 화면과 검색 화면이 서로 다른 라우트라 고른 상품을 공유해야 합니다.
 *
 * 영속하지 않는 이유
 * - 추가를 끝내지 않고 새로고침하면 버려도 되는 임시 선택입니다.
 */
export const useProductFitDraftStore = create<ProductFitDraftStore>()(
  (set) => ({
    // 추가 흐름을 시작하기 전에는 대상도 선택도 없습니다.
    status: null,
    selectedProducts: [],

    // 새 흐름이 시작되면 이전 선택이 남지 않도록 비웁니다.
    startDraft: (status) => set({ status, selectedProducts: [] }),

    // API마다 딸려오는 나머지 필드(가격·평점 등)를 스토어에 쌓지 않으려고 표시에 필요한 네 필드만 저장합니다.
    toggleProduct: ({ productId, brandName, productName, productImgUrl }) =>
      set((state) => ({
        selectedProducts: state.selectedProducts.some(
          (item) => item.productId === productId
        )
          ? state.selectedProducts.filter(
              (item) => item.productId !== productId
            )
          : [
              ...state.selectedProducts,
              { productId, brandName, productName, productImgUrl },
            ],
      })),

    // dock에서 누른 상품 하나만 뺍니다.
    removeProduct: (productId) =>
      set((state) => ({
        selectedProducts: state.selectedProducts.filter(
          (item) => item.productId !== productId
        ),
      })),

    // 저장이 끝난 뒤 선택만 비웁니다.
    clearSelection: () => set({ selectedProducts: [] }),
  })
);
