import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  PageHeader,
  TabBar,
  EvaluatedProductItemVertical,
  EvaluatedCreatorItemVertical,
  EvaluatedReviewCard,
  SortBar,
  OnOffButton,
  CommentInput,
  Snackbar,
} from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import {
  MOCK_RECOMMENDED_CREATORS,
  MOCK_EVALUATED_PRODUCTS,
  MOCK_EVALUATED_REVIEWS,
} from '@/features/myPage/components/mockData';
import { PATH } from '@/routes/path';

type TabType = 'products' | 'creators';

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
        <div className="flex flex-col">
          {/* 선택된 상품명 */}
          <p className="body2-m px-4 pt-4">
            <span className="body2-sb">
              '
              {
                MOCK_EVALUATED_PRODUCTS.find(
                  (p) => p.productId === selectedProductId
                )?.productName
              }
              '
            </span>{' '}
            리뷰에 남긴 평가
          </p>

          {/* 상품 가로 스크롤 */}
          <div className="relative flex items-center">
            <div className="scrollbar-hide mb-3 flex gap-4 overflow-x-auto px-4 pt-5">
              {MOCK_EVALUATED_PRODUCTS.map((product) => (
                <EvaluatedProductItemVertical
                  key={product.productId}
                  productId={product.productId}
                  productImageUrl={product.productImageUrl}
                  productName={product.productName}
                  isSelected={selectedProductId === product.productId}
                  onClick={setSelectedProductId}
                />
              ))}
            </div>
            <button
              type="button"
              className="caption1-m shrink-0 bg-white px-4"
              onClick={() =>
                navigate(
                  `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.REVIEW_EVALUATION.BASE}/${PATH.MY_PAGE.REVIEW_EVALUATION.PRODUCTS.BASE}`
                )
              }
            >
              전체
            </button>
          </div>

          {/* 개수 + 정렬 */}
          <SortBar
            count={
              MOCK_EVALUATED_REVIEWS.filter(
                (r) => r.product.productId === selectedProductId
              ).length
            }
            sortOptions={[
              { value: 'all', label: '전체' },
              { value: 'agreed', label: '공감한 리뷰' },
              { value: 'disagreed', label: '반대한 리뷰' },
            ]}
            currentSortValue={sortValue}
            onSelectSort={setSortValue}
          />
          {/* 코멘트 쓴 리뷰만 보기 */}
          <div className="bg-grey01 flex items-center justify-between px-4 py-3">
            <span className="body2-m">코멘트 쓴 리뷰만 보기</span>
            <OnOffButton
              isOn={showCommentOnly}
              onToggle={() => setShowCommentOnly((prev) => !prev)}
            />
          </div>

          {/* 리뷰 목록 */}
          <div className="mb-7 flex flex-col gap-6 px-4 pt-5">
            {MOCK_EVALUATED_REVIEWS.filter((review) => {
              if (review.product.productId !== selectedProductId) return false;
              if (showCommentOnly && !review.myComment) return false;
              if (sortValue === 'agreed' && !review.isAgreed) return false;
              if (sortValue === 'disagreed' && review.isAgreed) return false;
              return true;
            }).map((review, index) => (
              <EvaluatedReviewCard
                key={review.reviewId}
                review={review}
                onCommentEdit={(comment) => setEditingComment(comment)}
                showGuideTooltip={index === 0 && showGuideTooltip}
                onCloseGuideTooltip={() => setShowGuideTooltip(false)}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'creators' && (
        <div className="flex flex-col">
          {/* 선택된 크리에이터명 */}
          <p className="body2-m px-4 pt-4">
            <span className="body2-sb">
              '
              {
                MOCK_RECOMMENDED_CREATORS.find(
                  (c) => c.creatorId === selectedCreatorId
                )?.name
              }
              '
            </span>{' '}
            리뷰에 남긴 평가
          </p>

          {/* 크리에이터 가로 스크롤 */}
          <div className="relative flex items-center">
            <div className="scrollbar-hide mb-3 flex gap-4 overflow-x-auto px-4 pt-5">
              {MOCK_RECOMMENDED_CREATORS.map((creator) => (
                <EvaluatedCreatorItemVertical
                  key={creator.creatorId}
                  creatorId={creator.creatorId}
                  profileImageUrl={creator.profileImageUrl}
                  name={creator.name}
                  isSelected={selectedCreatorId === creator.creatorId}
                  onClick={setSelectedCreatorId}
                />
              ))}
            </div>
            <button
              type="button"
              className="caption1-m shrink-0 bg-white px-4"
              onClick={() =>
                navigate(
                  `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.REVIEW_EVALUATION.BASE}/${PATH.MY_PAGE.REVIEW_EVALUATION.CREATORS.BASE}`
                )
              }
            >
              전체
            </button>
          </div>

          {/* 개수 + 정렬 */}
          <SortBar
            count={
              MOCK_EVALUATED_REVIEWS.filter(
                (r) => r.creatorId === selectedCreatorId
              ).length
            }
            sortOptions={[
              { value: 'all', label: '전체' },
              { value: 'agreed', label: '공감한 리뷰' },
              { value: 'disagreed', label: '반대한 리뷰' },
            ]}
            currentSortValue={sortValue}
            onSelectSort={setSortValue}
          />

          {/* 코멘트 쓴 리뷰만 보기 */}
          <div className="bg-grey01 flex items-center justify-between px-4 py-3">
            <span className="body2-m">코멘트 쓴 리뷰만 보기</span>
            <OnOffButton
              isOn={showCommentOnly}
              onToggle={() => setShowCommentOnly((prev) => !prev)}
            />
          </div>

          {/* 리뷰 목록 */}
          <div className="mb-7 flex flex-col gap-6 px-4 pt-5">
            {MOCK_EVALUATED_REVIEWS.filter((review) => {
              if (review.creatorId !== selectedCreatorId) return false;
              if (showCommentOnly && !review.myComment) return false;
              if (sortValue === 'agreed' && !review.isAgreed) return false;
              if (sortValue === 'disagreed' && review.isAgreed) return false;
              return true;
            }).map((review) => (
              <EvaluatedReviewCard
                key={review.reviewId}
                review={review}
                onCommentEdit={(comment) => setEditingComment(comment)}
              />
            ))}
          </div>
        </div>
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

      {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          onClose={() => setSnackbarMessage(null)}
        />
      )}
    </div>
  );
};
