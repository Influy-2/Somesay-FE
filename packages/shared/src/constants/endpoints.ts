export const API_ENDPOINTS = {
  /** Ranking  **/
  PRODUCT_RANKING: '/rankings/product-ranking',
  CREATOR_RANKING: '/rankings/creator-ranking',

  /** Product  **/
  PRODUCT: '/products',
  PRODUCT_DETAIL: '/products/:productId',
  // 로그인한 사용자의 상품 찜 상태를 변경하기 위한 API URL입니다.
  PRODUCT_WISH: '/products/:productId/wish',
  PRODUCT_PRODUCT_ID_REVIEW_OVERVIEW: '/products/:productId/review-overview',
  PRODUCT_REVIEWS: '/products/:productId/reviews',
  PRODUCT_SIMILAR: '/products/:productId/similar',

  /** home ranking controller **/
  HOME_CREATOR_RANKING: '/home/creators',
  HOME_PRODUCT_RANKING: '/home/products',
  HOME_PRODUCT_LIST: '/home/products/list',
  // 선택한 피부 타입에 맞는 홈 고평점 리뷰를 조회하기 위한 API URL입니다.
  HOME_CURATION: '/home/curation',
  // 홈에서 고른 피부 조건에 맞는 추천 상품을 조회하기 위한 API URL입니다.
  HOME_RECOMMEND: '/home/recommend',
  // 추천 상품을 한 번에 모두 찜하기 위한 API URL입니다.
  HOME_RECOMMEND_WISH: '/home/recommend/wish',

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
