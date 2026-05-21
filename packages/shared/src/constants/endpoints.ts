export const API_ENDPOINTS = {
  /** Ranking  **/
  PRODUCT_RANKING: '/ranking/product-ranking',
  RANKING_CREATOR_RANKING: '/ranking/creator-ranking',

  /** Product  **/
  PRODUCT: '/product',
  PRODUCT_DETAIL: '/product/:productId',
  PRODUCT_PRODUCT_ID_REVIEW_OVERVIEW: '/product/:productId/review-overview',
  PRODUCT_PRODUCT_ID_REVIEWS: '/product/:productId/reviews',
  PRODUCT_PRODUCT_ID_SIMILAR: '/product/:productId/similar',
} as const;
