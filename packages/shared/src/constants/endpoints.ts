export const API_ENDPOINTS = {
  /** Auth **/
  AUTH: {
    // 카카오 인가 코드로 로그인하기 위한 API URL입니다.
    KAKAO_LOGIN: '/auth/login/kakao',
    // 회원가입 후 기본 정보를 저장하기 위한 API URL입니다.
    LOGIN_INFO: '/auth/login/info',
    // 서버에 로그아웃을 알리기 위한 API URL입니다.
    LOGOUT: '/auth/logout',
  },

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

  /** User Product **/
  USER_PRODUCT: {
    // 사용자에게 잘 맞거나 맞지 않는 상품을 조회·저장하기 위한 API URL입니다.
    BASE: '/users/product',
    // 저장해 둔 잘 맞거나 맞지 않는 상품 하나를 삭제하기 위한 API URL입니다.
    DETAIL: '/users/product/:productId',
    // 잘 맞거나 맞지 않는 상품으로 추가할 상품을 검색하기 위한 API URL입니다.
    SEARCH: '/users/product/search',
  },

  /** User **/
  USER: {
    // 로그인한 사용자의 서비스 공통 정보를 조회하기 위한 API URL입니다.
    INFO: '/users/info',
    // 마이페이지 첫 화면의 프로필과 활동 통계를 조회하기 위한 API URL입니다.
    MYPAGE: '/users/mypage',
    // 닉네임·성별·연령을 수정하기 위한 API URL입니다.
    BASIC_INFO: '/users/basic-info',
    // 피부 타입·피부 고민을 수정하기 위한 API URL입니다.
    SKIN_INFO: '/users/skin-info',
    // 프로필 이미지를 변경하기 위한 API URL입니다.
    PROFILE_IMAGE: '/users/user/profile',
  },

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
