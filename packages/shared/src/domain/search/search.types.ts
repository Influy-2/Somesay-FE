import type { ProductPreviewCard } from '../../api/schema';
import type { BasicCreatorProfileType } from '../creator/creator.types';
import type { CreatorReviewType } from '../review/review.types';

// 상품 검색 결과는 서버 ProductCard 를 그대로 씁니다. (검색 화면은 아직 목업)

export interface ReviewSearchResultType extends Omit<
  CreatorReviewType,
  'creatorId' | 'productId'
> {
  creator: BasicCreatorProfileType;
  product: ProductPreviewCard;
}
