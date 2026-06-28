import { RecommendedProductCard } from '@/shared/components';

import './ProductRecommendationCarousel.css';
import { useProductCarousel } from './useProductCarousel';

const MOCK_DATA = ['', '', '', '', ''];

interface ProductRecommendationCarouselProps {
  onSelectedIndexChange?: (index: number) => void;
}

export const ProductRecommendationCarousel = ({
  onSelectedIndexChange,
}: ProductRecommendationCarouselProps) => {
  const { emblaRef, selectedIndex, getSlideState } = useProductCarousel({
    onSelectedIndexChange,
  });

  return (
    <section className="product-carousel" aria-label="추천 제품 캐러셀">
      {/* 캐러셀 뷰포트 */}

      <div ref={emblaRef} className="product-carousel__viewport">
        <ul className="product-carousel__container">
          {MOCK_DATA.map((_, index) => {
            const slideState = getSlideState(index);

            return (
              <li
                key={index}
                className={slideState.slideClassName}
                style={slideState.slideStyle}
                aria-label={`${index + 1}번째 추천 제품`}
                aria-current={index === selectedIndex}
              >
                {/* li는 Embla의 위치 계산 대상이므로, 시각적 scale은 내부 wrapper에만 적용합니다. */}
                <div
                  className={slideState.innerClassName}
                  style={slideState.innerStyle}
                >
                  <RecommendedProductCard />
                  <div
                    className="product-carousel__dim"
                    style={slideState.dimStyle}
                    aria-hidden="true"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
