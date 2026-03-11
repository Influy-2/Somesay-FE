import { ReviewVoteGroup } from '@/shared/components';
import { ProductCardThumbnail } from '@/shared/components/thumbnail/ProductCardThumbnail';

const MOCK_PRODUCT_THUMBNAILS = {
  brand: '토리든',
  productName: '캐롯 캐롯 캐롯 캐롯 카로팅 카밍 세럼',
  price: 10000,
  rating: 4.9,
  reviewCount: 1123,
  imageUrl:
    'https://www.figma.com/api/mcp/asset/91dd6a94-e9c4-480c-8452-3d916c193bb2',
};

const MOCK_REVIEW_CONTENT =
  '이 제품 정말 좋아요! 제 피부에 딱 맞아서 매일 사용하고 있어요. 향도 좋고 흡수도 빠르네요. 강력 추천합니다!';

export const ReviewVoteSection = () => {
  return (
    <section
      aria-labelledby="review-vote-title"
      className="flex w-full flex-col items-center justify-center gap-5 px-4"
    >
      <h2 className="headline4 w-full" id="review-vote-title">
        이 제품을 써보셨다면
        <br />
        리뷰에 한 표 남겨주세요
      </h2>
      <div className="flex w-full flex-col items-start gap-2">
        <ProductCardThumbnail {...MOCK_PRODUCT_THUMBNAILS} />
        <ReviewVoteGroup content={MOCK_REVIEW_CONTENT} onClickVote={() => {}} />
      </div>
    </section>
  );
};
