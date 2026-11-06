export const API_ENDPOINTS = {
  /** Ranking  **/
  CREATOR_RANKING: '/rankings/creator-ranking',

  /** Product  **/
  PRODUCT_PRODUCT_ID_REVIEW_OVERVIEW: '/products/:productId/review-overview',
  PRODUCT_REVIEWS: '/products/:productId/reviews',

  /** home ranking controller **/
  HOME_CREATOR_RANKING: '/home/creators',
  // 선택한 피부 타입에 맞는 홈 고평점 리뷰를 조회하기 위한 API URL입니다.
  HOME_CURATION: '/home/curation',

  /** Review **/
  REVIEW_TIMELINKS: '/reviews/:reviewId/timelinks',
  REVIEW_COMMENTS: '/reviews/:reviewId/comments',
} as const;
