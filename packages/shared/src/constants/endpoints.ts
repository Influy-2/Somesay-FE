export const API_ENDPOINTS = {
  /** Ranking  **/
  PRODUCT_RANKING: '/rankings/product-ranking',
  RANKING_CREATOR_RANKING: '/rankings/creator-ranking',

  /** Product  **/
  PRODUCT: '/products',
  PRODUCT_DETAIL: '/products/:productId',
  PRODUCT_PRODUCT_ID_REVIEW_OVERVIEW: '/products/:productId/review-overview',
  PRODUCT_PRODUCT_ID_REVIEWS: '/products/:productId/reviews',
  PRODUCT_PRODUCT_ID_SIMILAR: '/products/:productId/similar',

  /** Category **/
  CATEGORY: '/categories',
} as const;
