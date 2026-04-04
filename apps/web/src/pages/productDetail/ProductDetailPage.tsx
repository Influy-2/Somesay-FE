import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PageHeader, CTAButton } from '@/shared/components';
import { ArrowBackIcon, ShareIcon, HomeOffIcon } from '@/shared/icons';
import mockProductImg from '@/assets/mock_product_img.png';
import {
  ProductHero,
  CreatorReviewSummary,
  ReviewRankingList,
  SimilarProductsList,
  MOCK_PRODUCT_DETAIL,
  MOCK_REVIEW_SUMMARY,
  MOCK_SIMILAR_PRODUCTS,
} from '@/features/productDetail';

export const ProductDetailPage = () => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(MOCK_PRODUCT_DETAIL.isLiked);

  const handleLikeToggle = () => setIsLiked((prev) => !prev);
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
          <button
            key="home"
            onClick={() => navigate('/')}
            className="p-1"
            aria-label="홈으로 이동"
          >
            <HomeOffIcon aria-hidden="true" />
          </button>,
          <button
            key="share"
            onClick={() => alert('공유하기')}
            className="pl-1"
            aria-label="공유하기"
          >
            <ShareIcon aria-hidden="true" />
          </button>,
        ]}
      />

      <section
        className="bg-grey01 flex h-97.5 items-center justify-center"
        aria-label="상품 이미지"
      >
        <img src={mockProductImg} alt={MOCK_PRODUCT_DETAIL.productName} />
      </section>

      <div className="bg-grey01 flex flex-col gap-2">
        <ProductHero
          {...MOCK_PRODUCT_DETAIL}
          isLiked={isLiked}
          onLikeClick={handleLikeToggle}
        />
        <CreatorReviewSummary {...MOCK_REVIEW_SUMMARY} />
        <ReviewRankingList />
        <SimilarProductsList products={MOCK_SIMILAR_PRODUCTS} />

        <div className="border-grey02 fixed bottom-0 left-1/2 z-50 w-full max-w-110 -translate-x-1/2 border bg-white px-4 pt-2 pb-7.5">
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
