// packages/shared/src/constants/endpoints.ts
export const API_ENDPOINTS = {
  /** Ranking Controller **/
  PRODUCT_RANKING: '/ranking/product-ranking',
  RANKING_CREATOR_RANKING: '/ranking/creator-ranking',
  PRODUCT: '/product',
  PRODUCT_PRODUCT_ID: '/product/{productId}',
  PRODUCT_PRODUCT_ID_REVIEW_OVERVIEW: '/product/{productId}/review-overview',
  PRODUCT_PRODUCT_ID_REVIEWS: '/product/{productId}/reviews',
  PRODUCT_PRODUCT_ID_SIMILAR: '/product/{productId}/similar',
} as const;
