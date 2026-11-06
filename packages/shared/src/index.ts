export type {
  ProductBasicType,
  ProductSkinExpectationType,
  ProductSkinFitType,
  ProductReviewType,
} from './domain/product/product.types';

export type { ReviewSearchResultType } from './domain/search/search.types';

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
  ProductPreviewCard,
  ProductCard,
  EffectChip,
  ProductDetailResponse,
  WishRequest,
  ProductWishResponse,
  BrandResponse,
  ProductSortType,
  BrandProductSortType,
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

//api - home
export * from './api/home/fetchHomeCreatorRanking.api';
export * from './api/home/fetchHomeCuration.api';

//api - product
export * from './api/product/fetchProductReviewOverview.api';
export * from './api/product/fetchProductReviews.api';

//api - review
export * from './api/review/fetchTimeLinks.api';
export * from './api/review/fetchReviewComments.api';

//query
export * from './query/queryKeys';
export * from './query/productWishCache';
