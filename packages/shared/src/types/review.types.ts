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
