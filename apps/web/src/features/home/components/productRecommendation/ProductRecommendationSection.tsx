import { useState } from 'react';
import type { BasicCreatorProfileType } from '@somesay/shared';

import mockProfile from '@/assets/mock_profile_img.svg';
import { CreatorReviewExpandedCard } from '@/shared/components';

import { ProductAttributeSection } from './ProductAttributeSection';
import { ProductRecommendationCarousel } from './ProductRecommendationCarousel';

const PRODUCT_COUNT = 5;

export const ProductRecommendationSection = () => {
  // 상단 Embla의 선택 위치로 하단 상세 트랙을 이동한다.
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section
      className="flex w-full flex-col gap-6"
      aria-label="추천 제품 상세 정보"
    >
      {/* 추천 상품 캐러셀 */}
      <ProductRecommendationCarousel onSelectedIndexChange={setSelectedIndex} />

      {/* 상품 상세 슬라이드 */}
      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{
            transform: `translate3d(-${selectedIndex * 100}%, 0, 0)`,
          }}
        >
          {Array.from({ length: PRODUCT_COUNT }, (_, index) => (
            <section
              key={index}
              className="flex w-full shrink-0 flex-col gap-7 px-4"
              aria-label={`${index + 1}번째 추천 제품 상세 정보`}
              aria-hidden={index !== selectedIndex}
              inert={index !== selectedIndex}
            >
              <ProductAttributeSection
                title="잘 맞는 피부 타입"
                items={SKIN_TYPE_CHIPS}
              />
              <ProductAttributeSection title="기대 효과" items={EFFECT_CHIPS} />

              <div className="flex w-full flex-col gap-2">
                <h2 className="body2-b text-black">
                  나의 고민과 연관성이 가장 높은 리뷰
                </h2>
                <CreatorReviewExpandedCard
                  creator={RELATED_REVIEW.creator}
                  rating={RELATED_REVIEW.rating}
                  content={RELATED_REVIEW.content}
                  productName={RELATED_REVIEW.productName}
                />
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

//임시
const SKIN_TYPE_CHIPS = [
  { label: '건성', isHighlighted: true },
  { label: '민감성', isHighlighted: false },
];

const EFFECT_CHIPS = [
  { label: '속건조 완화', isHighlighted: true },
  { label: '보습', isHighlighted: false },
  { label: '피부 장벽 강화', isHighlighted: false },
  { label: '여드름 관리', isHighlighted: false },
];

const RELATED_REVIEW = {
  creator: {
    creatorId: 1,
    nickname: '김점례',
    profileImageUrl: mockProfile,
    subscriberNum: 30,
    trustScore: 100,
    ageGroup: 20,
    skinTypes: ['건성'],
  } satisfies BasicCreatorProfileType,
  rating: 4.8,
  productName: '캐롯 카로팅 카밍 워터 패드 50p',
  content:
    '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요. 향도 은은하고, 남은 에센스는 닦토처럼 써도 부담 없어요. 매일 아침 세안 후 사용하기 좋아요.',
};
