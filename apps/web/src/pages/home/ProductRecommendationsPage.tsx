import { useNavigate } from 'react-router';

import mockProfile from '@/assets/mock_profile_img.svg';
import {
  ProductRecommendationCarousel,
  ProductRecommendationHeader,
} from '@/features/home';
import { ArrowBackIcon } from '@/shared/icons';
import {
  CTAButton,
  ChipLarge,
  CreatorReviewExpandedCard,
  PageHeader,
} from '@/shared/components';

export const ProductRecommendationsPage = () => {
  const navigate = useNavigate();

  const handleLikeAll = () => {
    console.log('추천 제품 모두 찜하기');
  };

  return (
    <div className="min-h-screen w-full bg-white pb-[126px]">
      <PageHeader
        title="상품 추천"
        left={
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="이전 화면으로 돌아가기"
            className="flex cursor-pointer items-center justify-center"
          >
            <ArrowBackIcon />
          </button>
        }
      />

      <main className="flex w-full flex-col pt-15 pb-[10.9375rem]">
        <ProductRecommendationHeader count={5} keywords={SELECTED_KEYWORDS} />
        <ProductRecommendationCarousel />

        <section className="mt-7 flex w-full flex-col gap-7 px-4">
          <ProductAttributeSection
            title="잘 맞는 피부 타입"
            items={SKIN_TYPE_CHIPS}
          />
          <ProductAttributeSection title="기대 효과" items={EFFECT_CHIPS} />

          <section className="flex w-full flex-col gap-2">
            <h2 className="body2-b text-black">
              나의 고민과 연관성이 가장 높은 리뷰
            </h2>
            <CreatorReviewExpandedCard
              creator={RELATED_REVIEW.creator}
              rating={RELATED_REVIEW.rating}
              content={RELATED_REVIEW.content}
              productName={RELATED_REVIEW.productName}
            />
          </section>
        </section>
      </main>

      <div className="border-grey02 z-toast fixed bottom-0 left-1/2 flex w-full max-w-110 min-w-[320px] -translate-x-1/2 border-t bg-white px-4 pt-2 pb-[30px]">
        <CTAButton label="추천 제품 모두 찜하기" onClick={handleLikeAll} />
      </div>
    </div>
  );
};

interface ProductAttributeItem {
  label: string;
  isHighlighted: boolean;
}

interface ProductAttributeSectionProps {
  title: string;
  items: ProductAttributeItem[];
}

const ProductAttributeSection = ({
  title,
  items,
}: ProductAttributeSectionProps) => {
  return (
    <section className="flex w-full flex-col gap-2">
      <h2 className="body2-b text-black">{title}</h2>
      <div className="flex flex-wrap gap-x-1.5 gap-y-2">
        {items.map((item) => (
          <ChipLarge
            key={item.label}
            label={item.label}
            bgColor={item.isHighlighted ? 'bg-black' : 'bg-grey05'}
            textColor={item.isHighlighted ? 'text-white' : 'text-grey08'}
          />
        ))}
      </div>
    </section>
  );
};

//mock
const SELECTED_KEYWORDS = ['건성', '여드름', '붉은기', '스킨'];

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
    subscriberCount: 30,
    trustScore: 100,
    ageGroup: 20,
    skinType: '건성',
  },
  rating: 4.8,
  productName: '캐롯 카로팅 카밍 워터 패드 50p',
  content:
    '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요. 향도 은은하고, 남은 에센스는 닦토처럼 써도 부담 없어요. 매일 아침 세안 후 사용하기 좋아요.',
};
