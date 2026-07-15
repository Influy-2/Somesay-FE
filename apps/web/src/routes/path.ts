export const PATH = {
  ROOT: '/',
  HOME: {
    BASE: '/',
    PRODUCT_RECOMMENDATIONS: 'product-recommendations',
  },
  LOGIN: {
    BASE: '/login',
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
    DAISO: 'daiso',
  },
  MY_PAGE: {
    BASE: '/my-page',
    LIKED_PRODUCTS: 'liked-products',
    REVIEW_EVALUATION: {
      BASE: 'review-evaluation',
      PRODUCTS: {
        BASE: 'products',
        DETAIL: ':productId',
      },
      CREATORS: {
        BASE: 'creators',
        DETAIL: ':creatorId',
      },
    },
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
  BRAND: {
    BASE: '/brands',
    HOME: ':brandId',
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
