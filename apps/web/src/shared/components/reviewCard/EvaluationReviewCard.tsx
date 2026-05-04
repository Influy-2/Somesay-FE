// Review card/평가전 평가후

import type { CreatorType } from '@somesay/shared';
import { EvaluationCardProfile } from '../profile/EvaluationCardProfile';
import { StarRating } from '../rating/StarRating';
import { ReviewVoteButton } from '../buttons/ReviewVoteButton';
import { RateBar } from '../ratebar/RateBar';
import type { ReviewVoteType } from '../buttons/ReviewVoteButton';

type EvaluationReviewCardProps = {
  creator: Pick<
    CreatorType,
    | 'nickname'
    | 'profileImageUrl'
    | 'subscriberCount'
    | 'trustScore'
    | 'ranking'
    | 'ageGroup'
    | 'skinType'
  >;
  rating: number;
  content: string;
  evaluated: boolean;
  selectedVote: ReviewVoteType | null;
  agreePercentage: number;
  participantCount: number;
  onClickVote: (type: ReviewVoteType) => void;
};

export const EvaluationReviewCard = ({
  creator,
  rating,
  content,
  evaluated,
  selectedVote,
  agreePercentage,
  participantCount,
  onClickVote,
}: EvaluationReviewCardProps) => {
  const disagreePercentage = 100 - agreePercentage;

  return (
    <article
      className="border-grey03 flex w-full flex-col gap-7 border bg-white p-5"
      aria-label="리뷰 평가 카드"
    >
      {/* 상단: 프로필 + 리뷰 + (평가 후) 비율 바 */}
      <div className="flex w-full flex-col gap-7">
        {/* 프로필 + 별점 + 리뷰 텍스트 */}
        <div className="flex w-full flex-col gap-4">
          <EvaluationCardProfile {...creator} evaluated={evaluated} />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-[2.5px]" aria-hidden="true">
              <StarRating rating={rating} />
              <span className="body2-sb text-[#1F2129]">{rating}</span>
            </div>
            <p
              className="body2-m text-[#1F2129]"
              aria-label={`별점 ${rating}점. ${content}`}
            >
              {content}
            </p>
          </div>
        </div>

        {/* 평가 후: 공감 비율 텍스트 + 바 */}
        {evaluated && selectedVote && (
          <div className="flex w-full flex-col gap-1.5">
            <div className="body2-m flex w-full items-center justify-between">
              <p>
                <span className="body2-sb">
                  {selectedVote === 'agree'
                    ? `${agreePercentage}%`
                    : `${disagreePercentage}%`}
                </span>
                {selectedVote === 'agree'
                  ? '의 사용자가 공감했어요'
                  : '의 사용자가 반대했어요'}
              </p>
              <span className="text-grey06">
                {participantCount.toLocaleString('ko-KR')}명 참여
              </span>
            </div>
            <RateBar
              percentage={
                selectedVote === 'agree' ? agreePercentage : disagreePercentage
              }
              reversed={selectedVote === 'disagree'}
            />
          </div>
        )}
      </div>

      {/* 하단: 공감 / 반대 버튼 */}
      <div className="flex w-full gap-2">
        <ReviewVoteButton
          type="agree"
          isActive={selectedVote === 'agree'}
          onClick={onClickVote}
          disabled={selectedVote !== null}
        />
        <ReviewVoteButton
          type="disagree"
          isActive={selectedVote === 'disagree'}
          onClick={onClickVote}
          disabled={selectedVote !== null}
        />
      </div>
    </article>
  );
};
