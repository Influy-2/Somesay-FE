import { BasicProductCardSkeleton } from '@/shared/components';

const CATEGORY_PRODUCT_SKELETON_COUNT = 8;

/** 홈 카테고리별 상품 목록 조회 중 카드 골격을 표시합니다. */
export const CategoryProductSkeleton = () => (
  <div
    role="status"
    aria-label="추천 상품 목록을 불러오는 중"
    className="grid grid-cols-2 gap-x-1 gap-y-6 pb-2"
  >
    {Array.from({ length: CATEGORY_PRODUCT_SKELETON_COUNT }).map((_, index) => (
      <BasicProductCardSkeleton key={`category-product-skeleton-${index}`} />
    ))}
  </div>
);
