export type {
  ProductBasicType,
  ProductCardType,
  ProductDetailType,
  ProductRankingCardType,
  ProductReviewType,
  ProductSkinExpectationType,
  ProductSkinType,
  ProductsByCategory,
  SortOptionsType,
} from './domain/product/product.types';

export type {
  ProductSearchResultType,
  ReviewSearchResultType,
} from './domain/search/search.types';

export type {
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

export * from './domain/category/category.types';
export * from './domain/filter/filter.types';

export * from './constants/forbiddenWords.constants';
export type {
  CreatorReviewType,
  CreatorReviewSummaryType,
  TimeLinkType,
  TimeLinksType,
} from './domain/review/review.types';

export * from './constants/user.constants';
export { formatSubscriberCount } from './utils';

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

//api - product
export * from './api/product/fetchHomeProductList.api';
export * from './api/product/fetchProductsByCategory.api';
export * from './api/product/fetchProductDetail.api';
export * from './api/product/fetchProductReviewOverview.api';
export * from './api/product/fetchProductReviews.api';
export * from './api/product/fetchSimilarProducts.api';

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
