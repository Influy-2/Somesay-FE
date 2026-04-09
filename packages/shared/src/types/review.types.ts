import { BasicCreatorProfileType } from './creator.types';
import { ProductCardType } from './product.types';
export interface CreatorReviewType {
  reviewId: number;
  content: string;
  rating: number;
  agreeCount: number;
  disagreeCount: number;
  createdAt: string;
  youtubeUrl?: string;
  timelinkCount?: number;
  creatorId: number;
  productId: number;
}
export interface SearchResultReviewType extends Omit<
  CreatorReviewType,
  'creatorId' | 'productId'
> {
  creator: BasicCreatorProfileType;
  product: ProductCardType;
}
