import { ProductCardThumbnail, CreatorReviewCard } from '@/shared/components';
import { SummaryBox } from './SummaryBox';
import { useCarousel } from '@/shared/hooks/useCarousel';
import { CarouselIndicator } from '@/shared/components/indicator/CarouselIndicator';

//임시
const skinType = '';
import { MOCK_REVIEWS } from './mockData';

export const BestReviewSection = () => {
  const { emblaRef, selectedIndex, slideCount } = useCarousel();

  return (
    <section
      aria-labelledby="best-review-title"
      className="flex w-full flex-col items-center justify-center gap-5 overflow-hidden px-4"
    >
      <h2 id="best-review-title" className="headline4 w-full">
        {skinType
          ? `${skinType} 유저들이 가장 많이 공감한 리뷰`
          : '유저들이 가장 많이 공감한 리뷰'}
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
          {MOCK_REVIEWS.map((item, i) => (
            <div
              key={i}
              aria-roledescription="slide" // "슬라이드"라고 읽어줌
              aria-label={`슬라이드 ${i + 1} / ${MOCK_REVIEWS.length}`} // "슬라이드 1 / 5" 등으로 읽어줌
              className="flex min-w-0 flex-[0_0_100%] flex-col gap-2 pl-2.5"
            >
              <ProductCardThumbnail {...item.product} />
              <CreatorReviewCard {...item.review} />
              <div className="flex items-start gap-2 self-stretch">
                <SummaryBox
                  boldText={item.agreePercent}
                  plainText=" 의 사용자가 공감했어요"
                />
                <SummaryBox
                  boldText={item.skinType}
                  plainText=" 사용자가 가장 많이 공감했어요"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <CarouselIndicator count={slideCount} selectedIndex={selectedIndex} />
    </section>
  );
};
