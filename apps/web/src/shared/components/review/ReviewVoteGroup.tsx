// Review/공감반대 컴포넌트
import { ReviewVoteButton, ReviewVoteType } from '../buttons/ReviewVoteButton';
//TODO: 버튼 클릭하면 다른거는 못 클릭 하도록 바꿔야 함.
interface ReviewVoteGroupProps {
  content: string;
  onClickVote: (reaction: ReviewVoteType) => void;
}

export const ReviewVoteGroup = ({
  content,
  onClickVote,
}: ReviewVoteGroupProps) => {
  return (
    <article
      aria-label="리뷰 및 리뷰 평가"
      className="border-grey03 bg-grey01 flex w-full flex-col items-start gap-5 border border-solid p-5"
    >
      <p className="body2-m text-[#1F2129]">{content}</p>
      <div className="flex w-full gap-4">
        <ReviewVoteButton
          type="agree"
          isActive={false}
          onClick={() => onClickVote('agree')}
        />
        <ReviewVoteButton
          type="disagree"
          isActive={false}
          onClick={() => onClickVote('disagree')}
        />
      </div>
    </article>
  );
};
