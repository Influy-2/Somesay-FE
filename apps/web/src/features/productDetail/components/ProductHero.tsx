import { BlackHeartButton } from '@/shared/components';
import { MainArrowIcon } from '@/shared/icons';
import { Link } from 'react-router';

interface ProductHeroProps {
  brandName: string;
  brandImageUrl?: string;
  productName: string;
  price: number;
  capacity: string;
  isLiked: boolean;
  onLikeClick: () => void;
}

export const ProductHero = ({
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
      <div className="border-grey02 flex items-center justify-between border-b px-4 py-5">
        <div className="flex items-center gap-1.5">
          {brandImageUrl && (
            <img
              src={brandImageUrl}
              alt=""
              aria-hidden="true"
              className="bg-grey03 h-6 w-6 rounded-full object-cover"
            />
          )}
          <span className="body1-m text-grey08">{brandName}</span>
        </div>
        {/* TODO: 브랜드 홈페이지 연결 */}
        <Link to="/" aria-label={`${brandName} 브랜드 홈페이지로 이동`}>
          <MainArrowIcon aria-hidden="true" />
        </Link>
      </div>

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
