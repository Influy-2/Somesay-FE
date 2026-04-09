import type { BasicCreatorProfileType } from './creator.types';
import type { CreatorReviewType } from './review.types';
import type { ProductCardType } from './product.types';

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
