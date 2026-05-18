import type { BasicCreatorProfileType } from '../creator/creator.types';
import type { ProductCardType } from '../product/product.types';
import type { CreatorReviewType } from '../review/review.types';

export interface ProductSearchResultType extends ProductCardType {
  reviewSummary: string;
  skinTypes: string[];
  expectedEffects: string[];
}

export interface ReviewSearchResultType extends Omit<
  CreatorReviewType,
  'creatorId' | 'productId'
> {
  creator: BasicCreatorProfileType;
  product: ProductCardType;
}
