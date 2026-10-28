// Review/크리에이터 프로필 공개 컴포넌트
// 글 길어지면 더보기 버전
import { BasicCreatorProfile } from '../profile/BasicCreatorProfile';
import { StarRating } from '../rating/StarRating';
import { BasicCreatorProfileType } from '@somesay/shared';

interface CreatorReviewCardProps {
  creator: BasicCreatorProfileType;
  rating: number;
  content: string;
  productName: string;
}

export const CreatorReviewExpandedCard = ({
  rating,
  content,
  productName,
  creator,
}: CreatorReviewCardProps) => {
  return (
    <article
      aria-label={`${creator.creatorName}의 ${productName} 리뷰`}
      className="border-grey03 flex w-full flex-col items-start gap-5 border border-solid bg-white p-5 px-4"
    >
      {/* 크리에이터 프로필 */}
      <BasicCreatorProfile {...creator} />
      <div
        className="flex w-full flex-col items-start gap-1"
        aria-label={`별점 ${rating}점. ${content}`}
      >
        {/* 리뷰 별점 */}
        <div className="flex items-center gap-1" aria-hidden="true">
          <StarRating rating={rating} />
          <span className="body2-sb text-[#1F2129]">{rating}</span>
        </div>

        {/* 전체 리뷰 내용 */}
        <p aria-hidden="true" className="body2-m text-[#1F2129]">
          {content}
        </p>
      </div>
    </article>
  );
};
