import type { ProductDetailType } from '@somesay/shared';
import { BlackHeartButton, BrandProfile } from '@/shared/components';

interface ProductHeroProps extends ProductDetailType {
  onLikeClick: () => void;
}

export const ProductHero = ({
  imageUrl,
  brand,
  brandImageUrl,
  productName,
  price,
  volume,
  isHearted,
  onLikeClick,
}: ProductHeroProps) => {
  return (
    <section
      className="flex flex-col bg-white"
      aria-label={`${brand} ${productName} 상품 정보`}
    >
      <div className="bg-grey01 aspect-square w-full overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={productName}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <BrandProfile brandName={brand} brandImageUrl={brandImageUrl} />

      <div className="px-4 py-5">
        <h2 className="subhead-sb">{productName}</h2>
        <div className="flex items-center justify-between">
          <dl className="flex gap-4">
            <div className="flex items-center gap-1">
              <dt className="body2-b">정가</dt>
              <dd className="body2-m">{price.toLocaleString()}원</dd>
            </div>
            <div className="flex items-center gap-1">
              <dt className="body2-b">용량</dt>
              <dd className="body2-m">{volume}ml</dd>
            </div>
          </dl>
          <BlackHeartButton isLiked={isHearted} onLikeToggle={onLikeClick} />
        </div>
      </div>
    </section>
  );
};
