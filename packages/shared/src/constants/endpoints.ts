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

  /** User **/
  USER: {
    // 로그인한 사용자의 서비스 공통 정보를 조회하기 위한 API URL입니다.
    INFO: '/users/info',
  },

  /** home ranking controller **/
  HOME_CREATOR_RANKING: '/home/creators',
  HOME_PRODUCT_RANKING: '/home/products',
  HOME_PRODUCT_LIST: '/home/products/list',
  // 선택한 피부 타입에 맞는 홈 고평점 리뷰를 조회하기 위한 API URL입니다.
  HOME_CURATION: '/home/curation',

  /** Category **/
  CATEGORY: '/categories',

  /** Brand **/
  BRAND: {
    BASE: '/brands',
    DETAIL: ':brandId',
    PRODUCTS: ':brandId/products',
    PRODUCT_SEARCH: ':brandId/products/search',
  },

  /** Review **/
  REVIEW_TIMELINKS: '/reviews/:reviewId/timelinks',
  REVIEW_COMMENTS: '/reviews/:reviewId/comments',
} as const;
