import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

import { RecommendedCreatorProfile, Preview } from '@/shared/components';
import { MOCK_RECOMMENDED_CREATORS } from '@/features/myPage/components/mockData';

export const RecommendedCreators = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const activeCreator = MOCK_RECOMMENDED_CREATORS[activeIndex];
  if (!activeCreator) return null;

  const handleProfileClick = (index: number) => {
    setActiveIndex(index);
    swiperInstance?.slideTo(index);
  };

  return (
    <div className="flex flex-col gap-4 py-6">
      <p className="body2-sb text-grey06">내가 좋아할 만한 크리에이터</p>

      {/* 프로필 영역 */}
      <div className="scrollbar-hide flex min-w-0 items-center gap-3 overflow-x-auto">
        {' '}
        {/* 선택된 크리에이터: 프로필 풀로 */}
        <div className="shrink-0">
          <RecommendedCreatorProfile
            creatorId={activeCreator.creatorId}
            name={activeCreator.name}
            profileImageUrl={activeCreator.profileImageUrl}
            ageGroup={activeCreator.ageGroup}
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

      {/* 리뷰 카드 Swiper */}
      <div className="[&_.swiper]:overflow-visible">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          slidesPerView={1.2}
          spaceBetween={12}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {MOCK_RECOMMENDED_CREATORS.map((creator) => (
            <SwiperSlide key={creator.creatorId}>
              <Preview
                rating={creator.review.rating}
                content={creator.review.content}
                product={creator.review.product}
              />
            </SwiperSlide>
          ))}
        </Swiper>
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
