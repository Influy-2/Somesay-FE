import cn from '@/utils/cn';
import { ReviewComment } from '@/shared/components';
import type { CommentPreviewType } from '@somesay/shared';

interface ReviewCommentListProps {
  comments: CommentPreviewType[];
  className?: string;
}

// 리뷰 카드의 미리보기와 바텀시트의 전체보기가 같은 목록을 그리므로 한곳에 둡니다.
export const ReviewCommentList = ({
  comments,
  className,
}: ReviewCommentListProps) => {
  return (
    <ol className={cn('divide-grey03 flex flex-col divide-y px-4', className)}>
      {comments.map((comment) => (
        <li key={comment.reactionId}>
          <ReviewComment
            nickname={comment.nickname}
            isAgree={comment.reactionType === 'AGREE'}
            content={comment.comment}
            skinTypeIds={comment.skinTypeIds}
            skinExpectationIds={comment.skinExpectationIds}
            userId={comment.userId}
          />
        </li>
      ))}
    </ol>
  );
};
