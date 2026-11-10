import { Link } from 'react-router';

import { ProductCardThumbnail, CreatorReviewCard } from '@/shared/components';
import { SummaryBox } from './SummaryBox';
import { useCarousel } from '@/shared/hooks/useCarousel';
import { CarouselIndicator } from '@/shared/components/indicator/CarouselIndicator';
import { PATH } from '@/routes/path';
import { useFetchHomeCuration, useFetchUserInfo } from '@/shared/hooks';
import { useAuthTokenStore } from '@/shared/stores';
import { BestReviewSkeleton } from './BestReviewSkeleton';

export const BestReviewSection = () => {
  const { emblaRef, selectedIndex, slideCount } = useCarousel();
  const accessToken = useAuthTokenStore((state) => state.accessToken);
  const { data: userInfo, isFetched: isUserInfoFetched } = useFetchUserInfo();
  const selectedSkinTypeId = userInfo?.userSkinTypes.at(0)?.skinTypeId;
  const canFetchCuration = !accessToken || isUserInfoFetched;
  const {
    data: curation,
    isPending,
    isError,
  } = useFetchHomeCuration(selectedSkinTypeId, canFetchCuration);

  if (!canFetchCuration || isPending) {
    return <BestReviewSkeleton />;
  }

  if (isError || !curation || curation.reviews.length === 0) {
    return null;
  }

  // 비로그인이면 skinTypeId·skinTypeName 이 null 이라 아래 `skinTypeName ?` 로 분기합니다.
  const { reviews, skinTypeName } = curation;

  return (
    <div className="w-full overflow-auto">
      <section
        aria-labelledby="best-review-title"
        aria-busy={isPending}
        className="flex w-full flex-col items-center justify-center gap-5 overflow-hidden px-4"
      >
        <h2 id="best-review-title" className="headline4 w-full">
          {skinTypeName ? (
            <>
              <span className="text-primary-400">{skinTypeName}</span> 유저들이
              가장 많이 공감한 리뷰
            </>
          ) : (
            <>
              이 제품을 사용해본 사람들이
              <br />
              가장 많이 공감한 리뷰
            </>
          )}
        </h2>

        {/* 캐러셀 뷰포트 */}
        <div
          ref={emblaRef}
          className="w-full"
          role="region"
          aria-label="리뷰 캐러셀"
        >
          <div
            className="-ml-2.5 flex"
            aria-live="polite" // 슬라이드 전환 시 읽어줌
            aria-atomic="false" // 변경된 슬라이드만 읽음
          >
            {reviews.map((item, i) => (
              <div
                key={item.reviewId}
                aria-roledescription="slide" // "슬라이드"라고 읽어줌
                aria-label={`슬라이드 ${i + 1} / ${reviews.length}`} // "슬라이드 1 / 5" 등으로 읽어줌
                className="flex min-w-0 flex-[0_0_100%] flex-col gap-2 pl-2.5"
              >
                {/* TODO: 응답에 productAvgRating·productReviewCount 가 생겼습니다.
                    상품 썸네일에 리뷰 별점 대신 상품 평균 별점을 보여줄지 기획 확인 (지금은 기존대로 리뷰 별점) */}
                <ProductCardThumbnail
                  productId={item.productId}
                  brandName={item.brandName}
                  productName={item.productName}
                  productImgUrl={item.productImgUrl}
                  price={item.productPrice}
                  rating={item.reviewRating}
                />
                <Link
                  to={`${PATH.PRODUCT.BASE}/${item.productId}?review=${item.reviewId}`}
                  aria-label={`${item.creatorName}의 리뷰 전문 보기`}
                  className="block"
                >
                  {/* 리뷰 카드 응답은 creator* 접두사로 평탄해 리뷰 객체를 그대로 프로필에 넘깁니다. */}
                  <CreatorReviewCard
                    creator={item}
                    rating={item.reviewRating}
                    content={item.reviewContent}
                    productName={item.productName}
                    highlightedLabels={skinTypeName ? [skinTypeName] : []}
                  />
                </Link>
                <div className="flex items-start gap-2 self-stretch">
                  <SummaryBox
                    boldText={String(item.reviewAgreeRatio.toFixed(1)) + '%'}
                    plainText=" 의 사용자가 공감했어요"
                  />
                  <SummaryBox
                    boldText={item.reviewMostAgreedSkinTypes
                      .map(({ skinTypeName }) => skinTypeName)
                      .join(', ')}
                    plainText=" 사용자가 가장 많이 공감했어요"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <CarouselIndicator count={slideCount} selectedIndex={selectedIndex} />
      </section>
    </div>
  );
};
