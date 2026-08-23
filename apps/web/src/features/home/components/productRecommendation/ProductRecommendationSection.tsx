import { useState } from 'react';

import type { RecommendedProductType } from '@somesay/shared';

import { CreatorReviewExpandedCard } from '@/shared/components';

import { ProductAttributeSection } from './ProductAttributeSection';
import { ProductRecommendationCarousel } from './ProductRecommendationCarousel';

interface ProductRecommendationSectionProps {
  products: RecommendedProductType[];
  /** 사용자가 고른 조건 — 일치하는 속성 칩만 강조합니다. */
  selectedKeywords: string[];
}

export const ProductRecommendationSection = ({
  products,
  selectedKeywords,
}: ProductRecommendationSectionProps) => {
  // 상단 Embla의 선택 위치로 하단 상세 트랙을 이동한다.
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isSelectedKeyword = (label: string) => selectedKeywords.includes(label);

  return (
    <section
      className="flex w-full flex-col gap-6"
      aria-label="추천 제품 상세 정보"
    >
      {/* 추천 상품 캐러셀 */}
      <ProductRecommendationCarousel
        products={products}
        onSelectedIndexChange={setSelectedIndex}
      />

      {/* 상품 상세 슬라이드 */}
      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{
            transform: `translate3d(-${selectedIndex * 100}%, 0, 0)`,
          }}
        >
          {products.map((product, index) => (
            <section
              key={product.productId}
              className="flex w-full shrink-0 flex-col gap-7 px-4"
              aria-label={`${index + 1}번째 추천 제품 상세 정보`}
              aria-hidden={index !== selectedIndex}
              inert={index !== selectedIndex}
            >
              {product.productSkinTypes.length > 0 && (
                <ProductAttributeSection
                  title="잘 맞는 피부 타입"
                  items={product.productSkinTypes.map((skinType) => ({
                    label: skinType,
                    isHighlighted: isSelectedKeyword(skinType),
                  }))}
                />
              )}

              {product.productSkinExpectations.length > 0 && (
                <ProductAttributeSection
                  title="기대 효과"
                  items={product.productSkinExpectations.map(({ concern }) => ({
                    label: concern,
                    isHighlighted: isSelectedKeyword(concern),
                  }))}
                />
              )}

              {/* 조건에 맞는 리뷰가 없는 제품은 리뷰 영역을 숨깁니다. */}
              {product.topReview && (
                <div className="flex w-full flex-col gap-2">
                  <h2 className="body2-b text-black">
                    나의 고민과 연관성이 가장 높은 리뷰
                  </h2>
                  <CreatorReviewExpandedCard
                    creator={product.topReview.creator}
                    rating={product.topReview.rating}
                    content={product.topReview.content}
                    productName={product.topReview.productName}
                  />
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};
