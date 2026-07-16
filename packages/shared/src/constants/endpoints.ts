export const API_ENDPOINTS = {
  /** Auth **/
  AUTH: {
    // 카카오 인가 코드로 로그인하기 위한 API URL입니다.
    KAKAO_LOGIN: '/auth/login/kakao',
    // 회원가입 후 기본 정보를 저장하기 위한 API URL입니다.
    LOGIN_INFO: '/auth/login/info',
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

  /** User Product **/
  // 사용자에게 잘 맞거나 맞지 않는 상품을 저장하기 위한 API URL입니다.
  USER_PRODUCT: '/users/product',

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
