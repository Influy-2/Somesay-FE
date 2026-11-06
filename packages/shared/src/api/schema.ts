import type { PathsWithMethod } from 'openapi-typescript-helpers';
import type { components, paths } from './generated/openapi';

/**
 * 서버 타입의 단일 진입점입니다.
 *
 * - 원본은 백엔드 Swagger 입니다. `generated/openapi.ts` 는 `pnpm --filter @somesay/shared api:sync` 로만 갱신합니다.
 * - 별칭 이름은 Swagger 스키마 이름과 똑같이 둡니다. 접미사가 없으면 서버 모양, `…Type` 이면 프론트가 만든 타입입니다.
 * - 필드 이름을 프론트에서 바꾸지 않습니다. 필요한 필드는 컴포넌트가 이 타입에서 한 번만 Pick 해 선언합니다.
 * - 별칭은 실제로 쓰는 스키마만 추가합니다. (구역별 이관 중)
 */
export type { components, paths };

type Schemas = components['schemas'];

// GET 으로 호출할 수 있는 경로입니다. 쿼리 키·무효화 헬퍼가 경로 오타를 막는 데 씁니다.
export type ApiGetPath = PathsWithMethod<paths, 'get'>;

// 카테고리
export type MainCategoryResponse = Schemas['MainCategoryResponse'];
export type SubCategoryItemResponse = Schemas['SubCategoryItemResponse'];

// 인증·온보딩·유저
export type SignUpInfoRequest = Schemas['SignUpInfoRequest'];
export type InfoResponse = Schemas['InfoResponse'];
export type MyPageResponse = Schemas['MyPageResponse'];
export type UserProductRequest = Schemas['UserProductRequest'];
export type UserProductItemResponse = Schemas['UserProductItemResponse'];

// 상품·찜·브랜드
// ProductPreviewCard = 작은 카드(랭킹·비슷한 상품), ProductCard = 큰 카드(카테고리·브랜드·검색·홈 목록)
export type ProductPreviewCard = Schemas['ProductPreviewCard'];
export type ProductCard = Schemas['ProductCard'];
export type EffectChip = Schemas['EffectChip'];
export type ProductDetailResponse = Schemas['ProductDetailResponse'];
export type WishRequest = Schemas['WishRequest'];
export type ProductWishResponse = Schemas['ProductWishResponse'];
export type BrandResponse = Schemas['BrandResponse'];

// 정렬 값은 스키마가 아니라 쿼리 파라미터 enum 이라 경로에서 꺼냅니다.
export type ProductSortType = NonNullable<
  paths['/api/v1/products']['get']['parameters']['query']['sortType']
>;
export type BrandProductSortType = NonNullable<
  NonNullable<
    paths['/api/v1/brands/{brandId}/products']['get']['parameters']['query']
  >['sortType']
>;
