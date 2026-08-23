import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import { RecommendedCreatorProfile, Preview } from '@/shared/components';
import { MOCK_RECOMMENDED_CREATORS } from './mock';

export const RecommendedCreators = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  });

  const handleProfileClick = useCallback(
    (index: number) => {
      setActiveIndex(index);
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const activeCreator = MOCK_RECOMMENDED_CREATORS[activeIndex];
  if (!activeCreator) return null;

  return (
    <div className="flex flex-col gap-4 pb-6">
      <p className="body2-sb text-grey06">내가 좋아할 만한 크리에이터</p>

      {/* 프로필 영역 */}
      <div className="scrollbar-hide flex min-w-0 items-center gap-3 overflow-x-auto">
        {/* 선택된 크리에이터: 프로필 풀로 */}
        <div className="shrink-0">
          <RecommendedCreatorProfile
            creatorId={activeCreator.creatorId}
            name={activeCreator.name}
            profileImageUrl={activeCreator.profileImageUrl}
            age={activeCreator.age}
            skinType={activeCreator.skinType}
          />
        </div>
        {/* 나머지 크리에이터: 이미지만 */}
        {MOCK_RECOMMENDED_CREATORS.filter((_, i) => i !== activeIndex).map(
          (creator) => {
            const originalIndex = MOCK_RECOMMENDED_CREATORS.indexOf(creator);
            return (
              <button
                key={creator.creatorId}
                type="button"
                onClick={() => handleProfileClick(originalIndex)}
                className="shrink-0"
              >
                <div className="bg-grey02 size-15 overflow-hidden rounded-full opacity-50">
                  {creator.profileImageUrl && (
                    <img
                      src={creator.profileImageUrl}
                      alt={creator.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </button>
            );
          }
        )}
      </div>

      {/* 리뷰 카드 캐러셀 */}
      <div className="overflow-visible">
        <div ref={emblaRef} className="overflow-visible">
          <div className="flex gap-3">
            {MOCK_RECOMMENDED_CREATORS.map((creator) => (
              <div key={creator.creatorId} className="min-w-0 shrink-0">
                <Preview
                  rating={creator.review.rating}
                  content={creator.review.content}
                  product={creator.review.product}
                />
              </div>
            ))}
          </div>
        </div>
        {/* 페이지네이션 */}
        <div className="flex items-center justify-center gap-1 pt-4">
          {MOCK_RECOMMENDED_CREATORS.map((_, i) => (
            <div
              key={i}
              className={
                i === activeIndex
                  ? 'bg-grey08 h-2.5 w-1'
                  : 'bg-grey03 h-1.5 w-1'
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
