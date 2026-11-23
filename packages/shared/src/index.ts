// 서버 타입 (Swagger 생성물 별칭, 이름 = 스키마 이름)
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
  CreatorDetailResponse,
  CreatorReviewResponse,
  ReactedCreatorResponse,
  ReactedProductResponse,
} from './api/schema';

// 서버 에러 본문 (스펙의 에러 응답이 unknown 으로 생성돼 손으로 둠)
export type { ApiErrorResponse } from './api/types';

// 프론트 전용 타입 (…Type: 서버 응답이 아닌 화면 상태·계산 결과)
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
export type {
  UserProductRequestType,
  UserProductStatusType,
} from './domain/userProduct/userProduct.types';

// 서버 enum 값 목록 (zod 스키마·선택지용)
export type { AgeType } from './domain/user/user.types';
export { AGE_TYPES } from './domain/user/user.types';

// 상수 (선택지·라벨 표)
export * from './constants/forbiddenWords.constants';
export * from './constants/user.constants';

// 유틸
export { formatSubscriberCount } from './utils/formatSubscriberCount';
export { formatPrice } from './utils/formatPrice';
export { formatRating, formatCount } from './utils/formatNumber';
export { flattenPages, getTotalCount } from './utils/pagination';

// React Query 캐시 헬퍼 (찜 상태 동기화)
export * from './query/productWishCache';
