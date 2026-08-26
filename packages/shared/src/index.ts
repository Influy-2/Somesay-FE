export type {
  ProductBasicType,
  ProductWishStateType,
  ProductWishResultType,
  ProductCategoryRefType,
  ProductSkinExpectationType,
  ProductSkinFitType,
  ProductCardType,
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

export * from './domain/category/category.types';
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
//domain - auth
export type { JwtLoginResponseDto } from './domain/auth/auth.dto';
export type {
  AuthTokenType,
  KakaoLoginResultType,
  LoginInfoType,
} from './domain/auth/auth.types';
export { mapJwtLoginResponseDto } from './domain/auth/auth.mapper';

//domain - user
export type {
  AgeType,
  GenderType,
  UserInfoType,
  UserType,
} from './domain/user/user.types';
export { AGE_TYPES } from './domain/user/user.types';

//domain - user product
export type {
  UserProductDetailType,
  UserProductRequestType,
  UserProductResponseType,
  UserProductStatusType,
} from './domain/userProduct/userProduct.types';

//api
export { apiClient, configureApiClient } from './api/client';

//api - auth
export * from './api/auth/postKakaoLogin.api';
export * from './api/auth/postLoginInfo.api';

//api - user product
export * from './api/userProduct/postUserProduct.api';

//api - user
export * from './api/user/fetchUserInfo.api';

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

//api - category
export * from './api/category/fetchCategories.api';

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
