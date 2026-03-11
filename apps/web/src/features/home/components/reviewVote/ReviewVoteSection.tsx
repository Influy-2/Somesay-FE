import { ReviewVoteGroup, ReviewVoteType } from '@/shared/components';
import { ProductCardThumbnail } from '@/shared/components/thumbnail/ProductCardThumbnail';
import { useState } from 'react';

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
  '패드가 얇고 에센스가 흥건해서 얼굴에 올리면 시원하게 진정되는 느낌이에요. 특히 세안 후에 볼 부분이 따갑거나 붉을 때 3분만 올려놔도 금방 가라앉아요. 향도 은은하고, 남은 에센스는 닦토처럼 써도 부담 없어요. 매일 아침 세안 후에 피부결 정돈용으로 딱 좋습니다.';

export const ReviewVoteSection = () => {
  const [selectedVote, setSelectedVote] = useState<ReviewVoteType | null>(null);

  const onClickVote = (vote: ReviewVoteType) => {
    if (selectedVote === null) setSelectedVote(vote);
  };

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
        <ReviewVoteGroup
          content={MOCK_REVIEW_CONTENT}
          onClickVote={onClickVote}
          selectedVote={selectedVote}
        />
      </div>
    </section>
  );
};
