import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import {
  PageHeader,
  CTAButton,
  FloatingButtonScrollToTop,
  Tooltip,
} from '@/shared/components';
import { ArrowBackIcon, ShareIcon, HomeOffIcon } from '@/shared/icons';
import {
  ProductHero,
  CreatorReviewSummarySection,
  ReviewRankingList,
  SimilarProductsList,
} from '@/features/productDetail';
import {
  useFetchProductDetail,
  useFetchProductReviewOverview,
  useFetchSimilarProducts,
  useProductWish,
} from '@/shared/hooks';

export const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { toggleWish } = useProductWish();

  // URL에서 productId 추출 및 유효성 검사
  const { productId: productIdParam } = useParams();
  const parsedProductId = Number(productIdParam);
  const productId =
    productIdParam !== undefined && Number.isFinite(parsedProductId)
      ? parsedProductId
      : undefined;

  // 상품 상세 정보 API 호출
  const {
    data: productDetail,
    isLoading,
    isError,
  } = useFetchProductDetail(productId);

  const hasProductError = productId === undefined || isError;

  // 상품 리뷰 개요 정보 API 호출
  // TODO: Loading, Error 상태 UI 개선 (현재는 상품 정보 로딩/에러와 동일하게 처리)
  const { data: reviewOverview } = useFetchProductReviewOverview(productId);

  const handleWishToggle = () => {
    if (!productDetail) return;

    toggleWish({
      productId: productDetail.productId,
      isHearted: productDetail.isHearted,
    });
  };
  const handleReviewClick = () => navigate('/'); // TODO: 리뷰하기 페이지로 이동
  const { data: similarProducts } = useFetchSimilarProducts(productId);
  const [showEvalTooltip, setShowEvalTooltip] = useState(true);

  return (
    <div className="mt-13.5 flex flex-col bg-white pb-30">
      <PageHeader
        title="상품 여론 보기"
        left={
          <button
            onClick={() => navigate(-1)}
            className="p-1"
            aria-label="뒤로 가기"
            type="button"
          >
            <ArrowBackIcon aria-hidden="true" />
          </button>
        }
        right={[
          <div key="right-icons" className="flex items-center gap-1">
            <Link key="home" to="/" className="p-1" aria-label="홈으로 이동">
              <HomeOffIcon aria-hidden="true" />
            </Link>
            <button
              key="share"
              onClick={() => alert('공유하기')}
              className="pl-1"
              aria-label="공유하기"
              type="button"
            >
              <ShareIcon aria-hidden="true" />
            </button>
          </div>,
        ]}
      />
      <div className="bg-grey01 flex flex-col gap-2">
        {/* TODO: 임시 에러, 로딩중 처리 */}
        {hasProductError && (
          <div className="body2-m bg-white px-4 py-10 text-center">
            상품 정보를 불러오지 못했어요.
          </div>
        )}

        {isLoading && (
          <div className="body2-m bg-white px-4 py-10 text-center">
            상품 정보를 불러오는 중이에요.
          </div>
        )}

        {productDetail && (
          <>
            <ProductHero {...productDetail} onLikeClick={handleWishToggle} />
            {reviewOverview && (
              <CreatorReviewSummarySection {...reviewOverview} />
            )}
            <ReviewRankingList {...(productId ? { productId } : {})} />
            <SimilarProductsList products={similarProducts ?? []} />
          </>
        )}

        <div className="border-grey02 z-toast fixed bottom-0 left-1/2 w-full max-w-110 -translate-x-1/2 border bg-white px-4 pt-2 pb-7.5">
          <FloatingButtonScrollToTop className="z-toast absolute right-4 bottom-[calc(100%+12px)]" />
          {showEvalTooltip && (
            <Tooltip
              label={`이 상품을 사용해봤다면,\n크리에이터들의 리뷰를 평가해보세요`}
              isVisible={showEvalTooltip}
              variant="withClose"
              onClose={() => setShowEvalTooltip(false)}
              className="bottom-full left-4 mb-2"
              arrowPosition="top"
              arrowClassName="left-4"
            />
          )}
          <CTAButton
            label="이 상품 리뷰 평가하기"
            onClick={handleReviewClick}
          />
        </div>
      </div>
    </div>
  );
};
