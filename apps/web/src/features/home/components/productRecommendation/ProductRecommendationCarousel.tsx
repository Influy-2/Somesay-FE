import type { RecommendedProductType } from '@somesay/shared';

import { RecommendedProductCard } from '@/shared/components';
import { useProductWish } from '@/shared/hooks';

import './ProductRecommendationCarousel.css';
import { useProductCarousel } from './useProductCarousel';

interface ProductRecommendationCarouselProps {
  products: RecommendedProductType[];
  onSelectedIndexChange?: (index: number) => void;
}

export const ProductRecommendationCarousel = ({
  products,
  onSelectedIndexChange,
}: ProductRecommendationCarouselProps) => {
  const { emblaRef, selectedIndex, getSlideState } = useProductCarousel({
    onSelectedIndexChange,
  });
  const { toggleWish } = useProductWish();

  return (
    <section className="product-carousel" aria-label="추천 제품 캐러셀">
      {/* 추천 상품 캐러셀 */}
      <div ref={emblaRef} className="product-carousel__viewport">
        <ul className="product-carousel__container">
          {products.map((product, index) => {
            const slideState = getSlideState(index);

            return (
              <li
                key={product.productId}
                className={slideState.slideClassName}
                style={slideState.slideStyle}
                aria-current={index === selectedIndex ? 'true' : undefined}
              >
                {/* 상품 카드 확대 영역 */}
                <div
                  className={slideState.innerClassName}
                  style={slideState.innerStyle}
                >
                  <RecommendedProductCard
                    {...product}
                    order={index + 1}
                    onHeartToggle={() =>
                      toggleWish({
                        productId: product.productId,
                        isHearted: product.isHearted,
                      })
                    }
                  />
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
