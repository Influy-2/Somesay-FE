import { BasicCreatorProfile, ReviewProductLink } from '@/shared/components';
import { StarRating } from '../rating/StarRating';
import type { SearchResultReviewType } from '@somesay/shared';

interface SearchResultReviewCardProps {
  review: SearchResultReviewType;
}

export const SearchResultReviewCard = ({
  review,
}: SearchResultReviewCardProps) => {
  const { creator, rating, content, product } = review;

  return (
    <article
      className="border-grey02 flex flex-col gap-4 border-b px-4 pb-6"
      aria-label={`${creator.nickname}의 리뷰, 별점 ${rating}점`}
    >
      {/* 크리에이터 프로필 */}
      <BasicCreatorProfile {...creator} />

      {/* 리뷰 내용 */}
      <div className="flex flex-col gap-6">
        {/* 별점 + 리뷰 텍스트 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <StarRating rating={rating} />
            <span className="body2-sb text-black">{rating}</span>
          </div>
          <p className="body2-m line-clamp-4 text-black">{content}</p>
        </div>

        {/* 연결 상품 */}
        <ReviewProductLink product={product} showArrow={true} />
      </div>
    </article>
  );
};
