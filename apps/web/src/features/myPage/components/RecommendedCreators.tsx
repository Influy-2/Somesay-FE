import { useCallback, useMemo } from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { CarouselIndicator, ReviewPreviewCard } from '@/shared/components';
import { useCarousel } from '@/shared/hooks/useCarousel';
import { MOCK_RECOMMENDED_CREATORS } from './mock';
import { RecommendedCreatorProfileRow } from './RecommendedCreatorProfileRow';

/** 자동 넘김 간격. 반응을 보고 조정할 값이라 상수로 둡니다. */
const CREATOR_ROTATION_MS = 5000;

export const RecommendedCreators = () => {
  const creators = MOCK_RECOMMENDED_CREATORS;

  const options = useMemo(() => ({ loop: true, align: () => 16 }), []);

  // 모션을 줄이도록 설정한 사용자에게는 자동 넘김을 걸지 않습니다.
  const plugins = useMemo(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    return prefersReducedMotion
      ? []
      : [
          Autoplay({
            delay: CREATOR_ROTATION_MS,
            stopOnInteraction: false, // 조작하면 멈췄다가 다시 돕니다
          }),
        ];
  }, []);

  const { emblaRef, emblaApi, selectedIndex, slideCount, scrollTo } =
    useCarousel({
      options,
      plugins,
    });

  const handleSelectCreator = useCallback(
    (index: number) => {
      scrollTo(index);
      // 직접 고른 카드를 5초 온전히 볼 수 있도록 자동 넘김 타이머를 다시 시작합니다.
      emblaApi?.plugins().autoplay?.reset();
    },
    [emblaApi, scrollTo]
  );

  if (creators.length === 0) return null;

  return (
    <section
      aria-labelledby="recommended-creators-heading"
      className="flex flex-col gap-5 pb-6"
    >
      <h2
        id="recommended-creators-heading"
        className="body1-sb px-4 text-black"
      >
        내가 좋아할 만한 크리에이터
      </h2>

      {/* 프로필 줄 — 캐러셀을 따라 활성 크리에이터가 왼쪽 끝으로 옵니다 */}
      <RecommendedCreatorProfileRow
        creators={creators}
        selectedIndex={selectedIndex}
        onSelect={handleSelectCreator}
      />

      {/* 리뷰 카드 + 인디케이터 */}
      <div className="flex flex-col items-center gap-4">
        {/* 리뷰 카드 */}
        <div
          ref={emblaRef}
          className="w-full overflow-hidden"
          role="region"
          aria-label="추천 크리에이터 리뷰 캐러셀"
        >
          <div
            className="flex gap-3 px-4"
            aria-live="polite"
            aria-atomic="false"
          >
            {creators.map((creator, index) => (
              <div
                key={creator.creatorId}
                className="min-w-0 shrink-0"
                aria-roledescription="slide"
                aria-label={`슬라이드 ${index + 1} / ${creators.length}`}
              >
                <ReviewPreviewCard
                  reviewId={creator.review.reviewId}
                  rating={creator.review.rating}
                  content={creator.review.content}
                  product={creator.review.product}
                />
              </div>
            ))}
          </div>
        </div>

        <CarouselIndicator count={slideCount} selectedIndex={selectedIndex} />
      </div>
    </section>
  );
};
