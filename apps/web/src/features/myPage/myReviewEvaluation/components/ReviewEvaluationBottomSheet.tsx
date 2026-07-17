// apps/web/src/features/myReviewEvaluation/components/ReviewEvaluationBottomSheet.tsx
import { AgreeIcon, DisagreeIcon, DeleteIcon, EditIcon } from '@/shared/icons';
import { BottomSheet } from '@/shared/components';

type SheetState =
  | { type: 'vote'; reviewId: number; isAgreed: boolean }
  | { type: 'comment'; reviewId: number }
  | null;

interface ReviewEvaluationBottomSheetProps {
  state: SheetState;
  onClose: () => void;
  onChangeVote: (reviewId: number) => void;
  onDeleteVote: (reviewId: number) => void;
  onEditComment: (reviewId: number) => void;
  onDeleteComment: (reviewId: number) => void;
}

export const ReviewEvaluationBottomSheet = ({
  state,
  onClose,
  onChangeVote,
  onDeleteVote,
  onEditComment,
  onDeleteComment,
}: ReviewEvaluationBottomSheetProps) => {
  return (
    <BottomSheet
      isOpen={state !== null}
      onClose={onClose}
      ariaLabel={state?.type === 'vote' ? '평가 옵션' : '코멘트 옵션'}
      height="h-fit"
    >
      {state?.type === 'vote' && (
        <ul className="flex flex-col px-4 pt-2 pb-8">
          <li>
            <button
              type="button"
              onClick={() => {
                onChangeVote(state.reviewId);
                onClose();
              }}
              className="body1-sb flex w-full items-center gap-3 py-5"
            >
              {state.isAgreed ? <DisagreeIcon /> : <AgreeIcon />}
              <span>'{state.isAgreed ? '반대해요' : '공감해요'}'로 바꾸기</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                onDeleteVote(state.reviewId);
                onClose();
              }}
              className="body1-sb flex w-full items-center gap-3 py-5"
            >
              <DeleteIcon />
              <span>평가 삭제하기</span>
            </button>
          </li>
        </ul>
      )}
      {state?.type === 'comment' && (
        <ul className="flex flex-col px-4 pt-2 pb-8">
          <li>
            <button
              type="button"
              onClick={() => {
                onEditComment(state.reviewId);
                onClose();
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
                onDeleteComment(state.reviewId);
                onClose();
              }}
              className="body1-sb flex w-full items-center gap-3 py-5"
            >
              <DeleteIcon />
              <span>코멘트 삭제하기</span>
            </button>
          </li>
        </ul>
      )}
    </BottomSheet>
  );
};
