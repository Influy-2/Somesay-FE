import { Link, useNavigate, useParams } from 'react-router';
import { PageHeader, ShareButton } from '@/shared/components';
import { ArrowBackIcon, HomeOffIcon } from '@/shared/icons';
import {
  ProductHero,
  ProductReviewCtaBar,
  CreatorReviewSummarySection,
  ReviewRankingList,
  SimilarProductsList,
  useProductDetail,
} from '@/features/productDetail';
import { PATH } from '@/routes/path';

export const ProductDetailPage = () => {
  const navigate = useNavigate();

  const { productId: productIdParam } = useParams();
  const parsedProductId = Number(productIdParam);
  const productId =
    productIdParam !== undefined && Number.isFinite(parsedProductId)
      ? parsedProductId
      : undefined;

  const {
    product,
    reviewOverview,
    similarProducts,
    isLoading,
    hasError,
    onHeartToggle,
  } = useProductDetail(productId);

  // TODO: 리뷰 평가 페이지로 이동 (화면 준비 전까지 홈으로 보낸다)
  const handleGoToReviewEvaluation = () => navigate(PATH.HOME.BASE);

  const shareTitle = product
    ? `${product.brandName} ${product.productName}`
    : '';

  return (
    <div className="mt-13.5 flex flex-col bg-white pb-30">
      <PageHeader
        title="상품 여론 보기"
        left={
          <button
            onClick={() => navigate(-1)}
            aria-label="뒤로 가기"
            type="button"
          >
            <ArrowBackIcon aria-hidden="true" />
          </button>
        }
        right={[
          <Link key="home" to={PATH.HOME.BASE} aria-label="홈으로 이동">
            <HomeOffIcon aria-hidden="true" />
          </Link>,
          <ShareButton
            key="share"
            title={shareTitle}
            text={`${shareTitle} 상품 여론을 확인해 보세요.`}
            ariaLabel={`${shareTitle} 상품 여론 공유하기`}
          />,
        ]}
      />

      <div className="bg-grey01 flex flex-col gap-2">
        {/* TODO: 임시 에러, 로딩중 처리 */}
        {hasError && (
          <div className="body2-m bg-white px-4 py-10 text-center">
            상품 정보를 불러오지 못했어요.
          </div>
        )}

        {isLoading && (
          <div className="body2-m bg-white px-4 py-10 text-center">
            상품 정보를 불러오는 중이에요.
          </div>
        )}

        {product && (
          <>
            <ProductHero product={product} onHeartToggle={onHeartToggle} />
            {reviewOverview && (
              <CreatorReviewSummarySection {...reviewOverview} />
            )}
            <ReviewRankingList {...(productId ? { productId } : {})} />
            <SimilarProductsList products={similarProducts} />
          </>
        )}
      </div>

      <ProductReviewCtaBar
        onReviewEvaluationClick={handleGoToReviewEvaluation}
      />
    </div>
  );
};
