import { WhiteHeartButton } from '@/shared/components/buttons/HeartButton';
import type { ProductSearchResultType } from '@somesay/shared';
import { ChipBasic } from '@/shared/components/chips/ChipBasic';
import { AvatarStack } from './AvatarStack';
import { Star16Icon as StarIcon } from '@/shared/icons';
import { Link } from 'react-router';
import { PATH } from '@/routes/path';

interface SearchResultProductCardProps {
  product: ProductSearchResultType;
  onHeartToggle: (productId: number) => void;
}

// TODO: 로그인 연동 후 실제 사용자 피부 프로필 데이터로 교체합니다.
const MOCK_USER_SKIN_PROFILE = {
  skinTypes: ['건성'],
  expectedEffects: ['보습'],
};

export const SearchResultProductCard = ({
  product,
  onHeartToggle,
}: SearchResultProductCardProps) => {
  return (
    <article
      className="border-grey02 relative mx-4 flex flex-col gap-5 border-b pb-6"
      aria-label={`${product.brandName} ${product.productName}, ${product.price.toLocaleString()}원, 별점 ${product.rating}점`}
    >
      <div className="flex gap-3">
        {/* 이미지 */}
        <div className="border-grey02 relative h-[117.5px] w-26 shrink-0 overflow-hidden border-[0.7px]">
          <img
            src={product.productImgUrl}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute right-2 bottom-2 z-1">
            <WhiteHeartButton
              isHearted={product.isHearted}
              onHeartToggle={() => onHeartToggle(product.productId)}
              productName={product.productName}
            />
          </div>
        </div>

        {/* 텍스트 정보 */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <span className="body2-m leading-[155%] text-black">
                {product.brandName}
              </span>
              <span className="body2-m line-clamp-2 leading-[155%] text-black">
                {product.productName}
              </span>
            </div>
            <span className="body2-m leading-[155%] text-black">
              {product.price.toLocaleString()}원
            </span>
            <div className="flex items-center gap-1">
              {/* 별점 */}
              <div
                className="flex items-center"
                aria-label={`별점 ${product.rating}점`}
              >
                <StarIcon className="text-primary-300 size-4" />
                <span className="body2-sb">{product.rating}</span>
              </div>
              {/* 리뷰수 */}
              <span
                className="body2-m leading-[155%]"
                aria-label={`리뷰 ${product.reviewCount.toLocaleString()}개`}
              >
                ({product.reviewCount.toLocaleString()})
              </span>
              {/* 크리에이터 프로필 스택 */}
              <AvatarStack creatorImageUrls={product.creatorImageUrls} />
            </div>
          </div>
        </div>
      </div>

      {/* 리뷰 한 줄 요약 */}
      <p className="body2-sb text-grey09">{product.reviewSummary}</p>

      {/* 칩 영역 (잘 맞는 타입, 기대 효과) */}
      <div
        className="grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-3"
        aria-label="상품 태그 정보"
      >
        <span className="caption1-m text-grey06 self-center">잘 맞는 타입</span>
        <div
          className="flex flex-wrap gap-x-1 gap-y-2"
          aria-label={`잘 맞는 타입: ${product.skinTypes.join(', ')}`}
        >
          {product.skinTypes.map((type) => {
            const isMatched = MOCK_USER_SKIN_PROFILE.skinTypes.includes(type);

            return (
              <ChipBasic
                key={type}
                label={type}
                variant={isMatched ? 'blue' : 'default'}
              />
            );
          })}
        </div>

        <span className="caption1-m text-grey06">기대 효과</span>
        <div
          className="flex flex-wrap gap-x-1 gap-y-2"
          aria-label={`기대 효과: ${product.expectedEffects.join(', ')}`}
        >
          {product.expectedEffects.map((effect, idx) => {
            const isMatched =
              MOCK_USER_SKIN_PROFILE.expectedEffects.includes(effect);

            return (
              <ChipBasic
                key={`${effect}-${idx}`}
                label={effect}
                variant={isMatched ? 'blue' : 'default'}
              />
            );
          })}
        </div>
      </div>
      <Link
        to={`${PATH.PRODUCT.BASE}/${product.productId}`}
        className="absolute inset-0"
        aria-label={`${product.brandName} ${product.productName} 상품 상세로 이동`}
      />
    </article>
  );
};
