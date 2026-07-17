import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  PageHeader,
  TabBar,
  CommentInput,
  Snackbar,
  Modal,
} from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import { ReviewEvaluationBottomSheet } from '@/features/myPage/myReviewEvaluation/components/ReviewEvaluationBottomSheet';
import { MOCK_EVALUATED_REVIEWS } from '@/features/myPage/components/mockData';

import { ProductsTab } from '@/features/myPage/myReviewEvaluation/components/ProductsTab';
import { CreatorsTab } from '@/features/myPage/myReviewEvaluation/components/Creatorstab';

type TabType = 'products' | 'creators';
type SheetState =
  | { type: 'vote'; reviewId: number; isAgreed: boolean }
  | { type: 'comment'; reviewId: number }
  | null;

type ModalState =
  | { type: 'deleteVote'; reviewId: number }
  | { type: 'deleteComment'; reviewId: number }
  | null;

export const MyReviewEvaluationPage = () => {
  const navigate = useNavigate();
  const [sortValue, setSortValue] = useState('all');
  const [showCommentOnly, setShowCommentOnly] = useState(false);
  const location = useLocation();
  const initialTab =
    (location.state as { activeTab?: TabType } | null)?.activeTab ?? 'products';
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const initialProductId =
    (location.state as { selectedProductId?: number } | null)
      ?.selectedProductId ?? 1;
  const initialCreatorId =
    (location.state as { selectedCreatorId?: number } | null)
      ?.selectedCreatorId ?? 1;
  const [selectedCreatorId, setSelectedCreatorId] = useState(initialCreatorId);
  const [selectedProductId, setSelectedProductId] = useState(initialProductId);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [showGuideTooltip, setShowGuideTooltip] = useState(true);
  const [sheetState, setSheetState] = useState<SheetState>(null);
  const [modalState, setModalState] = useState<ModalState>(null);
  const handleChangeVote = () => {
    // TODO: API 연결
    const isAgreed = sheetState?.type === 'vote' ? sheetState.isAgreed : false;
    setSnackbarMessage(
      `평가를 '${isAgreed ? '반대해요' : '공감해요'}'로 변경했습니다.`
    );
  };

  const handleDeleteVote = (reviewId: number) => {
    setModalState({ type: 'deleteVote', reviewId });
  };

  const handleEditComment = (reviewId: number) => {
    const review = MOCK_EVALUATED_REVIEWS.find((r) => r.reviewId === reviewId);
    setEditingComment(review?.myComment?.content ?? '');
  };

  const handleDeleteComment = (reviewId: number) => {
    setModalState({ type: 'deleteComment', reviewId });
  };
  return (
    <div className="mt-13.5 flex flex-col">
      <PageHeader
        title="내 리뷰 평가"
        left={
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="뒤로 가기"
          >
            <ArrowBackIcon aria-hidden="true" />
          </button>
        }
      />
      <TabBar
        tabs={[
          {
            tabText: '상품별',
            isActive: activeTab === 'products',
            onClick: () => setActiveTab('products'),
          },
          {
            tabText: '크리에이터별',
            isActive: activeTab === 'creators',
            onClick: () => setActiveTab('creators'),
          },
        ]}
      />

      {activeTab === 'products' && (
        <ProductsTab
          selectedProductId={selectedProductId}
          setSelectedProductId={setSelectedProductId}
          sortValue={sortValue}
          setSortValue={setSortValue}
          showCommentOnly={showCommentOnly}
          setShowCommentOnly={setShowCommentOnly}
          showGuideTooltip={showGuideTooltip}
          onCloseGuideTooltip={() => setShowGuideTooltip(false)}
          onOpenVoteMenu={setSheetState}
          onOpenCommentMenu={(reviewId) =>
            setSheetState({ type: 'comment', reviewId })
          }
          onCommentEdit={setEditingComment}
        />
      )}

      {activeTab === 'creators' && (
        <CreatorsTab
          selectedCreatorId={selectedCreatorId}
          setSelectedCreatorId={setSelectedCreatorId}
          sortValue={sortValue}
          setSortValue={setSortValue}
          showCommentOnly={showCommentOnly}
          setShowCommentOnly={setShowCommentOnly}
          onOpenVoteMenu={setSheetState}
          onOpenCommentMenu={(reviewId) =>
            setSheetState({ type: 'comment', reviewId })
          }
          onCommentEdit={setEditingComment}
        />
      )}
      {editingComment !== null && (
        <div className="border-grey02 fixed bottom-0 left-1/2 w-full max-w-110 -translate-x-1/2 border-t bg-white px-4 pt-2 pb-7.5">
          <CommentInput
            // defaultValue={editingComment}
            onSubmit={() => {
              setEditingComment(null);
              setSnackbarMessage('코멘트가 수정되었습니다.');
            }}
          />
        </div>
      )}
      <ReviewEvaluationBottomSheet
        state={sheetState}
        onClose={() => setSheetState(null)}
        onChangeVote={handleChangeVote}
        onDeleteVote={handleDeleteVote}
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
      />

      <Modal
        isOpen={modalState !== null}
        onClose={() => setModalState(null)}
        title={
          modalState?.type === 'deleteVote'
            ? '평가를 삭제하시겠습니까?'
            : '코멘트를 삭제하시겠습니까?'
        }
        description=""
        leftButton={{
          label: '취소',
          onClick: () => setModalState(null),
        }}
        rightButton={{
          label: '삭제',
          onClick: () => {
            setSnackbarMessage(
              modalState?.type === 'deleteVote'
                ? '평가가 삭제되었습니다.'
                : '코멘트가 삭제되었습니다.'
            );
            setModalState(null);
          },
        }}
      />

      {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          onClose={() => setSnackbarMessage(null)}
          className="bottom-7.5"
        />
      )}
    </div>
  );
};
