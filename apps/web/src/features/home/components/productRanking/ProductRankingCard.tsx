import { Star16Icon as StarIcon } from '@/shared/icons';
import { Link } from 'react-router';
import { ProductRankingCardType } from '@somesay/shared';
import { WhiteHeartButton } from '@/shared/components';

type ProductRankingCardProps = ProductRankingCardType;

export const ProductRankingCard = ({
  productId,
  imageUrl,
  brand,
  productName,
  price,
  rating,
  reviewCount,
  rank,
  isHearted,
  creators,
}: ProductRankingCardProps) => {
  const formattedPrice = price.toLocaleString('ko-KR');
  const formattedReviewCount = reviewCount.toLocaleString('ko-KR');

  const onHeartToggle = () => {
    console.log('하트클릭');
  };

  return (
    <article
      className="relative flex flex-1 shrink-0 flex-col items-start"
      aria-label={`${rank}위 ${brand} ${productName}, ${formattedPrice}원, 별점 ${rating}점, 리뷰 ${formattedReviewCount}개, 리뷰한 크리에이터: ${creators.map((c) => c.name).join(', ')}`}
    >
      {/* 이미지 영역 */}
      <div className="relative h-[200px] w-full overflow-hidden border-none">
        {/* 상품 이미지 */}
        <div aria-hidden="true" className="border-grey02 h-full w-full border">
          {imageUrl && imageUrl.length > 0 && (
            <img
              src={imageUrl}
              alt=""
              className="size-full border border-none object-cover"
            />
          )}
        </div>

        {/* 랭킹 배지 */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 flex size-8 items-center justify-center bg-black"
        >
          <span className="body2-m text-white">{rank}</span>
        </div>

        {/* 찜 버튼 */}
        <div className="absolute right-2 bottom-2 z-1">
          <WhiteHeartButton
            isHearted={isHearted}
            onHeartToggle={onHeartToggle}
            productName={productName}
          />
        </div>
      </div>

      {/* 텍스트 정보 영역 */}
      <div
        className="flex w-full flex-col gap-1 pt-2 text-black"
        aria-hidden="true"
      >
        {/* 브랜드 */}
        <p className="body2-m text-grey-black truncate">{brand}</p>

        {/* 상품명 */}
        <p className="body2-m text-grey-black w-full truncate whitespace-pre-wrap">
          {productName}
        </p>

        {/* 가격 */}
        <p className="body2-m text-grey-black truncate">{formattedPrice}원</p>

        {/* 별점 + 리뷰수 + 크리에이터 프로필 */}
        <div className="flex items-center gap-1">
          {/* 별점 */}
          <div className="flex items-center">
            <StarIcon className="size-4" />
            <span className="body2-sb">{rating}</span>
          </div>
          {/* 리뷰수 */}
          <span className="body2-m">({formattedReviewCount})</span>
          {/* 크리에이터 프로필 스택 */}
          <div className="flex flex-row-reverse items-center gap-0">
            {[...creators].reverse().map((creator, index, arr) => (
              <div
                key={creator.name}
                className="relative size-[1.375rem] overflow-hidden rounded-full border border-white"
                style={{ marginLeft: index === arr.length - 1 ? 0 : -6 }}
              >
                <img
                  src={creator.profileImageUrl}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* TODO: 임시 링크 */}
      <Link to={`/${productId}`} className="absolute inset-0" />
    </article>
  );
};
