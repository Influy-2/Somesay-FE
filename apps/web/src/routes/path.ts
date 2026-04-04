export const PATH = {
  ROOT: '/',
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
  },
  MY_PAGE: {
    BASE: '/my-page',
    LIKED_PRODUCTS: 'liked-products',
  },
  CREATOR: {
    BASE: '/creators',
    HOME: (creatorId: string) => `/creators/${creatorId}`,
  },
  PRODUCT: {
    BASE: '/products',
    DETAIL: (productId: string) => `/products/${productId}`,
  },
};
