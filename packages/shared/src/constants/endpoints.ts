export const API_ENDPOINTS = {
  /** Auth **/
  AUTH: {
    // 회원가입 후 기본 정보를 저장하기 위한 API URL입니다.
    LOGIN_INFO: '/api/v1/auth/login/info',
  },

  /** Ranking  **/
  PRODUCT_RANKING: '/rankings/product-ranking',
  CREATOR_RANKING: '/rankings/creator-ranking',

  /** Product  **/
  PRODUCT: '/products',
  PRODUCT_DETAIL: '/products/:productId',
  PRODUCT_PRODUCT_ID_REVIEW_OVERVIEW: '/products/:productId/review-overview',
  PRODUCT_REVIEWS: '/products/:productId/reviews',
  PRODUCT_SIMILAR: '/products/:productId/similar',

  /** Category **/
  CATEGORY: '/categories',

  /** Brand **/
  BRAND: {
    BASE: '/brands',
    DETAIL: ':brandId',
    PRODUCTS: ':brandId/products',
    PRODUCT_SEARCH: ':brandId/products/search',
  },
} as const;
