import type { ProductDetailType } from '@somesay/shared';
import { BlackHeartButton, BrandProfile } from '@/shared/components';

interface ProductHeroProps extends ProductDetailType {
  onLikeClick: () => void;
}

export const ProductHero = ({
  productImageUrl,
  brandName,
  brandId,
  brandLogoUrl,
  productName,
  price,
  volume,
  isHearted,
  onLikeClick,
  collabChannelName,
  collabProfileImgUrl,
  productNotes,
}: ProductHeroProps) => {
  return (
    <section
      className="flex flex-col bg-white"
      aria-label={`${brandName} ${productName} 상품 정보`}
    >
      <div className="bg-grey01 aspect-square w-full overflow-hidden">
        {productImageUrl && (
          <img
            src={productImageUrl}
            alt={productName}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <BrandProfile
        brandName={brandName}
        brandId={brandId}
        brandImageUrl={brandLogoUrl}
      />
      <div className="flex flex-col gap-3.5 px-4 py-5">
        <h2 className="subhead-sb">{productName}</h2>
        {productNotes && <p className="body2-m text-grey06">{productNotes}</p>}
        {collabChannelName && (
          <div className="flex items-center gap-2 px-4">
            {collabProfileImgUrl && (
              <div className="bg-grey02 size-5 overflow-hidden rounded-full">
                <img
                  src={collabProfileImgUrl}
                  alt={collabChannelName}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <span className="body2-m">
              {collabChannelName} 님의 공동 개발 상품
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <dl className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <dt className="body2-b">정가</dt>{' '}
              <dd className="body2-m">
                {price
                  ? price.toLocaleString('ko-KR') + '원'
                  : '가격 정보 없음'}
              </dd>
            </div>
            <div className="flex items-center gap-1">
              <dt className="body2-b">용량</dt>
              <dd className="body2-m">
                {volume ? `${volume}ml` : '용량 정보 없음'}
              </dd>
            </div>
          </dl>
          <BlackHeartButton isLiked={isHearted} onLikeToggle={onLikeClick} />
        </div>
      </div>
    </section>
  );
};
