//Review/내리뷰평가

import { useState, useEffect, useRef } from 'react';
import { MoreIcon, ToggleDown10Icon, ToggleUp10Icon } from '@/shared/icons';
import cn from '@/utils/cn';
import {
  ChipAgreement,
  ReviewVoteStatusButton,
  Tooltip,
  ReviewProductLink,
  StarRating,
} from '@/shared/components';

interface EvaluatedReviewCardProps {
  review: {
    reviewId: number;
    creatorName?: string;
    rating: number;
    content: string;
    isAgreed: boolean;
    product: {
      productId: number;
      productName: string;
      brandName: string;
      productImgUrl: string;
      price: number;
    };
    myComment?: {
      commentId: number;
      nickname: string;
      isAgree: boolean;
      content: string;
    };
  };
  onCommentEdit?: (comment: string) => void;
  onOpenVoteMenu?: () => void;
  onOpenCommentMenu?: () => void;
  showGuideTooltip?: boolean;
  onCloseGuideTooltip?: () => void;
}

export const EvaluatedReviewCard = ({
  review,
  onOpenVoteMenu,
  onOpenCommentMenu,
  showGuideTooltip,
  onCloseGuideTooltip,
}: EvaluatedReviewCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflow(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, []);

  return (
    <div className="border-grey03 flex flex-col border p-5">
      {/* 상품 정보 */}
      <ReviewProductLink product={review.product} />

      <div className="mt-4" />
      {/* 리뷰 */}
      <div className="flex flex-col gap-1">
        {/* 별점 */}
        <div className="flex items-center gap-1">
          <StarRating rating={review.rating} />
          <span className="body2-sb">{review.rating}</span>
        </div>
        {/* 리뷰 텍스트 */}
        <p
          ref={contentRef}
          className={cn('body2-m text-grey08', !isExpanded && 'line-clamp-4')}
        >
          {review.content}
        </p>
        {isOverflow && (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="body2-m text-grey05 flex w-full items-center justify-center gap-1.5 pt-2"
          >
            {isExpanded ? (
              <>
                접기 <ToggleUp10Icon aria-hidden="true" />
              </>
            ) : (
              <>
                더보기 <ToggleDown10Icon aria-hidden="true" />
              </>
            )}
          </button>
        )}

        {/* 공감/반대 버튼 */}
        <div className="relative mt-5 flex items-center justify-between gap-4">
          {showGuideTooltip && (
            <Tooltip
              label={`프로필을 누르면 크리에이터의\n이름을 확인할 수 있어요.`}
              isVisible={showGuideTooltip}
              variant="withClose"
              {...(onCloseGuideTooltip ? { onClose: onCloseGuideTooltip } : {})}
              className="bottom-full left-14 mb-2"
              arrowPosition="top"
              arrowClassName="left-4"
            />
          )}
          <ReviewVoteStatusButton
            type={review.isAgreed ? 'agree' : 'disagree'}
            {...(review.creatorName ? { creatorName: review.creatorName } : {})}
          />
          <button
            type="button"
            aria-label="더보기 메뉴"
            onClick={onOpenCommentMenu}
          >
            <MoreIcon />
          </button>
        </div>
      </div>
      {/* 내 코멘트 */}
      {review.myComment && (
        <>
          <div className="mt-5" />
          <div className="bg-grey03 h-px w-full" />
          <div className="mt-5" />
          <div className="flex flex-col gap-2">
            {/* 프로필 + 아이디 + chip + 더보기 */}
            <div className="flex items-center gap-1.5">
              <div className="bg-grey03 size-5 shrink-0 overflow-hidden rounded-full" />
              <span className="caption1-m text-grey06 mr-0.5">
                {review.myComment.nickname}
              </span>
              <ChipAgreement
                type={review.myComment.isAgree ? 'agree' : 'disagree'}
              />
              <button
                type="button"
                aria-label="더보기 메뉴"
                className="ml-auto"
                onClick={onOpenVoteMenu}
              >
                <MoreIcon />
              </button>
            </div>
            {/* 코멘트 텍스트 */}
            <p className="body2-m pl-7">{review.myComment.content}</p>
          </div>
        </>
      )}
    </div>
  );
};
