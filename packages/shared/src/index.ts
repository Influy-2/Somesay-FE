export type {
  ProductBasicType,
  ProductWishStateType,
  ProductWishResultType,
  ProductCategoryRefType,
  ProductSkinExpectationType,
  ProductSkinFitType,
  ProductCardType,
  CategoryProductType,
  ProductDetailType,
  ProductReviewType,
  ProductsByCategoryType,
  ProductSortType,
} from './domain/product/product.types';

export type {
  ProductSearchResultType,
  ReviewSearchResultType,
} from './domain/search/search.types';

export type {
  BrandAvailableSubCategoryType,
  BrandSummaryType,
  BrandProductSortType,
  BrandProductType,
  BrandProductPageType,
} from './domain/brand/brand.types';

export type {
  CreatorType,
  CreatorRankingUpDownType,
  BasicCreatorProfileType,
} from './domain/creator/creator.types';
export type { HomeCreatorRankingType } from './domain/ranking/ranking.types';

// 서버 타입 (Swagger 생성물 별칭)
export type {
  paths,
  components,
  ApiGetPath,
  MainCategoryResponse,
  SubCategoryItemResponse,
  InfoResponse,
  MyPageResponse,
  SignUpInfoRequest,
  UserProductRequest,
  UserProductItemResponse,
} from './api/schema';
export * from './domain/filter/filter.types';

export * from './constants/forbiddenWords.constants';
export type {
  CreatorReviewType,
  CreatorReviewSummaryType,
  TimeLinkType,
  TimeLinksType,
  HomeCurationReviewType,
  HomeCurationType,
} from './domain/review/review.types';

export type {
  CommentPreviewType,
  CommentReactionType,
} from './domain/comment/comment.types';

export type {
  HomeRecommendationParamsType,
  RecommendedProductsWishResultType,
  RecommendedProductType,
  RecommendedTopReviewType,
  SelectedFiltersType,
} from './domain/recommendation/recommendation.types';

export * from './constants/user.constants';

// UTILS
export { formatSubscriberCount } from './utils/formatSubscriberCount';
export { formatPrice } from './utils/formatPrice';
//domain - user
export type { AgeType } from './domain/user/user.types';
export { AGE_TYPES } from './domain/user/user.types';

//domain - user product
export type {
  UserProductRequestType,
  UserProductStatusType,
} from './domain/userProduct/userProduct.types';

//api
export { apiClient, configureApiClient } from './api/client';
export type { ApiErrorResponse } from './api/types';

//api - ranking
export * from './api/ranking/fetchCreatorRanking.api';
export * from './api/ranking/fetchProductRanking.api';

//api - home
export * from './api/home/fetchHomeCreatorRanking.api';
export * from './api/home/fetchHomeProductRanking.api';
export * from './api/home/fetchHomeCuration.api';
export * from './api/home/fetchHomeRecommendations.api';
export * from './api/home/postRecommendProductsWish.api';

//api - product
export * from './api/product/fetchHomeProductList.api';
export * from './api/product/fetchProductsByCategory.api';
export * from './api/product/fetchProductDetail.api';
export * from './api/product/fetchProductReviewOverview.api';
export * from './api/product/fetchProductReviews.api';
export * from './api/product/fetchSimilarProducts.api';
export * from './api/product/patchProductWish.api';

//api - brand
export * from './api/brand/fetchBrandDetail.api';
export * from './api/brand/fetchBrandProducts.api';
export * from './api/brand/fetchBrandProductSearch.api';

//api - review
export * from './api/review/fetchTimeLinks.api';
export * from './api/review/fetchReviewComments.api';

//query
export * from './query/queryKeys';
export * from './query/productWishCache';
