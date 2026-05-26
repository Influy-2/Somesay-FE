import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PageHeader, CTAButton } from '@/shared/components';
import { ArrowBackIcon, ShareIcon, HomeOffIcon } from '@/shared/icons';
import {
  ProductHero,
  CreatorReviewSummarySection,
  ReviewRankingList,
  SimilarProductsList,
  MOCK_REVIEW_SUMMARY,
  MOCK_SIMILAR_PRODUCTS,
} from '@/features/productDetail';
import { useFetchProductDetail } from '@/shared/hooks';

export const ProductDetailPage = () => {
  const navigate = useNavigate();

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

  // TODO: 좋아요 상태 관리 (로컬 상태로 관리, 실제 구현에서는 API 연동 필요)
  const [heartStateByProductId, setHeartStateByProductId] = useState<
    Record<number, boolean>
  >({});
  const isHearted = productDetail
    ? (heartStateByProductId[productDetail.productId] ??
      productDetail.isHearted)
    : false;

  const handleLikeToggle = () => {
    if (!productDetail) {
      return;
    }

    setHeartStateByProductId((prev) => ({
      ...prev,
      [productDetail.productId]: !isHearted,
    }));
  };
  const handleReviewClick = () => navigate('/'); // TODO: 리뷰하기 페이지로 이동

  return (
    <div className="mt-13.5 flex flex-col bg-white pb-30">
      <PageHeader
        title="상품 여론 보기"
        left={
          <button
            onClick={() => navigate(-1)}
            className="p-1"
            aria-label="뒤로 가기"
          >
            <ArrowBackIcon aria-hidden="true" />
          </button>
        }
        right={[
          <div key="right-icons" className="flex items-center gap-1">
            <button
              key="home"
              onClick={() => navigate('/')}
              className="p-1"
              aria-label="홈으로 이동"
            >
              <HomeOffIcon aria-hidden="true" />
            </button>
            <button
              key="share"
              onClick={() => alert('공유하기')}
              className="pl-1"
              aria-label="공유하기"
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
            <ProductHero
              {...productDetail}
              isHearted={isHearted}
              onLikeClick={handleLikeToggle}
            />
            <CreatorReviewSummarySection {...MOCK_REVIEW_SUMMARY} />
            <ReviewRankingList />
            <SimilarProductsList products={MOCK_SIMILAR_PRODUCTS} />
          </>
        )}

        <div className="border-grey02 z-toast fixed bottom-0 left-1/2 w-full max-w-110 -translate-x-1/2 border bg-white px-4 pt-2 pb-7.5">
          <CTAButton
            label="이 상품 리뷰 평가하기"
            onClick={handleReviewClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
