export const PATH = {
  ROOT: '/',
  LOGIN: {
    BASE: '/login',
  },
  ONBOARDING: {
    BASE: '/onboarding',
    TERMS: 'terms',
    EMAIL: 'email',
    EMAIL_VERIFICATION: 'email-verification',
    NICKNAME: 'nickname',
    PROFILE: 'profile',
    SKIN_TYPES: 'skin-types',
    SKIN_CONCERNS: 'skin-concerns',
    MATCHED_PRODUCTS: 'matched-products',
    MISMATCHED_PRODUCTS: 'mismatched-products',
    COMPLETE: 'complete',
  },
  RANKING: {
    BASE: '/ranking',
    PRODUCT: 'products',
    CREATOR_CREDIBILITY: 'creator-credibility',
  },
  REVIEWS: {
    BASE: '/reviews',
  },
  CATEGORIES: {
    BASE: '/categories',
    DETAIL: ':categoryId',
  },
  MY_PAGE: {
    BASE: '/my-page',
    LIKED_PRODUCTS: 'liked-products',
    ACCOUNT: {
      BASE: 'account',
      NICKNAME: 'nickname',
      GENDER: 'gender',
      AGE: 'age',
      SKIN_TYPE: 'skin-type',
      SKIN_CONCERN: 'skin-concern',
      PRODUCT_FIT: {
        BASE: 'product-fit',
        MATCHES: 'matches',
        MISMATCHES: 'mismatches',
        ADD_PRODUCTS: 'add-products',
      },
    },
  },
  CREATOR: {
    BASE: '/creators',
    HOME: ':creatorId',
  },
  PRODUCT: {
    BASE: '/products',
    DETAIL: ':productId',
  },
  SEARCH: {
    BASE: '/search',
  },
  REVIEW_EVALUATION: {
    BASE: '/review-evaluation',
  },
};
