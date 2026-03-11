// Review/공감반대 컴포넌트
import { ReviewVoteButton, ReviewVoteType } from '../buttons/ReviewVoteButton';

interface ReviewVoteGroupProps {
  content: string;
  selectedVote: ReviewVoteType | null;
  onClickVote: (reaction: ReviewVoteType) => void;
}

export const ReviewVoteGroup = ({
  content,
  selectedVote,
  onClickVote,
}: ReviewVoteGroupProps) => {
  return (
    <article
      aria-label="리뷰 및 리뷰 평가"
      className="border-grey03 bg-grey01 flex w-full flex-col items-start gap-5 border border-solid p-5"
    >
      {/* 리뷰 글 */}
      <p className="body2-m text-[#1F2129]">{content}</p>

      {/* 하단 공감 비공감 버튼 */}
      <div className="flex w-full gap-4">
        <ReviewVoteButton
          type="agree"
          isActive={selectedVote === 'agree'}
          onClick={() => onClickVote('agree')}
          disabled={selectedVote !== null}
        />
        <ReviewVoteButton
          type="disagree"
          isActive={selectedVote === 'disagree'}
          onClick={() => onClickVote('disagree')}
          disabled={selectedVote !== null}
        />
      </div>
    </article>
  );
};
