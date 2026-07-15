//Review/내리뷰평가

import { useState, useEffect, useRef } from 'react';
import {
  Star16Icon,
  MoreIcon,
  ToggleDownIcon,
  ToggleUpIcon,
  DeleteIcon,
  AgreeIcon,
  DisagreeIcon,
  EditIcon,
} from '@/shared/icons';
import cn from '@/utils/cn';
import {
  ChipAgreement,
  ReviewVoteStatusButton,
  BottomSheet,
  Snackbar,
  Modal,
  Tooltip,
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
      brand: string;
      imageUrl: string;
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
  showGuideTooltip?: boolean;
  onCloseGuideTooltip?: () => void;
}

export const EvaluatedReviewCard = ({
  review,
  onCommentEdit,
  showGuideTooltip,
  onCloseGuideTooltip,
}: EvaluatedReviewCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVoteMenuOpen, setIsVoteMenuOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
  const [isCommentDeleteModalOpen, setIsCommentDeleteModalOpen] =
    useState(false);
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
      <div className="flex items-center gap-3">
        <div className="bg-grey02 w-15 shrink-0 self-stretch overflow-hidden">
          {review.product.imageUrl && (
            <img
              src={review.product.imageUrl}
              alt={review.product.productName}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="caption1-m text-grey-black flex flex-col gap-1">
          <span>{review.product.brand}</span>
          <span className="line-clamp-1">{review.product.productName}</span>
          <span>{review.product.price.toLocaleString()}원</span>
        </div>
      </div>
      <div className="mt-4" />
      {/* 리뷰 */}
      <div className="flex flex-col gap-1">
        {/* 별점 */}
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star16Icon
              key={i}
              className={i < review.rating ? 'text-primary-300' : 'text-grey03'}
              aria-hidden="true"
            />
          ))}
          <span className="body2-sb ml-1">{review.rating}</span>
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
            className="body2-m text-grey06 flex w-full items-center justify-center gap-1.5 pt-2"
          >
            {isExpanded ? (
              <>
                접기 <ToggleUpIcon aria-hidden="true" />
              </>
            ) : (
              <>
                더보기 <ToggleDownIcon aria-hidden="true" />
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
            onClick={() => setIsVoteMenuOpen(true)}
          >
            <MoreIcon />
          </button>
        </div>

        {/* 평가 액션 바텀시트 */}
        <BottomSheet
          isOpen={isVoteMenuOpen}
          onClose={() => setIsVoteMenuOpen(false)}
          ariaLabel="평가 옵션"
          height="h-fit"
        >
          <ul className="flex flex-col px-4 pt-2 pb-8">
            <li>
              <button
                type="button"
                onClick={() => {
                  setSnackbarMessage(
                    `평가를 '${review.isAgreed ? '반대해요' : '공감해요'}'로 변경했습니다.`
                  );
                  setIsVoteMenuOpen(false);
                }}
                className="body1-sb flex w-full items-center gap-3 py-5"
              >
                {review.isAgreed ? <DisagreeIcon /> : <AgreeIcon />}
                <span>
                  '{review.isAgreed ? '반대해요' : '공감해요'}'로 바꾸기
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setIsVoteMenuOpen(false);
                  setIsDeleteModalOpen(true);
                }}
                className="body1-sb flex w-full items-center gap-3 py-5"
              >
                <DeleteIcon />
                <span>평가 삭제하기</span>
              </button>
            </li>
          </ul>
        </BottomSheet>
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
                onClick={() => setIsCommentMenuOpen(true)}
              >
                <MoreIcon />
              </button>
            </div>
            {/* 코멘트 텍스트 */}

            <p className="body2-m pl-7">{review.myComment.content}</p>
          </div>
          <BottomSheet
            isOpen={isCommentMenuOpen}
            onClose={() => setIsCommentMenuOpen(false)}
            ariaLabel="코멘트 옵션"
            height="h-fit"
          >
            <ul className="flex flex-col px-4 pt-2 pb-8">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setIsCommentMenuOpen(false);
                    onCommentEdit?.(review.myComment?.content ?? '');
                  }}
                  className="body1-sb flex w-full items-center gap-3 py-5"
                >
                  <EditIcon />
                  <span>코멘트 수정하기</span>
                </button>
              </li>
              <li className="border-grey03 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsCommentMenuOpen(false);
                    setIsCommentDeleteModalOpen(true);
                  }}
                  className="body1-sb flex w-full items-center gap-3 py-5"
                >
                  <DeleteIcon />
                  <span>코멘트 삭제하기</span>
                </button>
              </li>
            </ul>
          </BottomSheet>

          <Modal
            isOpen={isCommentDeleteModalOpen}
            onClose={() => setIsCommentDeleteModalOpen(false)}
            title="코멘트를 삭제하시겠습니까?"
            description=""
            leftButton={{
              label: '취소',
              onClick: () => setIsCommentDeleteModalOpen(false),
            }}
            rightButton={{
              label: '삭제',
              onClick: () => {
                setSnackbarMessage('코멘트가 삭제되었습니다.');
                setIsCommentDeleteModalOpen(false);
              },
            }}
          />
        </>
      )}
      {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          onClose={() => setSnackbarMessage(null)}
          className="bottom-10"
        />
      )}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="평가를 삭제하시겠습니까?"
        description=""
        leftButton={{
          label: '취소',
          onClick: () => setIsDeleteModalOpen(false),
        }}
        rightButton={{
          label: '삭제',
          onClick: () => {
            setSnackbarMessage('평가가 삭제되었습니다.');
            setIsDeleteModalOpen(false);
          },
        }}
      />
    </div>
  );
};
