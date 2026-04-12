import { BlackHeartButton, BrandProfile } from '@/shared/components';

interface ProductHeroProps {
  productImgUrl?: string | undefined;
  brandName: string;
  brandImageUrl?: string | undefined;
  productName: string;
  price: number;
  capacity: string;
  isLiked: boolean;
  onLikeClick: () => void;
}

export const ProductHero = ({
  productImgUrl,
  brandName,
  brandImageUrl,
  productName,
  price,
  capacity,
  isLiked,
  onLikeClick,
}: ProductHeroProps) => {
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
      <BrandProfile brandName={brandName} brandImageUrl={brandImageUrl} />

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
              <dd className="body2-m">{capacity}</dd>
            </div>
          </dl>
          <BlackHeartButton isLiked={isLiked} onLikeToggle={onLikeClick} />
        </div>
      </div>
    </section>
  );
};
