import { formatPrice } from '@somesay/shared';
import { BlackHeartButton, BrandProfile } from '@/shared/components';
import type { ProductDetailResponse } from '@somesay/shared';

interface ProductHeroProps {
  product: ProductDetailResponse;
  onHeartToggle: () => void;
}

export const ProductHero = ({ product, onHeartToggle }: ProductHeroProps) => {
  const {
    productImgUrl,
    brandName,
    brandId,
    brandLogoImgUrl,
    productName,
    productPrice,
    productVolume,
    isWished,
    collabCreatorName,
    collabCreatorProfileImgUrl,
    productNotes,
  } = product;

  return (
    <section
      className="flex flex-col bg-white"
      aria-label={`${brandName} ${productName} 상품 정보`}
    >
      <div className="bg-grey01 aspect-square w-full overflow-hidden">
        {productImgUrl && (
          <img
            src={productImgUrl}
            alt={productName}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <BrandProfile
        brandName={brandName}
        brandId={brandId}
        brandImageUrl={brandLogoImgUrl}
      />
      <div className="flex flex-col gap-3.5 px-4 py-5">
        <h2 className="subhead-sb">{productName}</h2>
        {productNotes && <p className="body2-m text-grey06">{productNotes}</p>}
        {collabCreatorName && (
          <div className="flex items-center gap-2 px-4">
            {collabCreatorProfileImgUrl && (
              <div className="bg-grey02 size-5 overflow-hidden rounded-full">
                <img
                  src={collabCreatorProfileImgUrl}
                  alt={collabCreatorName}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <span className="body2-m">
              {collabCreatorName} 님의 공동 개발 상품
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <dl className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <dt className="body2-b">정가</dt>
              <dd className="body2-m">{formatPrice(productPrice)}</dd>
            </div>
            <div className="flex items-center gap-1">
              <dt className="body2-b">용량</dt>
              <dd className="body2-m">
                {productVolume ? `${productVolume}ml` : '용량 정보 없음'}
              </dd>
            </div>
          </dl>
          <BlackHeartButton isLiked={isWished} onLikeToggle={onHeartToggle} />
        </div>
      </div>
    </section>
  );
};
