// Review/Search Results 컴포넌트
import { BasicCreatorProfile } from '../profile/BasicCreatorProfile';
import { ReviewProductLink } from '../product/ReviewProductLink';
import { StarRating } from '../rating/StarRating';
import type { ReviewSearchItemResponse } from '@somesay/shared';

interface SearchResultReviewCardProps {
  // 리뷰 검색 응답 한 건입니다. 크리에이터·상품 필드가 평탄하게 실려 객체째 하위 컴포넌트에 넘깁니다.
  review: ReviewSearchItemResponse;
}

export const SearchResultReviewCard = ({
  review,
}: SearchResultReviewCardProps) => {
  const { creatorName, reviewRating: rating, reviewContent: content } = review;

  return (
    <article
      className="border-grey02 flex flex-col gap-5 border-b px-4 pb-6"
      aria-label={
        rating == null
          ? `${creatorName}의 리뷰`
          : `${creatorName}의 리뷰, 별점 ${rating}점`
      }
    >
      {/* 크리에이터 프로필 */}
      <BasicCreatorProfile {...review} />

      <div className="flex flex-col gap-6">
        {/* 별점 + 리뷰 텍스트 */}
        <div className="flex flex-col gap-1">
          {/* 별점 */}
          {rating != null && (
            <div className="flex items-center gap-1">
              <StarRating rating={rating} />
              <span className="body2-sb text-black">{rating}</span>
            </div>
          )}
          {/* 리뷰 텍스트 */}
          <p className="body2-m line-clamp-4 text-black">{content}</p>
        </div>

        {/* 연결 상품 */}
        <ReviewProductLink product={review} showArrow={true} />
      </div>
    </article>
  );
};
