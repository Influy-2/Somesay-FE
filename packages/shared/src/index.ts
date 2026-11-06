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
  ProductReviewResponse,
  ProductReviewOverviewResponse,
  CommentItemResponse,
  TimeLinkItem,
  ReviewSearchItemResponse,
  CreatorRankingResponse,
  HomeCurationResponse,
  ReviewCardResponse,
} from './api/schema';

// 프론트 전용 타입
export type {
  BasicCreatorProfileType,
  CreatorRankingUpDownType,
} from './domain/creator/creator.types';
export * from './domain/filter/filter.types';
export type {
  RecommendedProductType,
  RecommendedTopReviewType,
  SelectedFiltersType,
} from './domain/recommendation/recommendation.types';

export * from './constants/forbiddenWords.constants';
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

//query
export * from './query/productWishCache';
