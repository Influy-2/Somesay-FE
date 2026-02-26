import { ProductCardThumbnail } from '@/shared/components/thumbnail/ProductCardThumbnail';
import { ReviewContent } from './ReviewContent';
import { SummaryBox } from './SummaryBox';
//임시
const skinType = '';

const MOCK_PRODUCT_THUMBNAILS = {
  brand: '토리든',
  productName: '캐롯 캐롯 캐롯 캐롯 카로팅 카밍 세럼',
  price: 10000,
  rating: 4.9,
  reviewCount: 1123,
  imageUrl:
    'https://www.figma.com/api/mcp/asset/91dd6a94-e9c4-480c-8452-3d916c193bb2',
};
const MOCK_CREATOR = {
  name: '김점례',
  profileImageUrl:
    'https://www.figma.com/api/mcp/asset/39939f4d-3d38-45bb-bb23-dfce01aa3736',
  subscriberCount: 30,
  trustScore: 100,
  ageGroup: 20,
  skinType: '건성',
};

const MOCK_REVIEW = {
  creator: { ...MOCK_CREATOR },
  rating: 4.8,
  content:
    '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요. 향도 은은하고, 남은 에센스는 닦토처럼 써도 부담 없어요. 매일 아침 세안 후에 피부결 정돈용으로 딱 좋습니다.',
  productName: '토리든',
};

export const BestReviewSection = () => {
  return (
    <section
      aria-labelledby="best-review-title"
      className="flex w-full flex-col items-center justify-center gap-5 px-4"
    >
      <h2 id="best-review-title" className="headline4 w-full">
        {skinType
          ? `${skinType} 유저들이 가장 많이 공감한 리뷰`
          : '유저들이 가장 많이 공감한 리뷰'}
      </h2>

      <ProductCardThumbnail
        brand={MOCK_PRODUCT_THUMBNAILS.brand}
        productName={MOCK_PRODUCT_THUMBNAILS.productName}
        price={MOCK_PRODUCT_THUMBNAILS.price}
        rating={MOCK_PRODUCT_THUMBNAILS.rating}
        reviewCount={MOCK_PRODUCT_THUMBNAILS.reviewCount}
        imageUrl={MOCK_PRODUCT_THUMBNAILS.imageUrl}
      />
      <ReviewContent {...MOCK_REVIEW} />
      <div className="flex items-start gap-2 self-stretch">
        <SummaryBox boldText="93%" plainText="의 사용자가 공감했어요" />
        <SummaryBox boldText="건성" plainText="사용자가 가장 많이 공감했어요" />
      </div>
    </section>
  );
};
