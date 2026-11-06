import cn from '@/utils/cn';
import { ReviewComment } from '@/shared/components';
import type { CommentItemResponse } from '@somesay/shared';

interface ReviewCommentListProps {
  comments: CommentItemResponse[];
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
        <li key={comment.commentId}>
          <ReviewComment
            nickname={comment.userNickname}
            isAgree={comment.reactionType === 'AGREE'}
            content={comment.commentContent}
            skinTypeIds={comment.userSkinTypeIds}
            skinExpectationIds={comment.userSkinExpectationIds}
            userId={comment.userId}
          />
        </li>
      ))}
    </ol>
  );
};
