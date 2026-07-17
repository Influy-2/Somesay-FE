import { useNavigate } from 'react-router';
import {
  EvaluatedProductItemVertical,
  EvaluatedReviewCard,
  SortBar,
  OnOffButton,
} from '@/shared/components';
import {
  MOCK_EVALUATED_PRODUCTS,
  MOCK_EVALUATED_REVIEWS,
} from '@/features/myPage/components/mockData';
import { PATH } from '@/routes/path';

type SheetState =
  | { type: 'vote'; reviewId: number; isAgreed: boolean }
  | { type: 'comment'; reviewId: number }
  | null;

interface ProductsTabProps {
  selectedProductId: number;
  setSelectedProductId: (id: number) => void;
  sortValue: string;
  setSortValue: (value: string) => void;
  showCommentOnly: boolean;
  setShowCommentOnly: (value: boolean) => void;
  showGuideTooltip: boolean;
  onCloseGuideTooltip: () => void;
  onOpenVoteMenu: (state: SheetState) => void;
  onOpenCommentMenu: (reviewId: number) => void;
  onCommentEdit: (comment: string) => void;
}

export const ProductsTab = ({
  selectedProductId,
  setSelectedProductId,
  sortValue,
  setSortValue,
  showCommentOnly,
  setShowCommentOnly,
  showGuideTooltip,
  onCloseGuideTooltip,
  onOpenVoteMenu,
  onOpenCommentMenu,
  onCommentEdit,
}: ProductsTabProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <p className="body2-m px-4 pt-4">
        <span className="body2-sb">
          '
          {
            MOCK_EVALUATED_PRODUCTS.find(
              (p) => p.productId === selectedProductId
            )?.productName
          }
          '
        </span>
        리뷰에 남긴 평가
      </p>

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

      <div className="bg-grey01 flex items-center justify-between px-4 py-3">
        <span className="body2-m">코멘트 쓴 리뷰만 보기</span>
        <OnOffButton
          isOn={showCommentOnly}
          onToggle={() => setShowCommentOnly(!showCommentOnly)}
          ariaLabel="코멘트 쓴 리뷰만 보기"
        />
      </div>

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
            onCommentEdit={onCommentEdit}
            onOpenVoteMenu={() =>
              onOpenVoteMenu({
                type: 'vote',
                reviewId: review.reviewId,
                isAgreed: review.isAgreed,
              })
            }
            onOpenCommentMenu={() => onOpenCommentMenu(review.reviewId)}
            showGuideTooltip={index === 0 && showGuideTooltip}
            onCloseGuideTooltip={onCloseGuideTooltip}
          />
        ))}
      </div>
    </div>
  );
};
