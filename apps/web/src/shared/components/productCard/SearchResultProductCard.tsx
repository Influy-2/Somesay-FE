import { WhiteHeartButton } from '@/shared/components/buttons/HeartButton';
import { SubcategoryProductType } from '@/features/subcategory';
import { ChipBasic } from '@/shared/components/chips/ChipBasic';
import { AvatarStack } from './AvatarStack';
import { Star16Icon as StarIcon } from '@/shared/icons';

interface SearchResultProductCardProps {
  product: SubcategoryProductType;
  onHeartToggle: (productId: number) => void;
}

export const SearchResultProductCard = ({
  product,
  onHeartToggle,
}: SearchResultProductCardProps) => {
  return (
    <article
      className="flex flex-col gap-5 border-b border-gray-200 px-4 pb-6"
      aria-label={`${product.brand} ${product.productName}`}
    >
      <div className="flex gap-3">
        <div className="relative h-[117.51414px] w-26 shrink-0">
          <img
            src={product.imageUrl}
            alt={product.productName}
            className="h-full w-full object-cover"
          />
          <div className="absolute right-1 bottom-1">
            <WhiteHeartButton
              isHearted={product.isHearted}
              onHeartToggle={() => onHeartToggle(product.productId)}
              productName={product.productName}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div>
            <span className="body2-m grey-black">{product.brand}</span>
            <span className="body2-m text-grey-black line-clamp-2 leading-snug">
              {product.productName}
            </span>
          </div>

          <div>
            <span className="body2-m">{product.price.toLocaleString()}원</span>

            <div className="mt-1 flex items-center gap-1">
              {/* 별점 */}
              <div
                className="flex items-center"
                aria-label={`별점 ${product.rating}점`}
              >
                <StarIcon className="size-4" />
                <span className="body2-sb">{product.rating}</span>
              </div>
              {/* 리뷰수 */}
              <span
                className="body2-m"
                aria-label={`리뷰 ${product.reviewCount.toLocaleString()}개`}
              >
                ({product.reviewCount.toLocaleString()})
              </span>
              {/* 크리에이터 프로필 스택 */}
              <AvatarStack creators={product.creators}></AvatarStack>
            </div>
          </div>
        </div>
      </div>

      {/*리뷰 한 줄 요약 */}
      <p className="body2-sb text-grey-black">{product.reviewSummary}</p>

      {/*칩 영역 (잘 맞는 타입, 기대 효과) */}
      <div
        className="grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-3"
        aria-label="상품 태그 정보"
      >
        <span className="caption1-m text-grey06">잘 맞는 타입</span>
        <div
          className="flex flex-wrap gap-x-1 gap-y-2"
          aria-label={`잘 맞는 타입: ${product.skinTypes.join(', ')}`}
        >
          {product.skinTypes.map((type, idx) => (
            <ChipBasic
              key={idx}
              label={type}
              bgColor="bg-grey05"
              textColor="text-grey08"
            />
          ))}
        </div>

        <span className="caption1-m text-grey06">기대 효과</span>
        <div
          className="flex flex-wrap gap-x-1 gap-y-2"
          aria-label={`기대 효과: ${product.expectedEffects.join(', ')}`}
        >
          {product.expectedEffects.map((effect, idx) => (
            <ChipBasic
              key={idx}
              label={effect}
              bgColor="bg-grey05"
              textColor="text-grey08"
            />
          ))}
        </div>
      </div>
    </article>
  );
};
